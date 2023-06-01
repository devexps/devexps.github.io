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

## Environmental preparation
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
- Quickly create projects from templates
- Quickly create and generate protoc files
- Use commands commonly used during development

In order for the next steps to proceed smoothly, the micro command tool needs to [be installed](usage.md#Installation)