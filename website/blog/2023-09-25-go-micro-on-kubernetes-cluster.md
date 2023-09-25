---
title: How microservice framework (Go-Micro) runs on Kubernetes cluster
description: How microservice framework (Go-Micro) runs on a Kubernetes cluster
tags: [go-micro, microservice, framework, kubernetes, k8s-discovery, k8s-registry, k8s-configmap]
image: /assets/thoughts/go-micro/go-micro-on-k8s/screenshot-000.png
hide_table_of_contents: false
--- 
<!--truncate-->

## Overview

This article mainly demonstrates how the microservice framework (Go-Micro) runs on a Kubernetes cluster and performs service discovery registration and configuration management by calling APIServer.

First of all, let me get something straight this article does not intend to cover everything you may want to know. Rather, I assume that if you are still reading this, you already have a basic understanding of what I will be discussing.

As I said, I'll quickly go around the two main characteristics below and focus on the example that helps you feel more confident to put your own microservices using some useful built-in on the Kubernetes cluster.

- Service discovery and registration based on Kubernetes.
- Configuration management based on Kubernetes Configmap.

## Service Discovery

Before jumping to any Kubernetes specifics, let's talk a little bit about the service discovery meaning in general.

Nowadays, it's a common practice to run multiple copies of a service at the same time. Every such copy is a separate instance of the service represented by a network endpoint (i.e. some IP and Port).
Traditionally, virtual or physical machines have been used to host those endpoints with the shift towards containers in more recent times. Having multiple instances of the service running simultaneously increases its availability and helps to adjust the service capacity to meet the traffic demand. On the other hand, it also complicates the setup, for example, before accessing the service, the client needs to figure out the actual IP address and the port it should use. The situation becomes even more tricky, for example when new instances come or existing instances go into failure or maintenance, etc. That's why we have the name called `service discovery` and it's an integral part of the microservice system.

### In Traditional

There are so many types of service-discovery traditional and this is the one - `Client-Side Service Discovery`. If we keep the service registry component around, we can teach the clients to look up the service instance addresses directly in the service registry. After obtaining the complete list of IP addresses that make up the service queue, clients can select instances based on the load-balancing policy available to them. In this case, service discovery will only happen on the client side. 

<p align="center">
<img src="/assets/thoughts/go-micro/go-micro-on-k8s/screenshot-001.png" width="100%" alt="go-micro-on-k8s-screenshot-001" />
</p>

The benefits of the client-side approach mostly come from the absence of the load balancer. There is neither a single point of failure nor a potential throughput bottleneck in the system design. However,  client-side service discovery couples clients with the service registry. It requires some integration code to be written for every programming language or framework in your ecosystem. Obviously, this extra logic complicates the clients but this implementation of client-side service discovery is also one of my choices and preferences.

### In Kubernetes

First of all, let's play an analogy game! If we were to draw some analogy between Kubernetes and more traditional architectures. I would compare Kubernetes pods with service instances.

Pods are many things to many people, however, when it comes to networking the documentation clearly states that:
> "...Pods can be treated much like VMs or physical hosts from the perspectives of port allocation, naming, service discovery, load balancing, application configuration, and migration."

If Pods correspond to individual instances of a service, I would expect a similar analogy for the service, as a logical grouping of instances, itself. And indeed there is a suitable concept in Kubernetes called: a Service.
> "In Kubernetes, a Service is an abstraction which defines a logical set of Pods and a policy by which to access them (sometimes this pattern is called a micro-service)."

In my opinion, while creating a new Service, we should choose a name that references the set of Pods that make up the service. In addition to this, the service maintains an up-to-date list of IP addresses for its Pods, which are organized into Endpoints objects. To quote the documentation again:
> "...if you're able to use Kubernetes APIs for service discovery in your application, you can query the API server for Endpoints, ***[I guess using the Service name]*** that get updated whenever the set of Pods in a Service changes."

Well, sounds like an invitation to implement a Kubernetes-native client-side service discovery with the Kubernetes control plane playing the role of the service registry.

<p align="center">
<img src="/assets/thoughts/go-micro/go-micro-on-k8s/screenshot-002.png" width="100%" alt="go-micro-on-k8s-screenshot-002" />
</p>

However, the only real-world usage of this mechanism I've known so far was in the `service mesh` kind of software. It's a bit unfair to mention it here though because service mesh itself is needed to provide, in particular, the service discovery mechanism for its users. So, don't worry I'll introduce to you the real client-side service discovery implementations leveraging Kubernetes Endpoints API.

## Go-Micro on Kubernetes

### Go-Micro plugins

The version should be selected as `latest`, because the relevant plug-ins for service registration Kubernetes and service configuration Kubernetes should be available with the latest version.

```shell
go get github.com/devexps/go-micro/v2@latest
go get github.com/devexps/go-micro/config/k8s/v2@latest
go get github.com/devexps/go-micro/registry/k8s/v2@latest
```

### Start a Kubernetes cluster

You need to have a Kubernetes cluster, and the `kubectl` command-line tool must be configured to communicate with your cluster. 
If you do not already have a cluster, you can create one by using `Minikube` like me.

```shell
minikube start --network=socket_vmnet   
              
😄  minikube v1.31.2 on Darwin 13.5 (arm64)
✨  Automatically selected the docker driver. Other choices: qemu2, ssh
📌  Using Docker Desktop driver with root privileges
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
    > gcr.io/k8s-minikube/kicbase...:  404.50 MiB / 404.50 MiB  100.00% 3.32 Mi
🔥  Creating docker container (CPUs=2, Memory=4000MB) ...
🐳  Preparing Kubernetes v1.27.4 on Docker 24.0.4 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: default-storageclass, storage-provisioner
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

### Create a Kubernetes namespace

In Kubernetes, namespaces provide a mechanism for isolating groups of resources within a single cluster. You can omit this step if you want to use the `default` namespace. But I encourage you to create a new one and all services run under that namespace.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  namespace: go-micro
  name: go-micro
```

Deploy this namespace:

```shell
kubectl apply -f .k8s/namespace.yaml
```

Then view the result:

```shell
kubectl get ns | grep micro
go-micro               Active   32h
```

### Create RBAC

The permissions to bind `serviceaccount` to operate Pods and operate ConfigMap will be mounted to each Pod under /var/run/secrets/kubernetes.io/serviceaccount.

First of all, let's create a service account. 
Every Kubernetes namespace contains at least one ServiceAccount: the default ServiceAccount for that namespace, named `default`. 
If you do not specify a ServiceAccount when you create a Pod, Kubernetes automatically assigns the ServiceAccount named `default` in that namespace.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  namespace: go-micro
  name: go-micro-services
```

Just simple as that, and then write RBAC files that operate Pods.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  namespace: go-micro
  name: go-micro-registry
rules:
  - apiGroups: [ "" ]
    resources: [ "pods" ]
    verbs: [ "get", "list", "patch", "watch" ]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  namespace: go-micro
  name: go-micro-registry
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: go-micro-registry
subjects:
  - kind: ServiceAccount
    namespace: go-micro
    name: go-micro-services
```

Continue to write RBAC files that operate ConfigMap:

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: go-micro
  name: go-micro-config
  labels:
    app: go-micro-config
rules:
  - apiGroups: [ "" ]
    resources: [ "configmaps" ]
    verbs: [ "get", "update", "list", "watch" ]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: go-micro
  name: go-micro-config
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: go-micro-config
subjects:
  - kind: ServiceAccount
    namespace: go-micro
    name: go-micro-services
```

Then apply it now:

```yaml
kubectl apply -f .k8s/serviceaccount.yaml
kubectl apply -f .k8s/configmap-rbac.yaml
kubectl apply -f .k8s/pod-rbac.yaml
```

### Build & deploy gRPC services

Go-Micro needs to cooperate with the following fields to run properly on Kubernetes:
- `gomicro-service-id`: define the ID of the service
- `gomicro-service-app`: define the name of the service
- `gomicro-service-version`: define the version of the service
- `gomicro-service-metadata`: define the metadata of the service
- `gomicro-service-protocols`: define the protocols of the service

There is a simple code to work properly with inside or outside the Kubernetes cluster.

```go
// NewK8sConfigSource creates a remote config source - Kubernetes
func NewK8sConfigSource(c *conf.RemoteConfig) config.Source {
	_, kubeConfig, err := getK8sClientSet(c.K8S.GetMasterUrl())
	if err != nil {
		log.Fatal(err)
	}
	options := []k8sGoMicro.Option{
		k8sGoMicro.Namespace(c.K8S.GetNamespace()),
		k8sGoMicro.LabelSelector(c.K8S.GetLabelSelector()),
		k8sGoMicro.FieldSelector(c.K8S.GetFieldSelector()),
	}
	if kubeConfig != "" {
		options = append(options, k8sGoMicro.KubeConfig(kubeConfig))
	}
	source := k8sGoMicro.NewSource(options...)
	return source
}

// NewK8sRegistry creates a registry discovery client - Kubernetes
func NewK8sRegistry(c *conf.Registry) *k8sMicro.Registry {
	clientSet, _, err := getK8sClientSet(c.K8S.GetMasterUrl())
	if err != nil {
		log.Fatal(err)
	}
	r := k8sMicro.NewRegistry(clientSet)
	r.Start()
	return r
}

func getK8sClientSet(masterUrl string) (*kubernetes.Clientset, string, error) {
	kubeConfig := ""
	restConfig, err := rest.InClusterConfig()
	if err != nil {
		kubeConfig = filepath.Join(homedir.HomeDir(), ".kube", "config")
		restConfig, err = clientcmd.BuildConfigFromFlags(masterUrl, kubeConfig)
		if err != nil {
			return nil, kubeConfig, err
		}
	}
	clientSet, err := kubernetes.NewForConfig(restConfig)
	if err != nil {
		return nil, kubeConfig, err
	}
	return clientSet, kubeConfig, nil
}
```

#### Compile and upload images

Token service:

```shell
cd token-srv
make docker
make docker-push
```

User service:

```shell
cd user-srv
make docker
make docker-push
```

Admin service:

```shell
cd admin-srv
make docker
make docker-push
```

To speed up development, you can setup docker to reuse the Docker daemon running in the Minikube virtual machine.

```shell
eval $(minikube docker-env)
```

This way, you don't need to push the image to Docker for registration. 
And of course, you don't need to run the `make docker-push` command anymore.

#### Write Deployment, Service, and ConfigMap files

Deployment file for Token service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: go-micro
  name: token-srv
  labels:
    app: token-srv
spec:
  replicas: 1
  selector:
    matchLabels:
      app: token-srv
  template:
    metadata:
      labels:
        app: token-srv
        gomicro-service-id: "0002.go-micro.token-srv"
        gomicro-service-app: "go-micro.token-srv"
        gomicro-service-version: "v1.0.0"
      annotations:
        gomicro-service-protocols: |
          {"9090": "grpc"}
        gomicro-service-metadata: |
          {"region": "sh", "zone": "sh001", "cluster": "pd"}
    spec:
      containers:
        - name: token-srv
          image: devexps/token-srv:k8s
          imagePullPolicy: Always
          ports:
            - containerPort: 9090
              name: grpc-port
      serviceAccountName: go-micro-services
```

Service file for Token service:

```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: go-micro
  name: token-srv
  labels:
    app: token-srv
spec:
  ports:
    - port: 9090
      name: token-srv-grpc
      targetPort: 9090
  selector:
    app: token-srv
```

ConfigMap file for Token service:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: go-micro
  name: token-srv
  labels:
    app: token-srv
data:
  config.yaml: |
    server:
      grpc:
        addr: 0.0.0.0:9090
        timeout: 1s

    registry:
      type: "k8s"
```

Deployment file for User service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: go-micro
  name: user-srv
  labels:
    app: user-srv
spec:
  replicas: 1
  selector:
    matchLabels:
      app: user-srv
  template:
    metadata:
      labels:
        app: user-srv
        gomicro-service-id: "0002.go-micro.user-srv"
        gomicro-service-app: "go-micro.user-srv"
        gomicro-service-version: "v1.0.0"
      annotations:
        gomicro-service-protocols: |
          {"9090": "grpc"}
        gomicro-service-metadata: |
          {"region": "sh", "zone": "sh001", "cluster": "pd"}
    spec:
      containers:
        - name: user-srv
          image: devexps/user-srv:k8s
          imagePullPolicy: Always
          ports:
            - containerPort: 9090
              name: grpc-port
      serviceAccountName: go-micro-services
```

Service file for User service:

```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: go-micro
  name: user-srv
  labels:
    app: user-srv
spec:
  ports:
    - port: 9090
      name: user-srv-grpc
      targetPort: 9090
  selector:
    app: user-srv
```

ConfigMap file for User service:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: go-micro
  name: user-srv
  labels:
    app: user-srv
data:
  config.yaml: |
    server:
      grpc:
        addr: 0.0.0.0:9090
        timeout: 1s

    registry:
      type: "k8s"
```

Deployment file for Admin service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: go-micro
  name: admin-srv
  labels:
    app: admin-srv
spec:
  replicas: 1
  selector:
    matchLabels:
      app: admin-srv
  template:
    metadata:
      labels:
        app: admin-srv
        gomicro-service-id: "0001.go-micro.admin-srv"
        gomicro-service-app: "go-micro.admin-srv"
        gomicro-service-version: "v1.0.0"
      annotations:
        gomicro-service-protocols: |
          {"8080": "http", "9090": "grpc"}
        gomicro-service-metadata: |
          {"region": "sh", "zone": "sh001", "cluster": "pd"}
    spec:
      containers:
        - name: admin-srv
          image: devexps/admin-srv:k8s
          imagePullPolicy: Always
          ports:
            - containerPort: 8080
              name: http-port
            - containerPort: 9090
              name: grpc-port
      serviceAccountName: go-micro-services
```

Service file for Admin service:

```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: go-micro
  name: admin-srv
  labels:
    app: admin-srv
spec:
  type: NodePort
  ports:
    - port: 8080
      name: admin-srv-http
      nodePort: 30000
    - port: 9090
      name: admin-srv-grpc
      nodePort: 30001
  selector:
    app: admin-srv
```

ConfigMap file for Admin service:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: go-micro
  name: admin-srv
  labels:
    app: admin-srv
data:
  config.yaml: |
    server:
      http:
        addr: 0.0.0.0:8080
        timeout: 1s
        headers:
          - "Content-Type"
          - "Authorization"
        methods:
          - "GET"
          - "POST"
          - "PUT"
          - "DELETE"
          - "HEAD"
          - "OPTIONS"
        origins:
          - "*"
      grpc:
        addr: 0.0.0.0:9090
        timeout: 1s

    client:
      grpc:
        timeout: 1s

    registry:
      type: "k8s"
```

#### Rapid deployment

As set in the configuration files, the Admin service runs on a single Pod and Token, User service too, to keep things easy. You can definitely change the ` replicas: 1` to the number of copy instances you want.

```shell
kubectl apply -f .k8s/token-srv-configmap.yaml
kubectl apply -f .k8s/token-srv-deployment.yaml
kubectl apply -f .k8s/token-srv-service.yaml
kubectl apply -f .k8s/user-srv-configmap.yaml
kubectl apply -f .k8s/user-srv-deployment.yaml
kubectl apply -f .k8s/user-srv-service.yaml
kubectl apply -f .k8s/admin-srv-configmap.yaml
kubectl apply -f .k8s/admin-srv-deployment.yaml
kubectl apply -f .k8s/admin-srv-service.yaml
```

Let's view running status, registration status, and startup logs:

```shell
kubectl get pods -n go-micro -o wide
NAME                         READY   STATUS    RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
admin-srv-65df4c5bcd-vdn48   1/1     Running   0          9s    10.244.0.11   minikube   <none>           <none>
token-srv-54b8c998f5-zzdhz   1/1     Running   0          39s   10.244.0.10   minikube   <none>           <none>
user-srv-5fc4d67dd5-sm9g4    1/1     Running   0          59s   10.244.0.9    minikube   <none>           <none>
```

Token service logs:

```shell
kubectl logs token-srv-54b8c998f5-zzdhz -n go-micro
DEBUG msg=config loaded: remote.yaml format: yaml
DEBUG msg=config loaded: go-micro/token-srv/config.yaml format: yaml
INFO service.id=token-srv-54b8c998f5-zzdhz service.name=go-micro.token-srv service.version=0723caf ts=2023-09-24T04:58:55Z caller=grpc/server.go:206 trace_id= span_id= msg=[gRPC] server listening on: [::]:9090
```

User service logs:

```shell
kubectl logs user-srv-5fc4d67dd5-sm9g4 -n go-micro
DEBUG msg=config loaded: remote.yaml format: yaml
DEBUG msg=config loaded: go-micro/user-srv/config.yaml format: yaml
INFO service.id=user-srv-5fc4d67dd5-sm9g4 service.name=go-micro.user-srv service.version=0723caf ts=2023-09-24T04:58:37Z caller=grpc/server.go:206 trace_id= span_id= msg=[gRPC] server listening on: [::]:9090
```

Admin service logs & registration status:

```shell
kubectl logs admin-srv-65df4c5bcd-vdn48 -n go-micro
DEBUG msg=config loaded: remote.yaml format: yaml
DEBUG msg=config loaded: go-micro/admin-srv/config.yaml format: yaml
INFO service.id=admin-srv-65df4c5bcd-vdn48 service.name=go-micro.admin-srv service.version=0723caf ts=2023-09-24T04:59:21Z caller=http/server.go:303 trace_id= span_id= msg=[HTTP] server listening on: [::]:8080
INFO service.id=admin-srv-65df4c5bcd-vdn48 service.name=go-micro.admin-srv service.version=0723caf ts=2023-09-24T04:59:21Z caller=grpc/server.go:206 trace_id= span_id= msg=[gRPC] server listening on: [::]:9090
INFO service.id=admin-srv-65df4c5bcd-vdn48 service.name=go-micro.admin-srv service.version=0723caf ts=2023-09-24T04:59:21Z caller=discovery/resolver.go:97 trace_id= span_id= msg=[resolver] update instances: [{"id":"user-srv-5fc4d67dd5-sm9g4.go-micro.user-srv","name":"go-micro.user-srv","version":"0723caf","metadata":{},"endpoints":["grpc://10.244.0.9:9090"]}]
INFO service.id=admin-srv-65df4c5bcd-vdn48 service.name=go-micro.admin-srv service.version=0723caf ts=2023-09-24T04:59:21Z caller=discovery/resolver.go:97 trace_id= span_id= msg=[resolver] update instances: [{"id":"token-srv-54b8c998f5-zzdhz.go-micro.token-srv","name":"go-micro.token-srv","version":"0723caf","metadata":{},"endpoints":["grpc://10.244.0.10:9090"]}]
```

### Testing

First, you have to get the URL of the Admin service. It's just simple because you have had a configuration Node Port for the Admin service before.

```shell
minikube service admin-srv -n go-micro      
|-----------|-----------|---------------------|---------------------------|
| NAMESPACE |   NAME    |     TARGET PORT     |            URL            |
|-----------|-----------|---------------------|---------------------------|
| go-micro  | admin-srv | admin-srv-http/8080 | http://192.168.49.2:30000 |
|           |           | admin-srv-grpc/9090 | http://192.168.49.2:30001 |
|-----------|-----------|---------------------|---------------------------|
🏃  Starting tunnel for service admin-srv.
|-----------|-----------|-------------|------------------------|
| NAMESPACE |   NAME    | TARGET PORT |          URL           |
|-----------|-----------|-------------|------------------------|
| go-micro  | admin-srv |             | http://127.0.0.1:64630 |
|           |           |             | http://127.0.0.1:64631 |
|-----------|-----------|-------------|------------------------|
[go-micro admin-srv  http://127.0.0.1:64630   http://127.0.0.1:64631]
```

#### HTTP

We can run an HTTP API test with this endpoint: `http://127.0.0.1:64630`

```shell
curl -X 'POST' \
  'http://127.0.0.1:64630/admin/v1/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "userName": "thangn",
  "password": "123456"
}'
```

And the result will be shown:

```json
{
  "id": "1",
  "userName": "thangn",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUzNTkyNDYsInBsYXRmb3JtIjoiVE9LRU5fUExBVEZPUk1fV0VCIiwic3ViIjoidGhhbmduIiwidWlkIjoiMSJ9.kieQAm75DWlb6Pa7hmX76dpzNDJXwGNpbLpfA-Jcy_o"
}
```

#### gRPC

We can also run a gRPC API test with this endpoint: `http://127.0.0.1:64631`

```shell
grpcurl -plaintext -d '{"userName":"thangn","password":"123456"}' 127.0.0.1:64631 admin_srv.v1.AuthenticationService/Login
```

And then we'll see the result like this:

```json
{
  "id": "1",
  "userName": "thangn",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUzNTk0NjcsInBsYXRmb3JtIjoiVE9LRU5fUExBVEZPUk1fV0VCIiwic3ViIjoidGhhbmduIiwidWlkIjoiMSJ9.tLKmZUe2TW6X4DOWVDfkLBz8fKwPN6LgYjcQuLTZlu0"
}
```

Code repository: [https://github.com/devexps/go-examples/k8s](https://github.com/devexps/go-examples/tree/main/k8s)

This article shows you how to run simple Go-Micro services on a Kubernetes cluster and also uses its powerful built-in ConfigMap and API Server. Before doing so,  you have to learn more about Kubernetes concepts and learn how to perform specific tasks. At this point, I just remembered that I forgot an important thing about the `Health check` step. It looks like I'm out of paper, so I will give that step to you :). Hopefully, this article is informative and useful for you.
In this article, you'll learn how to deploy simple Go-Micro services on a Kubernetes cluster while leveraging its powerful built-in ConfigMap and API Server. However, before diving into the specifics of the deployment process, it's essential to understand the fundamental concepts of Kubernetes and acquire the necessary skills to carry out specific tasks. As I was going over the `Health check` step, I realized that I had missed an essential detail. It looks like I'm out of paper, so I'll leave that step to you. I hope you find this article informative and helpful.

## References

- [https://kubernetes.io](https://kubernetes.io)
- [gRPC naming and discovery](https://etcd.io/docs/v3.5/dev-guide/grpc_naming/)
- [Discovery architecture](https://www.ibm.com/docs/en/networkmanager/4.2.0?topic=discovery-architecture)