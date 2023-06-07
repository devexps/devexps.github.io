---
title: Protobuf specification
description: The API interface is unified based on HTTP/GRPC, and the protocol is defined through Protobuf, including complete Request/Reply, and corresponding interface error codes (Errors)
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

This documentation mainly revise the Proto specification conventions and specific agreements between multiple languages to help everyone write more standard interfaces.

The API interface is unified based on HTTP/GRPC, and the protocol is defined through Protobuf, including complete Request/Reply, and corresponding interface error codes (Errors).

## Directory structure
The API interface could be defined in `api` directory of the project, or could be managed in a unified repository, similar to `googleapis`, `envoy-api`.

For the proto in project, the api should be used as the root of package name.
```
go-micro-demo:
├── api // service API definition
│   ├── proto
│   │   ├── common
│   │   │   └── conf
│   │   └── demo-service
│   │       └── v1
│   │           └── demo.proto
│   ├── third_party // third party reference
```

For the proto in unified repository, the repository name should be use as the root of package name.
```
go-micro-apis:
├── api // service API definition
│   ├── proto
│   │   ├── common
│   │   │   └── conf
│   │   └── demo-service
│   │       └── v1
│   │           └── demo.proto
│   ├── third_party // third party reference
```

## Package

The package name is used to generate gRPC request paths, or reference messages between Protos.

- `my.package.v1` is the API's directory, which defines the API of the services.

For example:

```protobuf
// Request URL: /<package_name>.<version>.<service_name>/{method}
package <package_name>.<version>;
```

### go_package

```protobuf
option go_package = "github.com/devexps/go-micro/<package_name>;<version>";
```

### java_package

```protobuf
option java_multiple_files = true;
option java_package = "com.github.gomicro.<package_name>.<version>";
```

## Version
The version number marks the incompatible version and always used with `<package_name>`. 
When the API needs to be refactored, the incompatible structure should be updated.

## Import
- The proto dependencies' import path should be started from the root path.
- `third_party` folder, always includes the proto from third-party such as `protobuf`, `google rpc`, `google apis`, etc.

## Naming Convention

### Directory Structure
The package name should be lower-case, and consist with the project directory structure. 
For example: 

```protobuf
// project directory structure: my/package/v1/
package my.package.v1;
```

### File Structure

The name of proto files should be `lower_snack_case.proto`. 
The contents of proto file should be ordered in the following below:

1. Licence header (if applicable)
2. File overview
3. Syntax
4. Package
5. Imports (sorted)
6. File options
7. Everything else

### Message and Field Naming

Use `CamelCase` (with an initial capital) for message names, for example: `LoginRequest`

User `underscore_seperated_names` for field names, including `oneof` field and extension names, for example: `user_name`

```protobuf
message LoginRequest {
  required string user_name = 1;
}
```

### Repeated Fields

Use pluralized names for repeated fields

```protobuf
message LoginReply {
  repeated string keys = 1;
  //...
  repeated Account accounts = 20;
}
```

### Enums

Use CamelCae for enum type names and `CAPITALS_WITH_UNDERSCORES` for value names:

```protobuf
enum FooBar {
  FOO_BAR_UNSPECIFIED = 0;
  FOO_BAR_FIRST_VALUE = 1;
  FOO_BAR_SECOND_VALUE = 2;
}
```

Each enum value should end with a semicolon, not a comma.
Prefer prefixing enum values rather than surrounding them with a wrapping message.
The zero value enum should have the suffix `UNSPECIFIED`.

### Services

If your `.proto` defines a RPC service, you should use CamelCase for both the service name and all RPC method names.

```protobuf
service FooService {
  rpc GetFoo(GetFooRequest) returns (GetFooReply);
  rpc ListFoo(ListFooRequest) returns (ListFooReply);
}
```

## Comment

- **Service** describes the information of this service.
- **Method** describes the information of this API.
- **Field** describes the information of this field.

## Example

Service API Definition (demo.proto)

```protobuf
syntax = "proto3";

package gomicro.demo.v1;

// import block
// ...

option go_package = "github.com/devexps/go-micro/demo/v1;v1";
option java_multiple_files = true;
option java_package = "com.github.devexps.gomicro.demo.v1";

// Definition of the service
service Greeter {
  // definition the function of API
  rpc SayHello (HelloRequest) returns (HelloReply);
}

// the request of Hello
message HelloRequest {
  // user's name
  string name = 1;
}

// the response of Hello
message HelloReply {
  // result data
  string message = 1;
}
```

## References

- https://google.aip.dev/
- https://protobuf.dev/programming-guides/style/
- https://protobuf.dev/programming-guides/proto3/
