---
title: Usage
description: Use Micro tools, create Protobuf templates, create Go engineering projects, create Service templates
keywords:
  - Go
  - Go-Micro
  - Toolkit
  - Framework
  - Microservices
  - Protobuf
  - gRPC
  - HTTP
sidebar_position: 2
---

# Usage

## Installation
```bash
go install github.com/devexps/go-micro/cmd/micro/v2@latest
```

## Create Project
Create a project template with the `micro` command:
```bash
micro new your_project
```
:::note
By default, it adds a service called `helloworld` corresponding with a proto.
:::

You can use `-r` to specify source:
```bash
# Behind the scene if you don't specify source
micro new your_project -r https://github.com/devexps/go-layout.git

# You can also use custom templates
micro new your_project -r xxx-layout.git

# At the same time, you can also specify source through the environment variable
MICRO_LAYOUT_REPO=xxx-layout.git
micro new your_project
```

You can use `-b` to specify branch:
```bash
micro new your_project -b main
```

You can use `--service-only` to add services:
```bash
micro new your_project
cd your_project
micro new your_service --service-only
```

The output you'll see:
```bash
.
├── .docker
│    └── Dockerfile
├── LICENSE
├── README.md
├── api
│    ├── go.mod
│    ├── go.sum
│    ├── proto
│    │    ├── common
│    │    │    └── conf
│    │    │        ├── auth.proto
│    │    │        ├── bootstrap.proto
│    │    │        ├── config.proto
│    │    │        ├── data.proto
│    │    │        ├── logger.proto
│    │    │        ├── registry.proto
│    │    │        ├── server.proto
│    │    │        └── trace.proto
│    │    └── helloworld
│    │        └── v1
│    │            ├── error_reason.proto
│    │            └── greeter.proto
│    └── third_party
│        ├── README.md
│        ├── errors
│        │    └── errors.proto
│        ├── google
│        │    ├── api
│        │    │    ├── annotations.proto
│        │    │    ├── client.proto
│        │    │    ├── field_behavior.proto
│        │    │    ├── http.proto
│        │    │    └── httpbody.proto
│        │    └── protobuf
│        │        ├── any.proto
│        │        ├── api.proto
│        │        ├── compiler
│        │        │    └── plugin.proto
│        │        ├── descriptor.proto
│        │        ├── duration.proto
│        │        ├── empty.proto
│        │        ├── field_mask.proto
│        │        ├── source_context.proto
│        │        ├── struct.proto
│        │        ├── timestamp.proto
│        │        ├── type.proto
│        │        └── wrappers.proto
│        ├── openapi
│        │    └── v3
│        │        ├── annotations.proto
│        │        └── openapi.proto
│        └── validate
│            ├── README.md
│            └── validate.proto
├── go.mod
├── helloworld
│    ├── Makefile
│    ├── cmd
│    │    └── server
│    │        ├── main.go
│    │        ├── tools.go
│    │        ├── wire.go
│    │        └── wire_gen.go
│    ├── configs
│    │    └── config.yaml
│    ├── go.mod
│    ├── go.sum
│    └── internal
│        ├── biz
│        │    ├── greeter.go
│        │    └── init.go
│        ├── data
│        │    ├── data.go
│        │    ├── greeter.go
│        │    └── init.go
│        ├── server
│        │    ├── grpc.go
│        │    ├── http.go
│        │    └── init.go
│        └── service
│            ├── greeter.go
│            └── init.go
└── pkg
    ├── bootstrap
    │    ├── bootstrap.go
    │    ├── config.go
    │    ├── daemon.go
    │    ├── flag.go
    │    ├── grpc.go
    │    ├── http.go
    │    ├── logger.go
    │    ├── registry.go
    │    ├── service_info.go
    │    └── trace.go
    ├── go.mod
    ├── go.sum
    └── service
        └── name.go
```

## Run the project
If there are multiple services under the project, a selection menu will appear.
```bash
micro run
```

## View help
You can add `-h` to any command to view help in detail
```bash
micro -h
micro new -h
```