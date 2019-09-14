---
layout: post
title: "Kubernetes Tutorial for Beginners"
date: "2019-09-06 14:14:14 +0700"
---

Kubernetes is an open-source system for automating deployment, scaling and managing containerized applications. With this platform, we can decompose (or orchestrate) our applications into smaller systems (called microservices) while developing.

Currently, several services around the global provide different Kubernetes implementations:

- **Minikube**: An open-source tool that we can install in our local machine to use Kubernetes locally. This tool uses a virtualization solution (like VirtualBox or similar) to set up a local Kubernetes cluster.
- Google Kubernetes Engine (**GKE**), Amazon Elastic Kubernetes Service (**EKS**), Azure Kubernetes Service (**AKS**), OpenShift Kubernetes.

Among the most popular above, **Minikube** is the only solution that is free forever, but it is also not that useful, as it runs locally only. Some of the other solutions offer free tiers that will allow to get started without paying a dime, they will charge we money to keep our clusters running eventually.

<p align="center">
<img src="/assets/thoughts/devops/hello_kube_with_go/kube_ingress.png" width="100%" alt="Ingress Model - kubernetes.io">
</p>

### Installing Kube Control (kubectl)

Before spinning up a Kubernetes cluster, we'll need a tool called **kubectl**. This tool will allow we to manage our Kubernetes cluster with easy from a terminal. To install *kubectl*, we should head to this resource and choose from the list shown - the instructions for our operating system.

Once the installation is complete, type the following command to start a Kubernetes cluster:

```console
$ minikube start
😄  minikube v1.3.1 on Darwin 10.14.1
🔥  Creating virtualbox VM (CPUs=2, Memory=2000MB, Disk=20000MB) ...
🐳  Preparing Kubernetes v1.15.2 on Docker 18.09.8 ...
🚜  Pulling images ...
🚀  Launching Kubernetes ...
⌛  Waiting for: apiserver proxy etcd scheduler controller dns
🏄  Done! kubectl is now configured to use "minikube"
```

After following these instructions, installing and starting *kubectl* in our machine, we can confirm that the tool is indeed available by terminal command:

```console
$ kubectl version
Client Version: version.Info{Major:"1", Minor:"15", GitVersion:"v1.15.2", GitCommit:"f6278300bebbb750328ac16ee6dd3aa7d3549568", GitTreeState:"clean", BuildDate:"2019-08-05T16:54:35Z", GoVersion:"go1.12.7", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"15", GitVersion:"v1.15.2", GitCommit:"f6278300bebbb750328ac16ee6dd3aa7d3549568", GitTreeState:"clean", BuildDate:"2019-08-05T09:15:22Z", GoVersion:"go1.12.5", Compiler:"gc", Platform:"linux/amd64"}
```

The output of the above command will show the client version, the release of *kubectl*. And this means is that we have *kubectl* properly installed successfully.

### Deploying a Kubernetes Application

After all this setup, now it is time to deploy our first Kubernetes application. As such, to speed up the process, instead of creating a new application for that, we will deploy a sample application that we already exists. [Yes, we had one :)](/2019/09/04/docker-tutorial-for-beginners/)

The first thing we'll do is to create a lot of YAML files, because while using Kubernetes, we'll often use this **markup language** to describe the resources that we'll orchestrate in our clusters.

The first, create a file called **hello-kube-deployment.yaml** inside our project's directory, and add the following code to it, like this:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-kube-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-kube-deployment
  template:
    metadata:
      labels:
        app: hello-kube-deployment
    spec:
      containers:
      - name: hello-kube-app
        image: devexps/hello-kube-app
        ports:
          - containerPort: 12345
```

Well, this configuration file is not struggle to understand. Basically, this file define a deployment object (**kind: Deployment**) that creates a container named **hello-kube-app**. This container uses an image called **devexps/hello-kube-app** to run the sample go application. By default, Kubernetes will try to fetch images from the public [Docker Hub](https://hub.docker.com/u/devexps) registry. However, we can also use private registries if we want to keep our images.

Now, We don't worry about the other properties of this file, we'll learn about them when the time comes. However, we need to focus on some important parts first:

- **Deployment**: a description of the desired state of the system. In this case, we want to tell with Kubernetes cluster that how many **pods** of a particular application we want running. And we're specifying that we want two *pods* (**replicas: 2**)

- **Container**: a part of a *pod* that holds running applications, libraries, dependencies, etc. *Containers* can be exposed to the world through an external IP address.

- **Pod**: is the smallest deployable unit of computing that can be created and managed in Kubernetes ([the official document](https://kubernetes.io/docs/concepts/workloads/pods/pod/)). In this case, our pods containt a single container - the sample go application.

Then, to run this deployment in our kubernetes cluster, make sure we're just inside our project's directory, and following the command line:

```console
$ kubectl apply -f hello-kube-deployment.yaml
deployment.apps/hello-kube-deployment created
```

After running above command, cluster will be starting and it make an effort to run both *pods* (*replicas: 2*) on our cluster's nodes. Now, typing the command to confirm that our pods are indeed up and running:

```console
$ kubectl get pods
NAME                                     READY   STATUS    RESTARTS   AGE
hello-kube-deployment-7ffbc4f9f9-99442   1/1     Running   0          19s
hello-kube-deployment-7ffbc4f9f9-jqn45   1/1     Running   0          19s
```

We'll see a list of available pods in our Kubernetes cluster. On that list, we can see that we have two pods and each pod containers we also see their *READY*, *STATUS*, how many times *RESTARTS* and *AGE*.

Now, we might be thinking that "great, I just deployed a sample Go application into my Kubernetes cluster, now I can start using it with a browser". Well, you can try using it :). But things are not that simple, the problem is that each pods by itself is not accessible by the outside world. Each one of these pods has a different *IP address* inside our cluster, if one of them stops working (for whatever reason), Kubernetes will launch a new pod and will give another *IP address* for that pod. Therefore, it would be difficult for our to keep and track these *IP addresses* manually. To solve this problem, we'll use Kubernetes's services.

Really simple, create a file called **hello-kube-service.yaml** and insert the following code to it:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-kube-service
spec:
  ports:
  - port: 8080
    protocol: TCP
    targetPort: 12345
  selector:
    app: hello-kube-deployment
  type: ClusterIP
```

In this file, we added the **selector.app** property on the service description, pointing to **hello-kube-deployment**. Kubernetes will use these properties to tie this service to the deployment's pods. And we're defining that this service will listen on **port: 8080** and that it will **targetPort: 12345** on pods. If recheck on our deployment file, we'll see that our containers will use correctly this port (**containerPort: 12345**). That really important, to make sure that our service will target the correct port when redirecting requests to our pods.

Then, we can use the following command to create this service in our Kubernetes cluster:

```console
$ kubectl apply -f hello-kube-service.yaml
service/hello-kube-service created
```

After running above command, Kubernetes will create a service to represent our deployment in cluster. Finally, we need to define an **ingress** to expose this service to the outside world. Let's create a file called **hello-kube-ingress.yaml** with the following code:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: hello-kube-ingress
spec:
  rules:
  - http:
      paths:
      - path: /
        backend:
          serviceName: hello-kube-service
          servicePort: 8080
```

In this file, we define an [ingress resource with a single rule](https://kubernetes.io/docs/concepts/services-networking/ingress) (**spec.rules**), tell with Kubernetes that we want requests pointing to the root path (**path: /**) to redirect to the **hello-kube-service** on port (**servicePort: 8080**)

To deploy the new *ingress** in our cluster, we can follow the command line:

```console
$ kubectl apply -f hello-kube-ingress.yaml
ingress.extensions/hello-kube-ingress created
```

Then, to see the result, we'll need to get the public IP address of our Kubernetes cluster, let's following the command below:

```console
$ minikube ip
192.168.99.102
```

This command will output an IP address that we can use in our browser to see the result. So, if we open the browser and navigate to this IP address, we'll see the sample Go application that we just deployed. Simply way with the terminal:

```console
$ curl http://192.168.99.102
Hello devexps from a docker container and Kubernetes
```

That's it! we created a Kubernetes cluster on local machine and used it to spin up a sample Go application. While deploying this app, we learned basic Kubernetes concepts like *deployments*, *pods*, *containers*, *services* and *ingresses*. With this knowledge, we are now ready to move on Kubernetes advanced concepts.

You can find the complete source code for the Go app and all YAML files in the [Github Repository](https://github.com/devexps/devops/tree/master/hello_kube_with_go).

Okay, I'll see you next article, see you soon!
