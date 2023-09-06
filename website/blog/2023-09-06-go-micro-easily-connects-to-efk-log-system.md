---
title: Go-Micro easily connects to the EFK log system
description: Golang microservice framework (Go-Micro) easily connects to the EFK log system
tags: [go, golang, microservice, go-micro, log, elasticsearch, fluentd, kibana]
hide_table_of_contents: false
---
<!--truncate-->

## Overview

In the early era of single services, if we wanted to use logs to locate business logic bugs or performance issues in the production environment, we have to operation and maintenance personnel log in to the server remotely one by one and query the log files for each service instance to troubleshoot the problem.

In the era of microservices, service instances are deployed on different physical machines, and the logs of each microservice are also scattered and stored on different machines.
When the service cluster is large enough, hundreds, thousands, or even tens of thousands, it is already an impossible task to use the above traditional method to check the log.
Therefore, we need to centralize the management of logs in the distributed system.

Log collection is an integral part of microservice observability. 
Logs are useful for debugging problems and monitoring cluster health.
However, after collecting log files centrally, is still not all right. We have a series of problems to solve like: 
- How to query and analyze log files.
- Which services have alarms and exceptions also require detailed statistics.

Therefore, when online failures occurred in the past, it was often seen that development, operation, and maintenance personnel downloaded service logs, and retrieved, and counted them based on some commands under Linux (such as `grep`, `awk`, and `wc`, etc.)
This old method not only has a heavy workload, and is inefficient, but also cannot handle more demanding operations such as query, sorting, and statistics, as well as a large number of cluster machines.

EFK (Elasticsearch, Fluentd, Kibana) is a popular distributed log service solution in current microservices.
Below, I will explain step by step how EFK is applied to the Golang microservice framework (Go-Micro).

## EFK - Distributed Log System

EFK is a complete-distributed log collection system, which well solves the above-mentioned problems of difficulty in log collection, retrieval, and analysis.
- `Elasticsearch` is a distributed search engine. 
It has the characteristics of high scalability, high reliability, and easy management. 
It can be used for full-text search, structured search, and analysis, and can combine the three.
Elasticsearch is developed based on **Lucene** and is now one of the most widely used open-source search engines.
Wikipedia, StackOverflow, Github, etc. all build their own search engines based on it.
- `Fluentd` is an open-source data collector.
We can install Fluentd on the microservice cluster node to obtain container log files, filter and transform the log data and then pass the data to the Elasticsearch cluster, where it will be indexed and stored.
Fluentd's logs must be in JSON as the carrier, and there is no limit to the log content.
- `Kibana` is a visualization platform. 
Kibana is a web page used to search, analyze, and visualize log data stored in Elasticsearch metrics. 
Kibana leverages Elasticsearch's interface to retrieve data, call data stored in Elasticsearch, and visualize it.
It not only allows users to customize views, but also supports querying and filtering data in special ways.

If we regard this series of components as an MVC model, then it is:
- `Fluentd` corresponds to the logic control (**Controller layer**)
- `Elasticsearch` is a data model (**Model layer**)
- `Kibana` is a view (**View layer**)

## Deploy EFK

We use Docker to deploy EFK.
First, let's write a Docker-Compose configuration file:

```yaml
version: '3'

networks:
  go-micro-efk:
    driver: bridge

services:
  elasticsearch:
    image: docker.io/bitnami/elasticsearch:latest
    networks:
      - go-micro-efk
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      - ELASTICSEARCH_USERNAME=elastic
      - ELASTICSEARCH_PASSWORD=elastic
      - xpack.security.enabled=true
      - discovery.type=single-node
      - http.cors.enabled=true
      - http.cors.allow-origin=http://localhost:13580,http://127.0.0.1:13580
      - http.cors.allow-headers=X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
      - http.cors.allow-credentials=true

  fluentd:
    image: docker.io/bitnami/fluentd:latest
    networks:
      - go-micro-efk
    depends_on:
      - "elasticsearch"
    volumes:
      - ./fluentd/conf:/opt/bitnami/fluentd/conf
      - ./fluentd/log:/opt/bitnami/fluentd/log
    ports:
      - "24224:24224"
      - "24224:24224/udp"

  kibana:
    image: docker.io/bitnami/kibana:latest
    networks:
      - go-micro-efk
    depends_on:
      - "elasticsearch"
    ports:
      - "5601:5601"
    environment:
      - KIBANA_ELASTICSEARCH_URL=elasticsearch
      - KIBANA_ELASTICSEARCH_PORT_NUMBER=9200
```

Then, we use the following command to create a Docker container and run it in the background:

```shell
docker-compose up -d
```

This is not the end, we still need to modify the configuration of Fluentd.
In the original configuration, the log is only recorded in the local text file of Fluentd.
So we need to modify the configuration to enable logging to Elasticsearch.

The original configuration file looks like this:

```xml
<source>
  @type  forward
  @id    input1
  @label @mainstream
  port  24224
</source>

<filter **>
  @type stdout
</filter>

<label @mainstream>
  <match docker.**>
    @type file
    @id             output_docker1
    path            /opt/bitnami/fluentd/logs/docker.*.log
    symlink_path    /opt/bitnami/fluentd/logs/docker.log
    append          true
    time_slice_format %Y%m%d
    time_slice_wait   1m
    time_format       %Y%m%dT%H%M%S%z
  </match>
  <match **>
    @type file
    @id   output1
    path            /opt/bitnami/fluentd/logs/data.*.log
    symlink_path    /opt/bitnami/fluentd/logs/data.log
    append          true
    time_slice_format %Y%m%d
    time_slice_wait   10m
    time_format       %Y%m%dT%H%M%S%z
  </match>
</label>

# Include config files in the ./config.d directory
@include config.d/*.conf
```

We need to modify the `<match **>` node to the following configuration:

```xml
<match **>
    @type elasticsearch
    host host.docker.internal
    port 9200
    index_name go-micro-fluentd
    type_name log
</match>
```

The above configuration actually uses the `fluent-plugin-elasticsearch` plug-in to import logs into Elasticsearch.

## Go-Micro interface with EFK

First, we need to download a package of Fluent:

```shell
go get github.com/devexps/go-micro/log/fluent/v2
```

Then create the logger:

```go
import (
    fluentLogger "github.com/devexps/go-micro/log/fluent/v2"
)

// NewFluentLogger creates a new logger - Fluent
func NewFluentLogger(endpoint string) log.Logger {
    wrapped, err := fluentLogger.NewLogger(endpoint)
    if err != nil {
        panic("create fluent logger failed")
        return nil
    }
    return wrapped
}
```

Now, all Go-Micro logs are injected into the EFK.

## Kibana query log

Kibana's access port is 5601, so we can access: http://127.0.0.1:5601/

When we first entered Kibana, it was blank and nothing. 

<p align="center">
<img src="/assets/thoughts/go-micro/connect-to-efk-log-system/screenshot-001.png" width="100%" alt="go-micro-connects-to-the-efk-log-system-screenshot-001" />
</p>

Then, we need to add a `Data View`, which is equivalent to creating a log query view.
We click `Discover` -> `Create a data view`. After that, we will see the following interface:

<p align="center">
<img src="/assets/thoughts/go-micro/connect-to-efk-log-system/screenshot-002.png" width="100%" alt="go-micro-connects-to-the-efk-log-system-screenshot-002" />
</p>

Above, we set the elastic search index in fluent to: `go-micro-fluentd`, so now we fill in `go-micro-fluentd` in the `Index pattern` text box.
With the `Timestamp field`, we can find `ts` from the drop-down box and select it.
Then, we can click `Save data view to Kibana` to create the view.

We will see a view of the log query:

<p align="center">
<img src="/assets/thoughts/go-micro/connect-to-efk-log-system/screenshot-003.png" width="100%" alt="go-micro-connects-to-the-efk-log-system-screenshot-003" />
</p>

In this view, what we see is only the most original log information. 
We can check `msg` or other fields that need attention on the left, and Kibana will filter out the information we care about:

<p align="center">
<img src="/assets/thoughts/go-micro/connect-to-efk-log-system/screenshot-004.png" width="100%" alt="go-micro-connects-to-the-efk-log-system-screenshot-004" />
</p>

If you need to build a more complex query, you can build a query statement in the top search bar.

Code repository: [https://github.com/devexps/go-efk](https://github.com/devexps/go-efk)

## References

- [Improve your logging process](https://x-team.com/blog/improve-your-logging-process/)
- [Fluentd vs Logstash: A Comparison of Log Collectors](https://logz.io/blog/fluentd-Logstash/)
- [How to setup the LFK logging stack on Kubernetes](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-elasticsearch-fluentd-and-kibana-efk-logging-stack-on-kubernetes)












