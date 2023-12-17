---
title: Can the Golang Microservice Framework Actually Develop Single Applications? -- GoMicro Monolithic Architecture Practice
description: Can the Golang Microservice Framework Actually Develop Single Applications? -- GoMicro Monolithic Architecture Practice
tags: [go-micro, microservice, framework, swagger, monolithic, architecture, practice]
hide_table_of_contents: false
--- 
<!--truncate-->

## Overview

The microservice framework can also be used to develop applications with a monolith structure. Moreover, a single application is also the smallest, most primitive, and initial project state. After gradual development and evolution, a single application can gradually evolve into a microservice architecture and continuously subdivide service granularity. Since the monolithic architecture application developed by the microservice framework is a minimal implementation, it only needs to use the minimum technology of the microservice framework, which means that it only needs to use the minimum knowledge points of the microservice framework. Take it. It's great to learn the microservice framework.

This article will focus on a demo project I wrote: [go-monolithic demo](https://github.com/devexps/go-monolithic-demo) which is both a minimal practice of the microservice framework [go-micro](https://github.com/devexps/go-micro) and a complete engineering practice. From it you can learn:

- Use of the build tool `Make`
- Use of dependency injection framework `Wire`
- Use of Protobuf build tool `Buf`
- Use of ORM framework `Ent`
- Application of OpenAPI in project development
- Complete CURD development example
- User login authentication and authorization

## Why should we learn to use the microservice framework?

I promote microservice architecture to people around me, but I often get a negative attitude, such as:

- I don't have that many people online or such a large project scale, so I don't need microservices.
- I can use GIN to put it out. What microservice framework should I use? 
- The microservices framework is too complex to learn.
- ...

To sum it up, it's nothing more than:

- The knowledge of the microservices is too broad, it is difficult to get started, and the learning curve is too steep.
- For small and medium-sized projects, the microservice framework is not needed.

Indeed, microservices require a lot of knowledge: service governance (service registration and discovery), load balancing, service circuit breaker, service degradation, service current limiting, service fault tolerance, service gateway, distributed configuration, link tracking, service performance monitoring, RPC service calling,...

With so many knowledge points, it's indeed not easy to get started. For many small and medium-sized enterprises, their project scale is small, and most of the projects are CURD projects. For such projects, developers only need to know how to write HTTP routing and how to write ORM, and that's it. Even most of the code can be generated through a code generator. To find so many talents, it is difficult to recruit one person. The capital of a company is also limited. It needs to control costs and cannot afford to hire.

Then, the current situation seems obvious: small and medium-sized enterprises and small and medium-sized projects do not seem to need microservices.

However, the microservice framework is not used, is it not necessary?

The answer is **negative**.

In actual project development, I have developed several monolithic applications using the microservice framework Go-Micro and put them into operation online. In the smallest project, I just used: REST service and ORM to access the database. There are not many knowledge points involved, so it is not too complicated to develop.

So, someone will definitely ask me: what's the point of using a microservices framework?

My considerations are as follows:

- Small projects are not all we have. We also have medium and large projects. It is always better for a company to use one technology stack than multiple technology stacks.
- Go-Micro is better at engineering and standardizes the company's development.
- Go-Micro defines protocols based on Protobuf, and gRPC communicates between services. It has strong practical value in the company's diverse development scenario.
- Go-Micro is developed based on the plug-in mechanism and is extremely easy to extend.

In summary, these are my reasons. When making a technical selection, I compared almost all frameworks on the market horizontally, and finally, I chose Go-Micro (It's also mine).

Another point is that the development process of microservices is not one-step process. The development of microservices is gradual as the saying goes: one is born with two, two is born with three, three is born with all things. Starting from a single application and gradually spliting it services is not an unusual thing either.

## Demo code repository

The code comes first, which is suitable for students who don't like to verbose words.

https://github.com/devexps/go-monolithic-demo

For those students who want to learn to use the microservice framework, this single project developed by the microservice framework is essentially minimal, so it is also a very suitable project for learning.

For me, it is an experimental field for engineering experiments. I mainly use it to experiment with several basic forms of software engineering:

1. Standardization
2. Modularity
3. Processization
4. Practical and instrumental

## Project structure

This project includes front-end and back-end code. Then front-end is a Vue3 + Typescript Admin. However, the front-end is not the focus of this article. This article focuses on the back-end.

The front-end project is in the `frontend` folder, and the back-end project is in the `backend` folder.

Backend project structure:

```shell
.
├── api # The path where the proto protocol is stored
│    ├── admin # Admin service defines the REST interface.
│    │    └── service
│    │        └── v1
│    ├── common # Common service defines such as pagination, routing, etc.
│    │    └── pagination
│    ├── user # User service defines users info.
│    │    └── service
│    │        └── v1
│    └── user_token # UserToken service defines user's token info
│        └── service
│            └── v1
├── app # The path where the application is located.
│    └── admin
│        └── service
│            ├── cmd # Entry of the application.
│            │    └── server
│            │        └── assets
│            ├── configs # Application configuration files.
│            └── internal
│                ├── data # Application data layer, logical code for database operations.
│                │    └── ent # Use Facebook's ORM, entgo.
│                │        └── schema # Database struct definition.
│                ├── server # The transport layer of the application, the input and output points provided by the application (REST, gRPC, Kafka, etc.)
│                └── service # Application service layer, processor code for REST, gRPC, Kafka, etc.
├── gen # Go code storage path generated by proto protocol.
│    └── api
│        └── go
│            ├── admin
│            │    └── service
│            │        └── v1
│            ├── common
│            │    └── pagination
│            ├── user
│            │    └── service
│            │        └── v1
│            └── user_token
│                └── service
│                    └── v1
├── pkg # Public code storage path.
│    ├── middleware
│    │    └── auth
│    └── service
└── sql # Storage path for some SQL queries.
```

## Prerequisite knowledge

- [Wire](https://github.com/google/wire)
- [Protocol Buffers](https://protobuf.dev/)
- [gRPC](https://grpc.io/)
- [gRPC-Gateway](https://grpc-ecosystem.github.io/grpc-gateway/)
- [Entgo](https://entgo.io/)
- [Buf](https://buf.build/)
- [Makefile](https://makefiletutorial.com/)
- [OpenAPI](https://swagger.io/specification/)

## Installation environment

### Install Make

Linux and Mac are basically pre-installed. Even if they are not pre-installed, the installation is very simple, so I won't go into details. Mainly, it is troublesome under Windows, you can find some articles about it like `How to use Make to compile Golang programs under Windows`.

### Protoc installation

#### On macOS

```shell
brew install protobuf
```

#### On Ubuntu

```shell
sudo apt update; sudo apt upgrade
sudo apt install libprotobuf-dev protobuf-compiler
```

### Golang install tools

```shell
go install github.com/devexps/go-micro/cmd/micro/v2@latest
go install github.com/devexps/go-micro/cmd/protoc-gen-go-http/v2@latest
go install github.com/devexps/go-micro/cmd/protoc-gen-go-errors/v2@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install github.com/envoyproxy/protoc-gen-validate@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
go install github.com/google/gnostic/cmd/protoc-gen-openapi@latest
go install github.com/google/wire/cmd/wire@latest
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
go install github.com/bufbuild/buf/cmd/buf@latest
```

Or execute it in the `backend` project root directory:

```shell
make init
```

### Install IDE plug-in

In the IDE (VSC and GoLand), the remote proto source code library will be pulled into the local cache folder, and the IDE does not know it, so it cannot parse the dependent proto files. However, `Buf` officially provides a plug-in, can help the IDE read and parse proto files, and comes with `Lint`.

- Buf plug-in for VSC: https://marketplace.visualstudio.com/items?itemName=bufbuild.vscode-buf
- Buf plugin for GoLand: https://plugins.jetbrains.com/plugin/19147-buf-for-protocol-buffers

## Use of Wire

`Wire` is a dependency injection framework open source by Google. The role of dependency injection is:

- Create objects
- Know which classes require which objects
- And provide all these objects

First, there is one under the `server`, `service`, and `data` packages:

```go
var ProviderSet = wire.NewSet(...)
```

The `NewSet` method contains all object creation methods.

There are two code files for wire: `wire.go` and `wire_gen.go`, which are stored in the same folder as `main.go`

### wire.go

```go
//go:build wireinject
// +build wireinject

// The build tag makes sure the stub is not built in the final build.

package main

import (
    "github.com/google/wire"

    "github.com/devexps/go-micro/v2"
    "github.com/devexps/go-micro/v2/log"
    "github.com/devexps/go-micro/v2/registry"

    conf "github.com/devexps/go-bootstrap/gen/api/go/conf/v1"

    "github.com/devexps/go-monolithic-demo/app/admin/service/internal/data"
    "github.com/devexps/go-monolithic-demo/app/admin/service/internal/server"
    "github.com/devexps/go-monolithic-demo/app/admin/service/internal/service"
)

// initApp init GoMicro application.
func initApp(log.Logger, registry.Registrar, *conf.Bootstrap) (*micro.App, func(), error) {
    panic(wire.Build(server.ProviderSet, service.ProviderSet, data.ProviderSet, newApp))
}
```

This file does not participate in compilation. It is a template provided to the code generator. It introduces the dependencies in the `ProvideSet` and is assembled by the code generator.

### wire_gen.go

```go
// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package main

import (
    "github.com/devexps/go-bootstrap/gen/api/go/conf/v1"
    "github.com/devexps/go-micro/v2"
    "github.com/devexps/go-micro/v2/log"
    "github.com/devexps/go-micro/v2/registry"
    "github.com/devexps/go-monolithic-demo/app/admin/service/internal/data"
    "github.com/devexps/go-monolithic-demo/app/admin/service/internal/server"
    "github.com/devexps/go-monolithic-demo/app/admin/service/internal/service"
)

// Injectors from wire.go:

// initApp init GoMicro application.
func initApp(logger log.Logger, registrar registry.Registrar, bootstrap *v1.Bootstrap) (*micro.App, func(), error) {
    authenticator := data.NewAuthenticator(bootstrap)
    authorizer := data.NewAuthorizer()
    entClient := data.NewEntClient(bootstrap, logger)
    client := data.NewRedisClient(bootstrap, logger)
    dataData, cleanup, err := data.NewData(logger, entClient, client, authenticator, authorizer)
    if err != nil {
        return nil, nil, err
    }
    userRepo := data.NewUserRepo(dataData, logger)
    userTokenRepo := data.NewUserTokenRepo(dataData, logger)
    authenticationService := service.NewAuthenticationService(logger, userRepo, userTokenRepo)
    userService := service.NewUserService(logger, userRepo)
    httpServer := server.NewHTTPServer(bootstrap, logger, authenticator, authorizer, authenticationService, userService)
    app := newApp(logger, registrar, httpServer)
    return app, func() {
        cleanup()
    }, nil
}
```

This file is generated by Wire's code generator. It can be seen from the code that the complex dependency calling relationship is easily sorted out by Wire.

### Code generation

There are two ways to generate Wire code, one is to install the wire executable program, and the other is to use `go run` to compile and execute dynamically.
Dynamic compilation and execution are recommended. Why? This ensures that the version of the code generator is consistent with the version of Wire in the project.
If the versions are inconsistent, some problem may occur.

```shell
go run -mod=mod github.com/google/wire/cmd/wire ./cmd/server
```

I have written this command into `app.mk`, which can be executed under the `app/admin/service` path:

```shell
make wire
```

## Use of Buf

[buf.build](https://docs.buf.build/) is a tool specifically used to build the protobuf API.

Buf is essentially a tool for calling `protoc`. It can configure various parameters for calling `protoc`, and supports remote proto and remote plug-ins.
Therefore, Buf can engineer proto compilation.

It has a total of 3 sets of configuration files: `buf.work.yaml`, `buf.gen.yaml`, and `buf.yaml`

In addition, there is a `buf.lock` file, but it does not require manual configuration. It is generated by the `buf mod update` command. This is similar to the lock files of `npm`, `yarn`, etc. on the front end, and the `go.sum` of Golang is similar.

It has few configuration files and is not complicated. It is very convenient to maintain. It supports remote proto plugin-ins and remote third-party protos, and it also has good support for the CI/CD system.

### buf.work.yaml

It is generally placed under the root directory of the project. It represents a workspace, and usually, there is only one configuration file for a project.

The most important thing about this configuration file is the directories configuration item, which lists the directories of modules to be included in the workspace. The directory path must be relative to `buf.work.yaml`, such as `../external` is an invalid configuration.

```yaml
version: v1

directories:
  - api
```

### buf.gen.yaml

It is generally placed under the same directory as `buf.work.yaml`. It mainly defines some rules and plug-in configurations generated by `protoc`.

```yaml
# Configure Protoc generation rules
version: v1

managed:
  enabled: false
plugins:
  # generate go struct code
  #- plugin: buf.build/protocolbuffers/go
  - name: go
    out: gen/api/go
    opt: paths=source_relative

  # generate grpc service code
  #- plugin: buf.build/grpc/go
  - name: go-grpc
    out: gen/api/go
    opt:
      - paths=source_relative

  # generate http service code
  - name: go-http
    out: gen/api/go
    opt:
      - paths=source_relative

  # generate go-micro errors code
  - name: go-errors
    out: gen/api/go
    opt:
      - paths=source_relative
```

### buf.yaml

The path where it is placed can be regarded as the path pointed by the `--proto-path` parameter of `protoc`, which is a relative path of the import in the proto file.

It should be noted that this configuration file must be placed in the same level directory of `buf.work.yaml`

Generally speaking, the content of this configuration file is the following configuration. There is no need to make any modifications. There are not many situations where modifications are needed.

```yaml
version: v1

deps:
  - 'buf.build/googleapis/googleapis'
  - 'buf.build/envoyproxy/protoc-gen-validate'
  - 'buf.build/devexps/gomicroapis'
  - 'buf.build/gnostic/gnostic'
  - 'buf.build/gogo/protobuf'
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
```

### API code generation

We can use the following command for code generation:

```shell
buf generate
```

Or this way:

```shell
make api
```

## Use of Ent

Ent is an excellent ORM framework. Code generation based on templates has less performance loss than using reflection and other methods. Moreover, the use of templates makes it simple and easy to expand the system.

Not only can it easily query traditional relational databases (MySQL, PostgreSQL, SQLite), but it can also easily perform graph traversal -- commonly used data queries such as menu tree, organization tree,...

### Schema

Schema is equivalent to a database table. Schema is the starting point for database development.

Only when Schema is defined, the code generator can generate the Go data structure of the database table and the Go code for related operations. With these generated codes, we can operate the database table through ORM.

Ent also supports generating interface definitions for gRPC and GraphQL from Schema. It can be said that Ent has opened up the entire development process - the database is handled backward, and the API is handled forward.

### Create a Schema

There are many ways to create a Schema, this way is using **Ent Init**:

```shell
ent init User
```

A `user.go` file will be generated under `{current directory}/ent/schema`. If there is no folder, one will be created: 

```go
package schema

import "entgo.io/ent"

// User holds the schema definition for the User entity.
type User struct {
    ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
    return nil
}

// Edges of the User.
func (User) Edges() []ent.Edge {
    return nil
}
```

### Mixin reuse fields

In particular applications, we often encounter some identical common fields, such as: `id`, `created_at`, `updated_at`, etc.

So we can only keep copying and pasting? This makes the code both bloated and inelegant.

Can `Entgo` allow us to reuse these fields?

The answer is obviously, no problem.

`Mixin` is for this purpose.

OK, we now need to reuse the time-related fields: `created_at` and `updated_at`, then we can:

```go
package mixin

import (
    "time"

    "entgo.io/ent"
    "entgo.io/ent/schema/field"
    "entgo.io/ent/schema/mixin"
)

type TimeMixin struct {
    mixin.Schema
}

func (TimeMixin) Fields() []ent.Field {
    return []ent.Field{
        field.Time("created_at").
            Immutable().
            Default(time.Now),

        field.Time("updated_at").
            Default(time.Now).
            UpdateDefault(time.Now),
    }
}
```

Then, we can apply it in Schema, such as `User`, simply we add a `Mixin` method to it:

```go
func (User) Mixin() []ent.Mixin {
    return []ent.Mixin{
        mixin.TimeMixin{},
    }
}
```

Looking at the generated code, the `User` table already has these two fields.

### Generate Ent code

Execute in the `internal/data/ent` directory:

```shell
go run -mod=mod entgo.io/ent/cmd/ent generate \
        --feature privacy \
        --feature sql/modifier \
        --feature entql \
        --feature sql/upsert \
        ./internal/data/ent/schema
```

Or use the `Make` command directly in the `app/admin/service` path:

```shell
make ent
```

## OpenAPI usages

In order to do it, you need to do the following things:

1. Write `Buf` configuration to generate OpenAPI documents.
2. Write the command for `Buf` to generate OpenAPI documents in to `Makefile`.
3. Use Golang's Embedding Files feature to embed `openapi.yaml` in to the program.
4. Integrate `Swagger UI` into the project and read the embedded `openapi.yml` document.

### 1. Write Buf configuration to generate OpenAPI documents

If you are careful, you must have discovered that there is a `buf.openapi.gen.yaml` configuration file under `api/admin/service/v1`. What configuration file is this? I will put the configuration file out now:

```yaml
version: v1

managed:
  enabled: false
  
plugins:
#   generate openapi v3 yaml doc
  - name: openapi
    out: ./app/admin/service/cmd/server/assets
    opt:
      - naming=json # Naming convention. Use "proto" to pass the name directly from the proto file. Default: json
      - depth=2 # The recursion depth of the loop message, the default is: 2
      - default_response=false # Add default response message. If "true", automatically adds a default response for operations that use the google.rpc.Status message. Useful if you use envoy or grpc-gateway for transcoding as they use this type as the default error response. Default: true.
      - enum_type=string # The serialized type of the enumeration type. Use "string" to perform string-based serialization. Default: integer.
      - output_mode=merged # Output file generation mode. By default, only one openapi.yaml file will be generated in the output folder. Using "source_relative" will generate a separate "[inputfile].openapi.yaml" file for each '[inputfile].proto' file. Default: merged.
      - fq_schema_naming=false # Whether to add the package name to the Schema name. If it is true, the package name will be added, for example: system.service.v1.ListDictDetailResponse, otherwise: ListDictDetailResponse. Default: false.
```

This configuration file was written to generate OpenAPI v3 documentation.

So, how to use this configuration file? Still use the Buf generate command. This command still needs to be executed in the project root directory, but the `--template` parameter must be used to introduce the `buf.openapi.gen.yam` configuration file:

```shell
buf generate --path api/admin/service/v1 --template api/admin/service/v1/buf.openapi.gen.yaml
```

Finally, under the directory `./app/admin/service/cmd/assets`, a file named `openapi.yaml` will be generated.

### 2. Write the command for Buf to gen OpenAPI documents into Makefile

For such a long command, it is obviously more useful to write it into the `Makefile`.

So, we start writing the `Makefile`:

```makefile
# generate protobuf api go code
api:
    buf generate

# generate OpenAPI v3 docs.
openapi:
    buf generate --path api/admin/service/v1 --template api/admin/service/v1/buf.openapi.gen.yaml
    buf generate --path api/front/service/v1 --template api/front/service/v1/buf.openapi.gen.yaml

# run application
run: api openapi
    @go run ./cmd/server -conf ./configs
```

In this way, we only need to execute the `Make` command in the `backend` root directory to complete the generation of OpenAPI.

```shell
make openapi
```

### 3. Use Golang's Embedding Files feature to embed openapi.yaml

OpenAPI documents are to be read using `Swagger UI` and provided to the front end, so `openapi.yaml` must follow the program. I initially thought about putting it in `configs`. Although it is a yaml file, it is still fundamentally different from the configuration file: it is a document, not a configuration.

Documentation, following the binary program, in my opinion, is the optimal solution. Next, we start to implement the embedding of documents.

Now we go to the directory `./app/admin/service/cmd/server/assets`, and we create a code file named `assets.go` under this directory.

```go
package assets

import _ "embed"

//go:embed openapi.yaml
var OpenApiData []byte
```

Use the `go:embed` annotation to introduce the `openapi.yaml` document, and read it into a global variable of type `[]byte` named `OpenApiData`.

In this way, we embedded `openapi.yaml` file into the program.

### 4. Integrate Swagger UI into the project and read the embedded openapi.yaml document

Finally, we start integrating `Swagger UI`

To integrate `Swagger UI`, I packed `Swagger UI` into a software package. To use it, we need to install the dependent library:

```shell
go get github.com/devexps/go-swagger-ui
```

Then, call the method in the package where the HTTP server is created:

```go
package server

import (
    swaggerUI "github.com/devexps/go-swagger-ui"
    "github.com/devexps/go-micro/v2/transport/http"

    "github.com/devexps/go-monolithic-demo/app/admin/service/cmd/server/assets"
)

// NewHTTPServer new an HTTP server.
func NewHTTPServer() *http.Server {
    srv := bootstrap.CreateHTTPServer()

    swaggerUI.RegisterSwaggerUIServerWithOption(
        srv,
        swaggerUI.WithTitle("GoMicro Monolithic demo"),
        swaggerUI.WithMemoryData(assets.OpenApiData, "yaml"),
    )
    return srv
}
```

Now, we are done!

If the port of the service is 8080, then we can access the `Swagger UI` by accessing the following link: http://localhost:8080/docs/

At the same time, the `openapi.yaml` file can also be accessed online at: http://localhost:8080/docs/openapi.yaml

## Conclusion

After you learn these knowledge points, you will find that the knowledge points involved in getting started using the GoMicro microservice framework are not complicated, and the threshold for learning is still very low. Base on the demo project in this article, I believe you can start writing projects quickly.

## References

- [Microservices vs. monolithic architecture](https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith)
- [Wire](https://github.com/google/wire)
- [Protocol Buffers](https://protobuf.dev/)
- [gRPC](https://grpc.io/)
- [gRPC-Gateway](https://grpc-ecosystem.github.io/grpc-gateway/)
- [Entgo](https://entgo.io/)
- [Buf](https://buf.build/)
- [Makefile](https://makefiletutorial.com/)
- [OpenAPI](https://swagger.io/specification/)