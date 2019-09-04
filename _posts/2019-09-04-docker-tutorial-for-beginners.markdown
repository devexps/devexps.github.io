---
layout: post
title: "Docker Tutorial for Beginners"
date: "2019-09-04 10:22:25 +0700"
---
> **THE OFFICIAL DESCRIPTION**  
> Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.

Back in the day, an application would be created and run on a machine. There was a ratio of 1:1. One application, one machine. We always purchased the most powerful machine possible to cover their asses, errors. The result of this is many machines only ran at a small fraction of their capacity. After that, we have the **virtual machines** - include the application, the necessary binaries and libraries, and an entire guest operating system. And we have the **containers** - include the application and all of its dependencies, share the kernel with other containers, running as isolated processes in user space on the host operating system.

<p align="center">
<img src="/assets/thoughts/devops/hello_docker_with_go/docker.png" width="600px" alt="Docker Engine - docs.docker.com">
</p>

And now, **Docker** is the most popular container system. We can run those containers on physical machines. Docker containers wrap a piece of software in a complete filesystem that contains everything needed to run: code, runtime, system tools, system libraries, etc. anything that can be installed on a server. We can build an **image** and then create as many **containers** as we would like from that image. With docker we're easy to identify issues, isolate the problem container, quickly roll back to make the necessary changes, and then push the updated container into production.

### Docker

We can install Docker on our machine in a variety of ways. It depends on our machine to choose the best installation ways. Let's follow from source site to [install docker](https://docs.docker.com/install/) for our machine.

Once the installation is complete, it is a good idea to ensure that we have a supported version of Docker.

```console
$ docker version
```

Once Docker is installed, all we need to do is use the test image to check that everything is working as it should. Do this with the following command:

```console
$ docker run hello-world
```

We can see all containers (processes) on your machine:

```console
$ docker ps -a

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS                    NAMES
68f71db7590c        hello-world         "/hello"                 7 minutes ago       Exited (0) 7 minutes ago                            mystif
```

### Demo app with Go

So Let's write the "Hello, World" program in Go and understand how it works. Open our favorite text editor, create a new file named **main.go**, and type in the following code:

```golang
package main

import (
	"io"
	"net/http"
)

func main() {
	http.HandleFunc("/", index)
	http.ListenAndServe(":12345", nil)
}

func index(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "<hello devexps from a docker container")
}
```

If we want to ignore any files or directories in our build, add a **.dockerignore** file. For example, the content in it like this:

```dockerignore
*.md
*.markdown
```

Next to the important step, creating a docker file for hello world program. The docker file must be named **Dockerfile**. The docker file will include *everything* in the current directory, and descendent directories, in the image which is built (unless told to ignore something by the *.dockerignore* file)

The docker file must have **FROM** as the first instruction. The FROM says what image we are building this image from. We can add in a **MAINTAINER** instruction to say that who built this image. We can also have a comment on the first line. Docker file comments are # hash symbols. So our docker file will be:

```dockerfile
# A hello world example with Go

FROM golang:latest as builder

# Add maintainer info
MAINTAINER devexps@gmail.com

WORKDIR /app
COPY . .

# Build the Go app
ARG CGO_ENABLED=0
RUN go build -o main .

FROM scratch

WORKDIR /app
COPY --from=builder /app .

# Command to run the executable
CMD ["./main"]
```

Now, time for build our image:

```console
$ docker build -t hello-app .
```

- **-t** means the tag or give it a name. The name we gave it is "*hello-app*"  
- The dot "**.**" means the code for this image is in this current directory.

Now create a container from our image and run it. Type the following command to run the docker image:

```console
$ docker run -d -p 8080:12345 hello-app
```

- **-d** means run this detached, as a daemon, not dependent on the terminal session.  
- **-p** means map ports, mapping **[host machine port] : [to docker container port]**

We can list all the running containers like this:

```console
$ docker container ls

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS         
6f0a8d66c0f1        hello-app           "./main"                 7 minutes ago       Up 7 minutes        0.0.0.0:8080->12345/tcp
```

Now, go to our browser and see if it's running [localhost:8080](http://localhost:8080/) or quick test with *Curl* command line.

```console
$ curl http://localhost:8080
hello devexps from a docker container
```

To stop the container, type the following command with the container id:

```console
$ docker container stop 6f0a8d66c0f1
```

### Publish Docker image to Docker Hub

Docker Hub is the place where open Docker images are stored. When we ran our first image by typing:

```console
$ docker run -d -p 8080:12345 devexps/hello-app

Unable to find image 'devexps/hello-app:latest' locally
latest: Pulling from devexps/hello-app
7f7b7d60d331: Pull complete
00c734b6a26d: Pull complete
Digest: sha256:7e00b185dbe2985625e7685b3ee081bf4e3e56c09968eff95ca8345bdfb24d4b
Status: Downloaded newer image for devexps/hello-app:latest
...
```

The software first checked if this image is available on our computer and since it wasn't it downloaded the image from Docker Hub. So getting an image from Docker Hub works sort of automatically. And now, we will be pushing our built image to the Docker Hub so that we can use it anywhere.

Log into the Docker Hub registry on our local machine. (If you don't have account make it here [https://hub.docker.com/](https://hub.docker.com/))

```console
$ docker login
```

Tag the image, it is more like naming the version of the image. It's optional but it is recommended as it helps in maintaining the version

```console
$ docker tag hello-app <your-username>/hello-app:latest
```

Publish the image, upload our tagged image to the repository. Once complete, the results of this upload are publicly available.

```console
$ docker push <your-username>/hello-app:latest
```

If you log into Docker Hub, you will see the new image there, with its pull and run command.

```console
$ docker run -d -p 8080:12345 <your-username>/hello-app:latest
```

Okay, that is all in this article. We started with basically docker setup, run and check. We wrote a simple Go application. And we knew how to build an optimized image for Go application. Finally, published our build image to the Docker Hub.

You can find the complete source code for the Go app and all the Dockerfile in the [Github Repository](https://github.com/devexps/devops/tree/master/hello_docker_with_go).

I hope you enjoyed the article. See you in the next article.
