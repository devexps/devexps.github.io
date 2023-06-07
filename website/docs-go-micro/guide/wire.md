---
title: Dependency Injection
description: Wire is a compile-time dependency injection tool
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

**Wire** is a compile-time dependency injection tool.

In dependencies between individual components, explicit initialization is generally encouraged rather than global variable passing.

Therefore, the initialization code through **wire** can well solve the coupling between components and improve code maintainability.

## Installation

```bash
# Import into project
go get -u github.com/google/wire

# Install cmd
go install github.com/google/wire/cmd/wire
```

## Terms

Wire has two basic concepts: *Provider* and *Injector*

Provider is an ordinary *Go Func*, it can also receive the values from other *providers* for dependency injection.

```go
// This provides a data config file.
func NewConfig() *conf.Data {...}

// This provides the data component (installs database, cache, etc.) which depends on the data config.
func NewData(c *conf.Data) (*Data, error) {...}

// This provides persistence components which depends on the data component.
func NewUserRepo(d *data.Data) (*UserRepo, error) {...}
```

## Usage

In Go-Micro project, there are four major modules, **server**, **service**, **biz** and **data**. They will be initialized by *wire*.

<img src="/assets/docs/go-micro/wire.png" alt="go-micro wire usage" width="650px" />

A **ProvideSet** should be provided in every module so that wire could scan them and generate the DI (`Dependency Injection`) codes.

First, you should define **ProviderSet** in the entry (recommended in `init.go` file) of every module.

```go
internal/data   // the data module
├── data.go     // func NewData(cfg *conf.Bootstrap, logger log.Logger) (*Data, func(), error)
├── greeter.go  // func NewGreeterRepo(data *Data, logger log.Logger) GreeterRepo
└── init.go     // var ProviderSet = wire.NewSet(NewData, NewGreeterRepo)

```

Then put these **ProviderSet** in the `wire.go` file for DI configuration.

## Component Initialization

To initialize components through wire, you need to define the corresponding `wire.go` and Go-Micro application for startup management.

```go
cmd     // the entry point of the application
└── server
    ├── main.go
    ├── wire.go
    └── wire_gen.go

// main.go creates the go-micro application for lifecycle management
func newApp(ll log.Logger, hs *http.Server, gs *grpc.Server, rr registry.Registrar) *micro.App {
    return micro.New(
        micro.ID(Service.GetInstanceId()),
        micro.Name(Service.Name),
        micro.Version(Service.Version),
        micro.Metadata(Service.Metadata),
        micro.Logger(ll),
        micro.Server(
            hs,
            gs,
        ),
        micro.Registrar(rr),
    )
}

// wire.go init micro application.
func initApp(log.Logger, registry.Registrar, *conf.Bootstrap) (*micro.App, func(), error) {
    // builds ProvideSet in every module, and generate the wire_gen.go file
    panic(wire.Build(server.ProviderSet, data.ProviderSet, biz.ProviderSet, service.ProviderSet, newApp))
}
```

Run `go generate` command in main service directory to generate DI codes.

```bash
go generate ./...
```

The DI codes inside the `wire_gen.go` look like:

```go
// initApp init micro application.
func initApp(logger log.Logger, registrar registry.Registrar, bootstrap *conf.Bootstrap) (*micro.App, func(), error) {
    dataData, cleanup, err := data.NewData(bootstrap, logger)
    if err != nil {
        return nil, nil, err
    }
    greeterRepo := data.NewGreeterRepo(dataData, logger)
    greeterUseCase := biz.NewGreeterUseCase(greeterRepo, logger)
    greeterService := service.NewGreeterService(greeterUseCase)
    httpServer := server.NewHTTPServer(bootstrap, logger, greeterService)
    grpcServer := server.NewGRPCServer(bootstrap, logger, greeterService)
    app := newApp(logger, httpServer, grpcServer, registrar)
    return app, func() {
        cleanup()
    }, nil
}
```

## References

* https://blog.golang.org/wire
* https://github.com/google/wire
