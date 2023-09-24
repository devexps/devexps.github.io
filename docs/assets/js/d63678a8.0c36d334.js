"use strict";(self.webpackChunkgo_micro=self.webpackChunkgo_micro||[]).push([[1582],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>g});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(t),d=a,g=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return t?r.createElement(g,i(i({ref:n},p),{},{components:t})):r.createElement(g,i({ref:n},p))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=d;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[m]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3355:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=t(7462),a=(t(7294),t(3905));const o={title:"How microservice framework (Go-Micro) runs on Kubernetes cluster",description:"How microservice framework (Go-Micro) runs on a Kubernetes cluster",tags:["go-micro","microservice","framework","kubernetes","k8s-discovery","k8s-registry","k8s-configmap"],image:"/assets/thoughts/go-micro/go-micro-on-k8s/screenshot-000.png",hide_table_of_contents:!1},i=void 0,s={permalink:"/2023/09/25/go-micro-on-kubernetes-cluster",source:"@site/blog/2023-09-25-go-micro-on-kubernetes-cluster.md",title:"How microservice framework (Go-Micro) runs on Kubernetes cluster",description:"How microservice framework (Go-Micro) runs on a Kubernetes cluster",date:"2023-09-25T00:00:00.000Z",formattedDate:"September 25, 2023",tags:[{label:"go-micro",permalink:"/tags/go-micro"},{label:"microservice",permalink:"/tags/microservice"},{label:"framework",permalink:"/tags/framework"},{label:"kubernetes",permalink:"/tags/kubernetes"},{label:"k8s-discovery",permalink:"/tags/k-8-s-discovery"},{label:"k8s-registry",permalink:"/tags/k-8-s-registry"},{label:"k8s-configmap",permalink:"/tags/k-8-s-configmap"}],readingTime:13.185,hasTruncateMarker:!0,authors:[],frontMatter:{title:"How microservice framework (Go-Micro) runs on Kubernetes cluster",description:"How microservice framework (Go-Micro) runs on a Kubernetes cluster",tags:["go-micro","microservice","framework","kubernetes","k8s-discovery","k8s-registry","k8s-configmap"],image:"/assets/thoughts/go-micro/go-micro-on-k8s/screenshot-000.png",hide_table_of_contents:!1},nextItem:{title:"Locally deploy Docker development environment",permalink:"/2023/09/09/locally-deploy-docker-development-environment"}},l={authorsImageUrls:[]},c=[{value:"Overview",id:"overview",level:2},{value:"Service Discovery",id:"service-discovery",level:2},{value:"In Traditional",id:"in-traditional",level:3},{value:"In Kubernetes",id:"in-kubernetes",level:3},{value:"Go-Micro on Kubernetes",id:"go-micro-on-kubernetes",level:2},{value:"Go-Micro plugins",id:"go-micro-plugins",level:3},{value:"Start a Kubernetes cluster",id:"start-a-kubernetes-cluster",level:3},{value:"Create a Kubernetes namespace",id:"create-a-kubernetes-namespace",level:3},{value:"Create RBAC",id:"create-rbac",level:3},{value:"Build &amp; deploy gRPC services",id:"build--deploy-grpc-services",level:3},{value:"Compile and upload images",id:"compile-and-upload-images",level:4},{value:"Write Deployment, Service, and ConfigMap files",id:"write-deployment-service-and-configmap-files",level:4},{value:"Rapid deployment",id:"rapid-deployment",level:4},{value:"Testing",id:"testing",level:3},{value:"HTTP",id:"http",level:4},{value:"gRPC",id:"grpc",level:4},{value:"References",id:"references",level:2}],p={toc:c},m="wrapper";function u(e){let{components:n,...t}=e;return(0,a.kt)(m,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"overview"},"Overview"),(0,a.kt)("p",null,"This article mainly demonstrates how the microservice framework (Go-Micro) runs on a Kubernetes cluster and performs service discovery registration and configuration management by calling APIServer."),(0,a.kt)("p",null,"First of all, let me get something straight this article doesn't aim to tell all about what you want to know, instead I assume that if you are still here, reading all about what I'm going to say, you're the person who already have the base knowledge in somewhat that I'll present."),(0,a.kt)("p",null,"As I said, I'll quickly go around the two main characteristics below and focus on the example that helps you feel more confident to put your own microservices using some useful built-in on the Kubernetes cluster."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Service discovery and registration based on Kubernetes."),(0,a.kt)("li",{parentName:"ul"},"Configuration management based on Kubernetes Configmap.")),(0,a.kt)("h2",{id:"service-discovery"},"Service Discovery"),(0,a.kt)("p",null,"Before jumping to any Kubernetes specifics, let's talk a little bit about the service discovery meaning in general."),(0,a.kt)("p",null,"Nowadays, it's a common practice to run multiple copies of a service at the same time. Every such copy is a separate instance of the service represented by a network endpoint (i.e. some IP and Port).\nTraditionally, virtual or physical machines have been used to host those endpoints with the shift towards containers in more recent times. Having multiple instances of the service running simultaneously increases its availability and helps to adjust the service capacity to meet the traffic demand. On the other hand, it also complicates the setup, for example, before accessing the service, the client needs to figure out the actual IP address and the port it should use. The situation becomes even more tricky, for example when new instances come or existing instances go into failure or maintenance, etc. That's why we have the name called ",(0,a.kt)("inlineCode",{parentName:"p"},"service discovery")," and it's an integral part of the microservice system."),(0,a.kt)("h3",{id:"in-traditional"},"In Traditional"),(0,a.kt)("p",null,"There are so many types of service-discovery traditional and this is the one - ",(0,a.kt)("inlineCode",{parentName:"p"},"Client-Side Service Discovery"),". If we keep the service registry component around, we can teach the clients to look up the service instance addresses directly in the service registry. After obtaining the complete list of IP addresses that make up the service queue, clients can select instances based on the load-balancing policy available to them. In this case, service discovery will only happen on the client side. "),(0,a.kt)("p",{align:"center"},(0,a.kt)("img",{src:"/assets/thoughts/go-micro/go-micro-on-k8s/screenshot-001.png",width:"100%",alt:"go-micro-on-k8s-screenshot-001"})),(0,a.kt)("p",null,"The benefits of the client-side approach mostly come from the absence of the load balancer. There is neither a single point of failure nor a potential throughput bottleneck in the system design. However,  client-side service discovery couples clients with the service registry. It requires some integration code to be written for every programming language or framework in your ecosystem. Obviously, this extra logic complicates the clients but this implementation of client-side service discovery is also one of my choices and preferences."),(0,a.kt)("h3",{id:"in-kubernetes"},"In Kubernetes"),(0,a.kt)("p",null,"First of all, let's play an analogy game! If we were to draw some analogy between Kubernetes and more traditional architectures. I would compare Kubernetes pods with service instances."),(0,a.kt)("p",null,"Pods are many things to many people, however, when it comes to networking the documentation clearly states that:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},'"...Pods can be treated much like VMs or physical hosts from the perspectives of port allocation, naming, service discovery, load balancing, application configuration, and migration."')),(0,a.kt)("p",null,"If Pods correspond to individual instances of a service, I would expect a similar analogy for the service, as a logical grouping of instances, itself. And indeed there is a suitable concept in Kubernetes called: a Service."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},'"In Kubernetes, a Service is an abstraction which defines a logical set of Pods and a policy by which to access them (sometimes this pattern is called a micro-service)."')),(0,a.kt)("p",null,"In my opinion, while creating a new Service, we should choose a name that references the set of Pods that make up the service. In addition to this, the service maintains an up-to-date list of IP addresses for its Pods, which are organized into Endpoints objects. To quote the documentation again:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\"...if you're able to use Kubernetes APIs for service discovery in your application, you can query the API server for Endpoints, ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("em",{parentName:"strong"},"[I guess using the Service name]")),' that get updated whenever the set of Pods in a Service changes."')),(0,a.kt)("p",null,"Well, sounds like an invitation to implement a Kubernetes-native client-side service discovery with the Kubernetes control plane playing the role of the service registry."),(0,a.kt)("p",{align:"center"},(0,a.kt)("img",{src:"/assets/thoughts/go-micro/go-micro-on-k8s/screenshot-002.png",width:"100%",alt:"go-micro-on-k8s-screenshot-002"})),(0,a.kt)("p",null,"However, the only real-world usage of this mechanism I've known so far was in the ",(0,a.kt)("inlineCode",{parentName:"p"},"service mesh")," kind of software. It's a bit unfair to mention it here though because service mesh itself is needed to provide, in particular, the service discovery mechanism for its users. So, don't worry I'll introduce to you the real client-side service discovery implementations leveraging Kubernetes Endpoints API."),(0,a.kt)("h2",{id:"go-micro-on-kubernetes"},"Go-Micro on Kubernetes"),(0,a.kt)("h3",{id:"go-micro-plugins"},"Go-Micro plugins"),(0,a.kt)("p",null,"The version should be selected as ",(0,a.kt)("inlineCode",{parentName:"p"},"latest"),", because the relevant plug-ins for service registration Kubernetes and service configuration Kubernetes should be available with the latest version."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"go get github.com/devexps/go-micro/v2@latest\ngo get github.com/devexps/go-micro/config/k8s/v2@latest\ngo get github.com/devexps/go-micro/registry/k8s/v2@latest\n")),(0,a.kt)("h3",{id:"start-a-kubernetes-cluster"},"Start a Kubernetes cluster"),(0,a.kt)("p",null,"You need to have a Kubernetes cluster, and the ",(0,a.kt)("inlineCode",{parentName:"p"},"kubectl")," command-line tool must be configured to communicate with your cluster.\nIf you do not already have a cluster, you can create one by using ",(0,a.kt)("inlineCode",{parentName:"p"},"Minikube")," like me."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'minikube start --network=socket_vmnet   \n              \n\ud83d\ude04  minikube v1.31.2 on Darwin 13.5 (arm64)\n\u2728  Automatically selected the docker driver. Other choices: qemu2, ssh\n\ud83d\udccc  Using Docker Desktop driver with root privileges\n\ud83d\udc4d  Starting control plane node minikube in cluster minikube\n\ud83d\ude9c  Pulling base image ...\n    > gcr.io/k8s-minikube/kicbase...:  404.50 MiB / 404.50 MiB  100.00% 3.32 Mi\n\ud83d\udd25  Creating docker container (CPUs=2, Memory=4000MB) ...\n\ud83d\udc33  Preparing Kubernetes v1.27.4 on Docker 24.0.4 ...\n    \u25aa Generating certificates and keys ...\n    \u25aa Booting up control plane ...\n    \u25aa Configuring RBAC rules ...\n\ud83d\udd17  Configuring bridge CNI (Container Networking Interface) ...\n\ud83d\udd0e  Verifying Kubernetes components...\n    \u25aa Using image gcr.io/k8s-minikube/storage-provisioner:v5\n\ud83c\udf1f  Enabled addons: default-storageclass, storage-provisioner\n\ud83c\udfc4  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default\n')),(0,a.kt)("h3",{id:"create-a-kubernetes-namespace"},"Create a Kubernetes namespace"),(0,a.kt)("p",null,"In Kubernetes, namespaces provide a mechanism for isolating groups of resources within a single cluster. You can omit this step if you want to use the ",(0,a.kt)("inlineCode",{parentName:"p"},"default")," namespace. But I encourage you to create a new one and all services run under that namespace."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Namespace\nmetadata:\n  namespace: go-micro\n  name: go-micro\n")),(0,a.kt)("p",null,"Deploy this namespace:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f .k8s/namespace.yaml\n")),(0,a.kt)("p",null,"Then view the result:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl get ns | grep micro\ngo-micro               Active   32h\n")),(0,a.kt)("h3",{id:"create-rbac"},"Create RBAC"),(0,a.kt)("p",null,"The permissions to bind ",(0,a.kt)("inlineCode",{parentName:"p"},"serviceaccount")," to operate Pods and operate ConfigMap will be mounted to each Pod under /var/run/secrets/kubernetes.io/serviceaccount."),(0,a.kt)("p",null,"First of all, let's create a service account.\nEvery Kubernetes namespace contains at least one ServiceAccount: the default ServiceAccount for that namespace, named ",(0,a.kt)("inlineCode",{parentName:"p"},"default"),".\nIf you do not specify a ServiceAccount when you create a Pod, Kubernetes automatically assigns the ServiceAccount named ",(0,a.kt)("inlineCode",{parentName:"p"},"default")," in that namespace."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  namespace: go-micro\n  name: go-micro-services\n")),(0,a.kt)("p",null,"Just simple as that, and then write RBAC files that operate Pods."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRole\nmetadata:\n  namespace: go-micro\n  name: go-micro-registry\nrules:\n  - apiGroups: [ "" ]\n    resources: [ "pods" ]\n    verbs: [ "get", "list", "patch", "watch" ]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRoleBinding\nmetadata:\n  namespace: go-micro\n  name: go-micro-registry\nroleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: ClusterRole\n  name: go-micro-registry\nsubjects:\n  - kind: ServiceAccount\n    namespace: go-micro\n    name: go-micro-services\n')),(0,a.kt)("p",null,"Continue to write RBAC files that operate ConfigMap:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'kind: Role\napiVersion: rbac.authorization.k8s.io/v1\nmetadata:\n  namespace: go-micro\n  name: go-micro-config\n  labels:\n    app: go-micro-config\nrules:\n  - apiGroups: [ "" ]\n    resources: [ "configmaps" ]\n    verbs: [ "get", "update", "list", "watch" ]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  namespace: go-micro\n  name: go-micro-config\nroleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: Role\n  name: go-micro-config\nsubjects:\n  - kind: ServiceAccount\n    namespace: go-micro\n    name: go-micro-services\n')),(0,a.kt)("p",null,"Then apply it now:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"kubectl apply -f .k8s/serviceaccount.yaml\nkubectl apply -f .k8s/configmap-rbac.yaml\nkubectl apply -f .k8s/pod-rbac.yaml\n")),(0,a.kt)("h3",{id:"build--deploy-grpc-services"},"Build & deploy gRPC services"),(0,a.kt)("p",null,"Go-Micro needs to cooperate with the following fields to run properly on Kubernetes:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"gomicro-service-id"),": define the ID of the service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"gomicro-service-app"),": define the name of the service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"gomicro-service-version"),": define the version of the service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"gomicro-service-metadata"),": define the metadata of the service"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"gomicro-service-protocols"),": define the protocols of the service")),(0,a.kt)("p",null,"There is a simple code to work properly with inside or outside the Kubernetes cluster."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'// NewK8sConfigSource creates a remote config source - Kubernetes\nfunc NewK8sConfigSource(c *conf.RemoteConfig) config.Source {\n    _, kubeConfig, err := getK8sClientSet(c.K8S.GetMasterUrl())\n    if err != nil {\n        log.Fatal(err)\n    }\n    options := []k8sGoMicro.Option{\n        k8sGoMicro.Namespace(c.K8S.GetNamespace()),\n        k8sGoMicro.LabelSelector(c.K8S.GetLabelSelector()),\n        k8sGoMicro.FieldSelector(c.K8S.GetFieldSelector()),\n    }\n    if kubeConfig != "" {\n        options = append(options, k8sGoMicro.KubeConfig(kubeConfig))\n    }\n    source := k8sGoMicro.NewSource(options...)\n    return source\n}\n\n// NewK8sRegistry creates a registry discovery client - Kubernetes\nfunc NewK8sRegistry(c *conf.Registry) *k8sMicro.Registry {\n    clientSet, _, err := getK8sClientSet(c.K8S.GetMasterUrl())\n    if err != nil {\n        log.Fatal(err)\n    }\n    r := k8sMicro.NewRegistry(clientSet)\n    r.Start()\n    return r\n}\n\nfunc getK8sClientSet(masterUrl string) (*kubernetes.Clientset, string, error) {\n    kubeConfig := ""\n    restConfig, err := rest.InClusterConfig()\n    if err != nil {\n        kubeConfig = filepath.Join(homedir.HomeDir(), ".kube", "config")\n        restConfig, err = clientcmd.BuildConfigFromFlags(masterUrl, kubeConfig)\n        if err != nil {\n            return nil, kubeConfig, err\n        }\n    }\n    clientSet, err := kubernetes.NewForConfig(restConfig)\n    if err != nil {\n        return nil, kubeConfig, err\n    }\n    return clientSet, kubeConfig, nil\n}\n')),(0,a.kt)("h4",{id:"compile-and-upload-images"},"Compile and upload images"),(0,a.kt)("p",null,"Token service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cd token-srv\nmake docker\nmake docker-push\n")),(0,a.kt)("p",null,"User service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cd user-srv\nmake docker\nmake docker-push\n")),(0,a.kt)("p",null,"Admin service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cd admin-srv\nmake docker\nmake docker-push\n")),(0,a.kt)("p",null,"To speed up development, you can setup docker to reuse the Docker daemon running in the Minikube virtual machine."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"eval $(minikube docker-env)\n")),(0,a.kt)("p",null,"This way, you don't need to push the image to Docker for registration.\nAnd of course, you don't need to run the ",(0,a.kt)("inlineCode",{parentName:"p"},"make docker-push")," command anymore."),(0,a.kt)("h4",{id:"write-deployment-service-and-configmap-files"},"Write Deployment, Service, and ConfigMap files"),(0,a.kt)("p",null,"Deployment file for Token service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  namespace: go-micro\n  name: token-srv\n  labels:\n    app: token-srv\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: token-srv\n  template:\n    metadata:\n      labels:\n        app: token-srv\n        gomicro-service-id: "0002.go-micro.token-srv"\n        gomicro-service-app: "go-micro.token-srv"\n        gomicro-service-version: "v1.0.0"\n      annotations:\n        gomicro-service-protocols: |\n          {"9090": "grpc"}\n        gomicro-service-metadata: |\n          {"region": "sh", "zone": "sh001", "cluster": "pd"}\n    spec:\n      containers:\n        - name: token-srv\n          image: devexps/token-srv:k8s\n          imagePullPolicy: Always\n          ports:\n            - containerPort: 9090\n              name: grpc-port\n      serviceAccountName: go-micro-services\n')),(0,a.kt)("p",null,"Service file for Token service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  namespace: go-micro\n  name: token-srv\n  labels:\n    app: token-srv\nspec:\n  ports:\n    - port: 9090\n      name: token-srv-grpc\n      targetPort: 9090\n  selector:\n    app: token-srv\n")),(0,a.kt)("p",null,"ConfigMap file for Token service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: ConfigMap\nmetadata:\n  namespace: go-micro\n  name: token-srv\n  labels:\n    app: token-srv\ndata:\n  config.yaml: |\n    server:\n      grpc:\n        addr: 0.0.0.0:9090\n        timeout: 1s\n\n    registry:\n      type: "k8s"\n')),(0,a.kt)("p",null,"Deployment file for User service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  namespace: go-micro\n  name: user-srv\n  labels:\n    app: user-srv\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: user-srv\n  template:\n    metadata:\n      labels:\n        app: user-srv\n        gomicro-service-id: "0002.go-micro.user-srv"\n        gomicro-service-app: "go-micro.user-srv"\n        gomicro-service-version: "v1.0.0"\n      annotations:\n        gomicro-service-protocols: |\n          {"9090": "grpc"}\n        gomicro-service-metadata: |\n          {"region": "sh", "zone": "sh001", "cluster": "pd"}\n    spec:\n      containers:\n        - name: user-srv\n          image: devexps/user-srv:k8s\n          imagePullPolicy: Always\n          ports:\n            - containerPort: 9090\n              name: grpc-port\n      serviceAccountName: go-micro-services\n')),(0,a.kt)("p",null,"Service file for User service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  namespace: go-micro\n  name: user-srv\n  labels:\n    app: user-srv\nspec:\n  ports:\n    - port: 9090\n      name: user-srv-grpc\n      targetPort: 9090\n  selector:\n    app: user-srv\n")),(0,a.kt)("p",null,"ConfigMap file for User service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: ConfigMap\nmetadata:\n  namespace: go-micro\n  name: user-srv\n  labels:\n    app: user-srv\ndata:\n  config.yaml: |\n    server:\n      grpc:\n        addr: 0.0.0.0:9090\n        timeout: 1s\n\n    registry:\n      type: "k8s"\n')),(0,a.kt)("p",null,"Deployment file for Admin service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  namespace: go-micro\n  name: admin-srv\n  labels:\n    app: admin-srv\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: admin-srv\n  template:\n    metadata:\n      labels:\n        app: admin-srv\n        gomicro-service-id: "0001.go-micro.admin-srv"\n        gomicro-service-app: "go-micro.admin-srv"\n        gomicro-service-version: "v1.0.0"\n      annotations:\n        gomicro-service-protocols: |\n          {"8080": "http", "9090": "grpc"}\n        gomicro-service-metadata: |\n          {"region": "sh", "zone": "sh001", "cluster": "pd"}\n    spec:\n      containers:\n        - name: admin-srv\n          image: devexps/admin-srv:k8s\n          imagePullPolicy: Always\n          ports:\n            - containerPort: 8080\n              name: http-port\n            - containerPort: 9090\n              name: grpc-port\n      serviceAccountName: go-micro-services\n')),(0,a.kt)("p",null,"Service file for Admin service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  namespace: go-micro\n  name: admin-srv\n  labels:\n    app: admin-srv\nspec:\n  type: NodePort\n  ports:\n    - port: 8080\n      name: admin-srv-http\n      nodePort: 30000\n    - port: 9090\n      name: admin-srv-grpc\n      nodePort: 30001\n  selector:\n    app: admin-srv\n")),(0,a.kt)("p",null,"ConfigMap file for Admin service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: ConfigMap\nmetadata:\n  namespace: go-micro\n  name: admin-srv\n  labels:\n    app: admin-srv\ndata:\n  config.yaml: |\n    server:\n      http:\n        addr: 0.0.0.0:8080\n        timeout: 1s\n        headers:\n          - "Content-Type"\n          - "Authorization"\n        methods:\n          - "GET"\n          - "POST"\n          - "PUT"\n          - "DELETE"\n          - "HEAD"\n          - "OPTIONS"\n        origins:\n          - "*"\n      grpc:\n        addr: 0.0.0.0:9090\n        timeout: 1s\n\n    client:\n      grpc:\n        timeout: 1s\n\n    registry:\n      type: "k8s"\n')),(0,a.kt)("h4",{id:"rapid-deployment"},"Rapid deployment"),(0,a.kt)("p",null,"As set in the configuration files, the Admin service runs on a single Pod and Token, User service too, to keep things easy. You can definitely change the ",(0,a.kt)("inlineCode",{parentName:"p"}," replicas: 1")," to the number of copy instances you want."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f .k8s/token-srv-configmap.yaml\nkubectl apply -f .k8s/token-srv-deployment.yaml\nkubectl apply -f .k8s/token-srv-service.yaml\nkubectl apply -f .k8s/user-srv-configmap.yaml\nkubectl apply -f .k8s/user-srv-deployment.yaml\nkubectl apply -f .k8s/user-srv-service.yaml\nkubectl apply -f .k8s/admin-srv-configmap.yaml\nkubectl apply -f .k8s/admin-srv-deployment.yaml\nkubectl apply -f .k8s/admin-srv-service.yaml\n")),(0,a.kt)("p",null,"Let's view running status, registration status, and startup logs:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl get pods -n go-micro -o wide\nNAME                         READY   STATUS    RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES\nadmin-srv-65df4c5bcd-vdn48   1/1     Running   0          9s    10.244.0.11   minikube   <none>           <none>\ntoken-srv-54b8c998f5-zzdhz   1/1     Running   0          39s   10.244.0.10   minikube   <none>           <none>\nuser-srv-5fc4d67dd5-sm9g4    1/1     Running   0          59s   10.244.0.9    minikube   <none>           <none>\n")),(0,a.kt)("p",null,"Token service logs:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl logs token-srv-54b8c998f5-zzdhz -n go-micro\nDEBUG msg=config loaded: remote.yaml format: yaml\nDEBUG msg=config loaded: go-micro/token-srv/config.yaml format: yaml\nINFO service.id=token-srv-54b8c998f5-zzdhz service.name=go-micro.token-srv service.version=0723caf ts=2023-09-24T04:58:55Z caller=grpc/server.go:206 trace_id= span_id= msg=[gRPC] server listening on: [::]:9090\n")),(0,a.kt)("p",null,"User service logs:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl logs user-srv-5fc4d67dd5-sm9g4 -n go-micro\nDEBUG msg=config loaded: remote.yaml format: yaml\nDEBUG msg=config loaded: go-micro/user-srv/config.yaml format: yaml\nINFO service.id=user-srv-5fc4d67dd5-sm9g4 service.name=go-micro.user-srv service.version=0723caf ts=2023-09-24T04:58:37Z caller=grpc/server.go:206 trace_id= span_id= msg=[gRPC] server listening on: [::]:9090\n")),(0,a.kt)("p",null,"Admin service logs & registration status:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'kubectl logs admin-srv-65df4c5bcd-vdn48 -n go-micro\nDEBUG msg=config loaded: remote.yaml format: yaml\nDEBUG msg=config loaded: go-micro/admin-srv/config.yaml format: yaml\nINFO service.id=admin-srv-65df4c5bcd-vdn48 service.name=go-micro.admin-srv service.version=0723caf ts=2023-09-24T04:59:21Z caller=http/server.go:303 trace_id= span_id= msg=[HTTP] server listening on: [::]:8080\nINFO service.id=admin-srv-65df4c5bcd-vdn48 service.name=go-micro.admin-srv service.version=0723caf ts=2023-09-24T04:59:21Z caller=grpc/server.go:206 trace_id= span_id= msg=[gRPC] server listening on: [::]:9090\nINFO service.id=admin-srv-65df4c5bcd-vdn48 service.name=go-micro.admin-srv service.version=0723caf ts=2023-09-24T04:59:21Z caller=discovery/resolver.go:97 trace_id= span_id= msg=[resolver] update instances: [{"id":"user-srv-5fc4d67dd5-sm9g4.go-micro.user-srv","name":"go-micro.user-srv","version":"0723caf","metadata":{},"endpoints":["grpc://10.244.0.9:9090"]}]\nINFO service.id=admin-srv-65df4c5bcd-vdn48 service.name=go-micro.admin-srv service.version=0723caf ts=2023-09-24T04:59:21Z caller=discovery/resolver.go:97 trace_id= span_id= msg=[resolver] update instances: [{"id":"token-srv-54b8c998f5-zzdhz.go-micro.token-srv","name":"go-micro.token-srv","version":"0723caf","metadata":{},"endpoints":["grpc://10.244.0.10:9090"]}]\n')),(0,a.kt)("h3",{id:"testing"},"Testing"),(0,a.kt)("p",null,"First, you have to get the URL of the Admin service. It's just simple because you have had a configuration Node Port for the Admin service before."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"minikube service admin-srv -n go-micro      \n|-----------|-----------|---------------------|---------------------------|\n| NAMESPACE |   NAME    |     TARGET PORT     |            URL            |\n|-----------|-----------|---------------------|---------------------------|\n| go-micro  | admin-srv | admin-srv-http/8080 | http://192.168.49.2:30000 |\n|           |           | admin-srv-grpc/9090 | http://192.168.49.2:30001 |\n|-----------|-----------|---------------------|---------------------------|\n\ud83c\udfc3  Starting tunnel for service admin-srv.\n|-----------|-----------|-------------|------------------------|\n| NAMESPACE |   NAME    | TARGET PORT |          URL           |\n|-----------|-----------|-------------|------------------------|\n| go-micro  | admin-srv |             | http://127.0.0.1:64630 |\n|           |           |             | http://127.0.0.1:64631 |\n|-----------|-----------|-------------|------------------------|\n[go-micro admin-srv  http://127.0.0.1:64630   http://127.0.0.1:64631]\n")),(0,a.kt)("h4",{id:"http"},"HTTP"),(0,a.kt)("p",null,"We can run an HTTP API test with this endpoint: ",(0,a.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:64630")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"curl -X 'POST' \\\n  'http://127.0.0.1:64630/admin/v1/login' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n  \"userName\": \"thangn\",\n  \"password\": \"123456\"\n}'\n")),(0,a.kt)("p",null,"And the result will be shown:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "id": "1",\n  "userName": "thangn",\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUzNTkyNDYsInBsYXRmb3JtIjoiVE9LRU5fUExBVEZPUk1fV0VCIiwic3ViIjoidGhhbmduIiwidWlkIjoiMSJ9.kieQAm75DWlb6Pa7hmX76dpzNDJXwGNpbLpfA-Jcy_o"\n}\n')),(0,a.kt)("h4",{id:"grpc"},"gRPC"),(0,a.kt)("p",null,"We can also run a gRPC API test with this endpoint: ",(0,a.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:64631")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'grpcurl -plaintext -d \'{"userName":"thangn","password":"123456"}\' 127.0.0.1:64631 admin_srv.v1.AuthenticationService/Login\n')),(0,a.kt)("p",null,"And then we'll see the result like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "id": "1",\n  "userName": "thangn",\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUzNTk0NjcsInBsYXRmb3JtIjoiVE9LRU5fUExBVEZPUk1fV0VCIiwic3ViIjoidGhhbmduIiwidWlkIjoiMSJ9.tLKmZUe2TW6X4DOWVDfkLBz8fKwPN6LgYjcQuLTZlu0"\n}\n')),(0,a.kt)("p",null,"Code repository: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/devexps/go-examples/tree/main/k8s"},"https://github.com/devexps/go-examples/k8s")),(0,a.kt)("p",null,"This article shows you how to run simple Go-Micro services on a Kubernetes cluster and also uses its powerful built-in ConfigMap and API Server. Before doing so,  you have to learn more about Kubernetes concepts and learn how to perform specific tasks. At this point, I just remembered that I forgot an important thing about the ",(0,a.kt)("inlineCode",{parentName:"p"},"Health check")," step. It looks like I'm out of paper, so I will give that step to you :). Hopefully, this article is informative and useful for you."),(0,a.kt)("h2",{id:"references"},"References"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://kubernetes.io"},"https://kubernetes.io")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://etcd.io/docs/v3.5/dev-guide/grpc_naming/"},"gRPC naming and discovery")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.ibm.com/docs/en/networkmanager/4.2.0?topic=discovery-architecture"},"Discovery architecture"))))}u.isMDXComponent=!0}}]);