---
title: Quick Start
description: Go-Micro microservice framework, quickly create project code, and generate Go engineering projects
keywords:
  - Go
  - Go-Micro
  - Toolkit
  - Framework
  - Microservices
  - Protobuf
  - gRPC
  - HTTP
sidebar_position: 1
---

## Environment Requirements
First, you need to install the corresponding dependent environment and tools:
- [go](https://golang.org/dl/)
- [protoc](https://github.com/protocolbuffers/protobuf)
- [protoc-gen-go](https://github.com/protocolbuffers/protobuf-go)

It's recommended to enable `GO111MODULE`
```bash
go env -w GO111MODULE=on
```

## Micro command tool
Micro is the best tool for the Go-Micro framework, micro can:
- Quickly create projects & services from templates
- Use commands commonly used during development

In order for the next steps to proceed smoothly, the micro command tool needs to [be installed](usage.md#installation)

## Create project
```bash
# Create a project using the default template
micro new my_project

# Remember, it creates a new `helloworld` service (by default)
# Enter your project > service directory
cd my_project/helloworld
```
## Code generation and execution
### Generate
```bash
# Generate all proto source code, wire, etc.
make all
```

### Run
```bash
# Run the service
make run

# Use Micro's run command
micro run
```

### Output
```bash
DEBUG msg=config loaded: config.yaml format: yaml # load by default configs/config.yaml configuration file
INFO msg=[HTTP] server listening on: [::]:8080
INFO msg=[gRPC] server listening on: [::]:9090
```

## Test interface
### Test with HTTP interface
```bash
curl 'http://127.0.0.1:8080/helloworld/go-micro'

The response should be:
{
  "message": "Hello go-micro"
}
```

### Test with GRPC interface
```bash
grpcurl -plaintext -d '{"name":"go-micro"}' 127.0.0.1:9090 helloworld.v1.Greeter.SayHello

The response should be:
{
  "message": "Hello go-micro"
}
```

## Project template
Micro manages templates through Git repositories and initializes by pulling templates when creating projects and services. The default template address is:

* [【Github】Micro Layout](https://github.com/devexps/go-layout)

## Custom project template
You can also create your own templates, to save time when you need to do it every time.