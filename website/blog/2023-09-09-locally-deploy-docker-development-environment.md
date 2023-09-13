---
title: Locally deploy Docker development environment
description: Locally deploy Docker development environment
tags: [deploy, docker, development, environment, local]
image: /assets/thoughts/devops/develop_docker_deploy/vng19.jpeg
hide_table_of_contents: false
--- 
<!--truncate-->

## Overview

:::tip NOTE

Bash's newlines are `\\`

The newline character of CMD is `\^`

:::

Need to set Host:
```shell
# Added by Docker Desktop
192.168.1.6 host.docker.internal
192.168.1.6 gateway.docker.internal
# To allow the same kube context to work on the host and the container:
192.168.1.6 kubernetes.docker.internal
# End of section
```

## Relational Database

### MySQL

```shell
docker pull bitnami/mysql:latest

docker run -itd \
    --name mysql-dev \
    -p 3306:3306 \
    -e ALLOW_EMPTY_PASSWORD=yes \
    -e MYSQL_ROOT_PASSWORD=123456 \
    bitnami/mysql:latest
```

:::note

Default account: `root`

Default password: `123456`

:::

### PostgreSQL

```shell
docker pull bitnami/postgresql:latest
docker pull bitnami/postgresql-repmgr:latest
docker pull bitnami/pgbouncer:latest
docker pull bitnami/pgpool:latest
docker pull bitnami/postgres-exporter:latest

docker run -itd \
    --name postgres-dev \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=123456 \
    bitnami/postgresql:latest

docker exec -it postgres-dev "apt update"
```

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

SELECT version();
SELECT postgis_full_version();
```

:::note

Default account: `postgres`

Default password: `123456`

:::

### MariaDB

```shell
docker pull bitnami/mariadb:latest

docker run -itd \
    --name mariadb-dev \
    -p 3306:3306 \
    -e ALLOW_EMPTY_PASSWORD=yes \
    -e MARIADB_ROOT_PASSWORD=123456 \
    bitnami/mariadb:latest
```

:::note

Default account: `root`

Default password: `123456`

:::

### SQLServer

```shell
docker pull mcr.microsoft.com/mssql/server:2019-latest

docker run -itd \
    --name mssql-dev \
    -m 512m \
    -e "ACCEPT_EULA=Y" \
    -e "SA_PASSWORD=Abcd123456789*" \
    -p 1433:1433 \
    mcr.microsoft.com/mssql/server:2019-latest
```

### TiDB

```shell
docker pull pingcap/tidb:latest
docker pull pingcap/tikv:latest
docker pull pingcap/pd:latest

docker run -itd \
    --name tidb-dev \
    -v /data/tidb/data:/tmp/tidb \
    --privileged=true \
    -p 4000:4000 \
    -p 10080:10080 \
    pingcap/tidb:latest
```

## Graph database

### Neo4J

```shell
docker pull bitnami/neo4j:latest

docker run -itd \
    --name neo4j-dev \
    -p 7473:7473 \
    -p 7687:7687 \
    -p 7474:7474 \
    -e NEO4J_PASSWORD=123456 \
    bitnami/neo4j:latest
```

## Time series database

### InfluxDB

```shell
docker pull bitnami/influxdb:latest

docker run -itd \
    --name influxdb-dev \
    -p 8083:8083 \
    -p 8086:8086 \
    -e INFLUXDB_HTTP_AUTH_ENABLED=true \
    -e INFLUXDB_ADMIN_USER=admin \
    -e INFLUXDB_ADMIN_USER_PASSWORD=123456789 \
    -e INFLUXDB_ADMIN_USER_TOKEN=admintoken123 \
    -e INFLUXDB_DB=my_database \
    bitnami/influxdb:latest
```

```sql
create user "admin" with password '123456789' with all privileges
```

:::note

Management tool: `http://localhost:8086/`

:::

### TimescaleDB

```shell
docker pull timescale/timescaledb:latest-pg14
docker pull timescale/timescaledb:latest-pg15
docker pull timescale/timescaledb-postgis:latest-pg13
docker pull timescale/pg_prometheus:latest-pg11

docker run -itd \
    --name timescale-dev \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=123456 \
    timescale/timescaledb:latest-pg15
```

:::note

Default account: `postgres`

Default password: `123456`

:::

### OpenTSDB

```shell
docker pull petergrace/opentsdb-docker:latest

docker run -itd \
    --name opentsdb-dev \
    -p 4242:4242 \
    petergrace/opentsdb-docker:latest
```

:::note

Management tool: `http://localhost:4242`

:::

### QuestDB

```shell
docker pull questdb/questdb:latest

docker run -itd \
    --name questdb-dev \
    -p 9000:9000 \
    -p 8812:8812 \
    -p 9009:9009 \
    questdb/questdb:latest
```

### TDengine

```shell
docker pull tdengine/tdengine:latest

docker run -itd \
    --name tdengine-dev \
    -p 6030-6041:6030-6041 \
    -p 6030-6041:6030-6041/udp \
    tdengine/tdengine:latest
```

### ElasticSearch

```shell
docker pull bitnami/elasticsearch:latest

docker run -itd \
    --name elasticsearch-dev \
    -p 9200:9200 \
    -p 9300:9300 \
    -e ELASTICSEARCH_USERNAME=elastic \
    -e ELASTICSEARCH_PASSWORD=elastic \
    -e xpack.security.enabled=true \
    -e discovery.type=single-node \
    -e http.cors.enabled=true \
    -e http.cors.allow-origin=http://localhost:13580,http://127.0.0.1:13580 \
    -e http.cors.allow-headers=X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization \
    -e http.cors.allow-credentials=true \
    bitnami/elasticsearch:latest

docker pull appbaseio/dejavu:latest

docker run -itd \
    --name dejavu-test \
    -p 13580:1358 \
    appbaseio/dejavu:latest
```

:::note

Management tool: `http://localhost:13580/`

:::

### Clickhouse

```shell
docker pull yandex/clickhouse-server:latest
docker pull clickhouse/clickhouse-server:latest

# 8123 is http interface; 9000 is tcp interface; 9004 is mysql interface
# It is recommended to use DBeaver as the client
docker run -itd \
    --name clickhouse-server-dev \
    -p 8123:8123 \
    -p 9000:9000 \
    -p 9004:9004 \
    --network=app-tier \
    --ulimit \
    nofile=262144:262144 \
    clickhouse/clickhouse-server:latest
```

:::note

Default account: `default`

Password: none

:::

### Doris

```shell
docker pull apache/doris:1.2.2-be-x86_64
docker pull apache/doris:1.2.2-fe-x86_64

docker network create --driver bridge --subnet=127.0.0.1/24 doris-network

docker run -itd \
    --name=doris-fe-dev \
    --env FE_SERVERS="fe1:127.0.0.1:9010" \
    --env FE_ID=1 \
    -p 8030:8030 \
    -p 9030:9030 \
    -v /data/fe/doris-meta:/opt/apache-doris/fe/doris-meta \
    -v /data/fe/conf:/opt/apache-doris/fe/conf \
    -v /data/fe/log:/opt/apache-doris/fe/log \
    --network=doris-network \
    --ip=127.0.0.1 \
    apache/doris:1.2.2-fe-x86_64

docker run -itd \
    --name=doris-be-dev \
    --env FE_SERVERS="fe1:127.0.0.1:9010" \
    --env BE_ADDR="127.0.0.1:9050" \
    -p 8040:8040 \
    -v /data/be/storage:/opt/apache-doris/be/storage \
    -v /data/be/conf:/opt/apache-doris/be/conf \
    -v /data/be/log:/opt/apache-doris/be/log \
    --network=doris-network \
    --ip=127.0.0.1 \
    apache/doris:1.2.2-be-x86_64
```

## NoSQL database

### MongoDB

```shell
docker pull bitnami/mongodb:latest
docker pull bitnami/mongodb-exporter:latest

docker run -itd \
    --name mongodb-dev \
    -p 27017:27017 \
    -e MONGODB_ROOT_USER=root \
    -e MONGODB_ROOT_PASSWORD=123456 \
    -e MONGODB_USERNAME=test \
    -e MONGODB_PASSWORD=123456 \
    -e MONGODB_DATABASE=test \
    bitnami/mongodb:latest
```

### Redis

```shell
docker pull bitnami/redis:latest
docker pull bitnami/redis-exporter:latest

docker run -itd \
    --name redis-server-dev \
    -p 6379:6379 \
    -e ALLOW_EMPTY_PASSWORD=yes \
    bitnami/redis:latest
```

### Memcached

```shell
docker pull bitnami/memcached:latest
docker pull bitnami/memcached-exporter:latest

docker run -itd \
    --name memcached-dev \
    -p 11211:11211 \
    bitnami/memcached:latest
```

### CouchDB

```shell
docker pull bitnami/couchdb:latest

docker run -itd \
    --name couchdb-dev \
    -p 5984:5984  \
    -p 9100:9100  \
    -e COUCHDB_PORT_NUMBER=5984
    -e COUCHDB_CLUSTER_PORT_NUMBER=9100
    -e COUCHDB_USER=admin
    -e COUCHDB_PASSWORD=couchdb
    bitnami/couchdb:latest
```

### Cassandra

```shell
docker pull bitnami/cassandra:latest
docker pull bitnami/cassandra-exporter:latest

docker run -itd \
    --name cassandra-dev \
    -p 7000:7000  \
    -p 9042:9042  \
    -e CASSANDRA_USER=cassandra \
    -e CASSANDRA_PASSWORD=cassandra \
    bitnami/cassandra:latest
```

## Service Discovery - Registry

### Etcd

```shell
docker pull bitnami/etcd:latest

docker run -itd \
    --name etcd-standalone-dev \
    -p 2379:2379 \
    -p 2380:2380 \
    -e ETCDCTL_API=3 \
    -e ALLOW_NONE_AUTHENTICATION=yes \
    -e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
    bitnami/etcd:latest
```

:::note

Management tool: [etcd-manager](https://www.electronjs.org/apps/etcd-manager)

:::

### Nacos

```shell
docker pull nacos/nacos-server:latest

docker run -itd \
    --name nacos-standalone-dev \
    -e MODE=standalone \
    -p 8849:8848 \
    nacos/nacos-server:latest
```

:::note

Management tool: `http://localhost:8849/nacos/index.html`

:::

### Consul

```shell
docker pull bitnami/consul:latest
docker pull bitnami/consul-exporter:latest

docker run -itd \
    --name consul-standalone-dev \
    -p 8300:8300 \
    -p 8500:8500 \
    -p 8600:8600/udp \
    -e CONSUL_BIND_INTERFACE='eth0' \
    -e CONSUL_AGENT_MODE=server \
    -e CONSUL_ENABLE_UI=true \
    -e CONSUL_BOOTSTRAP_EXPECT=1 \
    -e CONSUL_CLIENT_LAN_ADDRESS=0.0.0.0 \
    bitnami/consul:latest
```

:::note

Management tool: `http://localhost:8500`

:::

### Apollo

```shell
docker pull apolloconfig/apollo-portal:latest
docker pull apolloconfig/apollo-configservice:latest
docker pull apolloconfig/apollo-adminservice:latest

docker run -itd \
    --name apollo-configservice-dev \
    -p 8080:8080 \
    -e SPRING_DATASOURCE_URL="jdbc:mysql://127.0.0.1:3306/ApolloConfigDB?characterEncoding=utf8" \
    -e SPRING_DATASOURCE_USERNAME=root \
    -e SPRING_DATASOURCE_PASSWORD=123456 \
    -v /tmp/logs:/opt/logs \
    apolloconfig/apollo-configservice:latest

docker run -itd \
    --name apollo-adminservice-dev \
    -p 8090:8090 \
    -e SPRING_DATASOURCE_URL="jdbc:mysql://127.0.0.1:3306/ApolloConfigDB?characterEncoding=utf8" \
    -e SPRING_DATASOURCE_USERNAME=root \
    -e SPRING_DATASOURCE_PASSWORD=123456 \
    -v /tmp/logs:/opt/logs \
    apolloconfig/apollo-adminservice:latest

docker run -itd \
    --name apollo-portal-dev \
    -p 8070:8070 \
    -e SPRING_DATASOURCE_URL="jdbc:mysql://127.0.0.1:3306/ApolloPortalDB?characterEncoding=utf8" \
    -e SPRING_DATASOURCE_USERNAME=root \
    -e SPRING_DATASOURCE_PASSWORD=123456 \
    -e APOLLO_PORTAL_ENVS=dev \
    -e DEV_META=http://127.0.0.1:8080 \
    -v /tmp/logs:/opt/logs \
    apolloconfig/apollo-portal:latest
```

:::note

Management tool: `http://localhost:8070`

Account / Password: `apollo` / `admin`

:::

## Message queue

### RabbitMQ

```shell
docker pull bitnami/rabbitmq:latest

docker run -itd \
    --hostname localhost \
    --name rabbitmq-dev \
    -p 15672:15672 \
    -p 5672:5672 \
    -p 1883:1883 \
    -p 15675:15675 \
    -e RABBITMQ_PLUGINS=rabbitmq_top,rabbitmq_mqtt,rabbitmq_web_mqtt,rabbitmq_prometheus,rabbitmq_stomp,rabbitmq_auth_backend_http \
    bitnami/rabbitmq:latest

# View plugin list
rabbitmq-plugins list
# rabbitmq_peer_discovery_consul 
rabbitmq-plugins --offline enable rabbitmq_peer_discovery_consul
# rabbitmq_mqtt provides interaction with backend services, port 1883
rabbitmq-plugins enable rabbitmq_mqtt
# rabbitmq_web_mqtt provides interaction with the front end, port 15675
rabbitmq-plugins enable rabbitmq_web_mqtt
# rabbitmq_auth_backend_http is enabled and configured to authenticate with RabbitMQ
rabbitmq-plugins enable rabbitmq_auth_backend_http
```

:::note

Management tool: `http://localhost:15672`

Account / Password: `user` / `bitnami`

:::

### Kafka

#### With ZooKeeper

```shell
docker pull bitnami/zookeeper:latest
docker pull bitnami/kafka:latest
docker pull bitnami/kafka-exporter:latest

docker run -itd \
    --name zookeeper-server-dev \
    --network app-tier \
    -p 2181:2181 \
    -e ALLOW_ANONYMOUS_LOGIN=yes \
    bitnami/zookeeper:latest

docker run -itd \
    --name kafka-standalone-dev \
    --link zookeeper-server-dev \
    --network app-tier \
    -p 9092:9092 \
    -v /home/data/kafka:/bitnami/kafka \
    -e KAFKA_ENABLE_KRAFT=no \
    -e KAFKA_BROKER_ID=1 \
    -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://host.docker.internal:9092 \
    -e KAFKA_ZOOKEEPER_CONNECT=zookeeper-server-dev:2181 \
    -e ALLOW_PLAINTEXT_LISTENER=yes \
    --user root \
    bitnami/kafka:latest
```

#### With KRaft

```shell
docker pull bitnami/kafka:latest

docker run -itd \
    --name kafka-standalone-dev \
    --user root \
    -p 9092:9092 \
    -p 9093:9093 \
    -v /home/data/kafka:/bitnami/kafka \
    -e KAFKA_ENABLE_KRAFT=yes \
    -e KAFKA_BROKER_ID=1 \
    -e KAFKA_CFG_PROCESS_ROLES=broker,controller \
    -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
    -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@host.docker.internal:9093 \
    -e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
    -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://host.docker.internal:9092 \
    -e ALLOW_PLAINTEXT_LISTENER=yes \
    bitnami/kafka:latest
```

:::note

Management tool: [Offset Explorer](https://www.kafkatool.com/download.html)

:::

### NSQ

```shell
docker pull nsqio/nsq:latest

# nsqlookupd
docker run -d \
    --name nsqlookupd \
    -p 4160:4160 \
    -p 4161:4161 \
    nsqio/nsq:latest \
    /nsqlookupd

# nsqd
docker run -itd \
    --name nsqd \
    -p 4150:4150 \
    -p 4151:4151 \
    --link nsqlookupd \
    nsqio/nsq:latest \
    /nsqd --lookupd-tcp-address=nsqlookupd:4160

#nsqadmin
docker run -itd \
    --name nsqadmin \
    -p 4171:4171 \
    --link nsqlookupd \
    nsqio/nsq:latest \
    /nsqadmin --lookupd-http-address=nsqlookupd:4161
```

:::note

Console access address: `http://127.0.0.1:4171`

Directly use the REST API to view node information: `http://127.0.0.1:4161/nodes`

:::

### NATS

```shell
docker pull bitnami/nats:latest
docker pull bitnami/nats-exporter:latest

docker run -itd \
    --name nats-server \
    --p 4222:4222 \
    --p 6222:6222 \
    --p 8000:8222 \
    -e NATS_HTTP_PORT_NUMBER=8222 \
    bitnami/nats:latest
```

:::note

Management tool: `https://127.0.0.1:8000`

:::

### Mosquitto

```shell
docker pull eclipse-mosquitto:latest

# 1883 tcp
# 9001 websockets
docker run -itd \
    --name mosquitto-dev \
    -p 1883:1883 \
    -p 9001:9001 \
    eclipse-mosquitto:latest
```

### EMX

```shell
docker pull emqx/emqx:latest

docker run -itd \
    --name emqx-dev \
    --add-host=host.docker.internal:host-gateway \
    -p 18083:18083 \
    -p 1883:1883 \
    emqx/emqx:latest
```

:::note

Management tool: `http://localhost:18083`

Account / Password: `admin` / `public`

:::

### Pulsar

```shell
docker pull apachepulsar/pulsar-manager:latest
docker pull apachepulsar/pulsar:latest

docker run -itd \
    -p 6650:6650 \
    -p 8080:8080 \
    --name pulsar-standalone \
    apachepulsar/pulsar:latest bin/pulsar standalone

docker run -itd \
    -p 9527:9527 \
    -p 7750:7750 \
    -e SPRING_CONFIGURATION_FILE=/pulsar-manager/pulsar-manager/application.properties \
    apachepulsar/pulsar-manager:latest
```

```shell
docker pull apachepulsar/pulsar-standalone:latest

docker run -itd \
    -p 6650:6650 \
    -p 8080:8080 \
    -p 9527:9527 \
    --name pulsar-standalone \
    apachepulsar/pulsar:latest bin/pulsar standalone
```

:::note

Management tool: `http://localhost:9527`

:::

### HiveMQ

```shell
docker pull hivemq/hivemq4:latest

docker run -itd \
    --name hivemq-dev \
    --ulimit nofile=500000:500000 \
    -p 8080:8080 \
    -p 8000:8000 \
    -p 1883:1883 \
    hivemq/hivemq4:latest
```

### RocketMQ

At least one NameServer and one Broker must be started.

```shell
docker pull apache/rocketmq:latest

# NameServer
docker run -d \
      --name rmqnamesrv \
      -e "JAVA_OPT_EXT=-Xms512M -Xmx512M -Xmn128m" \
      -p 9876:9876 \
      apache/rocketmq:latest \
      sh mqnamesrv

# Broker
docker run -d \
      --name rmqbroker \
      -e "JAVA_OPT_EXT=-Xms512M -Xmx512M -Xmn128m" \
      -p 10911:10911 -p 10909:10909 \
      --link rmqnamesrv \
      -e "NAMESRV_ADDR=rmqnamesrv:9876" \
      apache/rocketmq:latest \
      sh mqbroker
```

```shell
docker pull styletang/rocketmq-console-ng:latest

docker run -d \
    --name rmqconsole \
    -p 9800:8080 \
    --link rmqnamesrv \
    -e "JAVA_OPTS=-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" \
    -t styletang/rocketmq-console-ng:latest
```

:::note

Console access address: `http://localhost:9800/#/`

:::

### ActiveMQ

```shell
docker pull rmohr/activemq:latest

docker run -d \
      --name activemq-dev \
      -p 61616:61616 \
      -p 8161:8161 \
      -p 61613:61613 \
      -p 1883:1883 \
      -p 61614:61614 \
      rmohr/activemq:latest
```

| Port number | Protocol |
|-------------|----------|
| 61616       | JMS      |
| 8161        | UI       |
| 5672        | AMQP     |
| 61613       | STOMP    |
| 1883        | MQTT     |
| 61614       | WS       |

:::note

Admin tool: `http://localhost:8161/admin/`

Account / Password: `admin` / `admin`

:::

### Asynq

```shell
docker pull hibiken/asynqmon:latest

docker run -d \
    --name asynq-dev \
    -p 8080:8080 \
    hibiken/asynqmon:latest --redis-addr=host.docker.internal:6379
```

:::note

Management tool: `http://localhost:8080`

:::

## Microservice runtime

### Tracing

```shell
docker pull jaegertracing/all-in-one:latest

docker run -itd \
    --name jaeger-dev \
    -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
    -e COLLECTOR_OTLP_ENABLED=true \
    -p 6831:6831/udp \
    -p 6832:6832/udp \
    -p 5778:5778 \
    -p 16686:16686 \
    -p 4317:4317 \
    -p 4318:4318 \
    -p 14250:14250 \
    -p 14268:14268 \
    -p 14269:14269 \
    -p 9411:9411 \
    jaegertracing/all-in-one:latest
```


| Port number | Protocol | Components | Function                                                    |
|-------------|----------|------------|-------------------------------------------------------------|
| 6831        | UDP      | agent      | Thrift-compact protocol (used by most SDKs)                 |
| 6832        | UDP      | agent      | Thrift-binary protocol (used by Node.js SDK)                |
| 5775        | UDP      | agent      | Thrift-compact protocol (deprecated)                        |
| 5778        | HTTP     | agent      | Service configuration interface (sampling, etc.)            |
| 16686       | HTTP     | Query      | Service front end for Jaeger Web UI                         |
| 4317        | HTTP     | Collector  | If enabled, receive OpenTelemetry Protocol (OTLP) over gRPC |
| 4318        | HTTP     | Collector  | If enabled, receive OpenTelemetry Protocol (OTLP) over HTTP |
| 14268       | HTTP     | Collector  | Receive clients directly                                    |
| 14269       | HTTP     | Collector  | Provides: health check `/`, performance check `/metrics`    |
| 14250       | HTTP     | Collector  | Take over `model.proto`                                     |
| 9411        | HTTP     | Collector  | Zipkin-compatible http endpoint (optional)                  |

:::note

API: `http://localhost:14268/api/traces`

Management tool: `http://localhost:16686`

:::

### Zipkin

```shell
docker pull openzipkin/zipkin:latest

docker run -d \
    --name zipkin-dev \
    -p 9411:9411 \
    openzipkin/zipkin:latest
```

:::note

API: `http://localhost:9411/api/v2/spans`

Management tool: `http://localhost:9411`

:::

## Operation and maintenance monitoring

### Kibana

```shell
docker pull bitnami/kibana:latest

docker run -d \
    --name kibana-dev \
    -p 5601:5601 \
    -e KIBANA_ELASTICSEARCH_URL=elasticsearch \
    -e KIBANA_ELASTICSEARCH_PORT_NUMBER=9200 \
    bitnami/kibana:latest
```

### Prometheus

```shell
docker pull bitnami/prometheus:latest
docker pull bitnami/pushgateway:latest

docker run -d \
    --name prometheus-gateway \
    -p 9091:9091 \
    bitnami/pushgateway:latest

docker run -d \
    --name prometheus \
    -p 9090:9090 \
    bitnami/prometheus:latest
```

:::note

Prometheus tool: `http://localhost:9090`

Push gateway tool: `http://localhost:9091`

:::

### Grafana

```shell
docker pull bitnami/grafana:latest

docker run -d \
    --name grafana \
    -p 3000:3000 \
    -e GF_SECURITY_ADMIN_PASSWORD=pass \
    bitnami/grafana:latest
```

### Logstash

```shell
docker pull bitnami/logstash:latest
docker pull bitnami/logstash-exporter:latest

docker run -d \
    --name logstash \
    -p 8080:8080 \
    bitnami/logstash:latest
```

### Fluentd

```shell
docker pull bitnami/fluentd:latest

docker run -d \
    --name fluentd \
    -p 24224:24224 \
    -p 24224:24224/udp \
    -v /data:/opt/bitnami/fluentd/log \
    bitnami/fluentd:latest
```

## Streaming computing

### Spark

```shell
docker pull bitnami/spark:latest

docker run -itd \
    --name spark-standalone \
    -p 6066:6066 \
    -p 7077:7077 \
    -p 8080:8080 \
    -p 50070:50070 \
    -e SPARK_MODE=master \
    -e SPARK_WORKER_CORES=1 \
    -e SPARK_WORKER_MEMORY=2g \
    bitnami/spark:latest
```

:::note

HDFS web interface: `http://localhost:50070`

Spark interface: `http://localhost:8080`

:::

### Flink

```shell
docker pull flink:latest

docker network create flink-network

docker run -itd \
    --name flink-jobmanager \
    --network flink-network \
    -p 8081:8081 \
    --env FLINK_PROPERTIES="jobmanager.rpc.address: flink-jobmanager" \
    flink:latest jobmanager

docker run -itd \
    --name flink-taskmanager \
    --network flink-network \
    --env FLINK_PROPERTIES="jobmanager.rpc.address: flink-jobmanager" \
    flink:latest taskmanager
```

:::note

Management tool: `http://localhost:8081`

:::

## Object storage

### MinIO

```shell
docker pull bitnami/minio:latest

docker network create app-tier --driver bridge

# MINIO_ROOT_USER minimum 3 characters
# MINIO_ROOT_PASSWORD minimum 8 characters
# When running for the first time, the service will automatically shut down, and it can run normally after restarting manually.
docker run -itd \
    --name minio-server \
    -p 9000:9000 \
    -p 9001:9001 \
    --env MINIO_ROOT_USER="root" \
    --env MINIO_ROOT_PASSWORD="123456789" \
    --env MINIO_DEFAULT_BUCKETS='images,videos' \
    --env MINIO_FORCE_NEW_KEYS="yes" \
    --env BITNAMI_DEBUG=true \
    --volume /usr/local/minio/data:/data \
    --network app-tier \
    bitnami/minio:latest
```

```shell
docker pull minio/minio:latest

# MINIO_ROOT_USER minimum 3 characters, default: minioadmin
# MINIO_ROOT_PASSWORD minimum 8 characters, default: minioadmin
docker run -itd \
    --name minio-server \
    -p 9000:9000 \
    -p 9001:9001 \
    -e "MINIO_ROOT_USER=root" \
    -e "MINIO_ROOT_PASSWORD=123456789" \
    -v /usr/local/minio/data:/data \
    --network app-tier \
    minio/minio server /data --console-address ':9001'
```

:::note

Management tool: `http://localhost:9001/login`

:::

## Machine learning

### TensorFlow

```shell
docker pull bitnami/tensorflow-resnet:latest
docker pull bitnami/tensorflow-serving:latest
docker pull bitnami/tensorflow-inception:latest

docker network create app-tier --driver bridge

docker run -d --name tensorflow-serving \
    --volume /tmp/model-data:/bitnami/model-data \
    --network app-tier \
    bitnami/tensorflow-serving:latest

docker run -d --name tensorflow-resnet \
    --volume /tmp/model-data:/bitnami/model-data \
    --network app-tier \
    bitnami/tensorflow-resnet:latest
```

## References

- [https://db-engines.com/en/ranking/time+series+dbms](https://db-engines.com/en/ranking/time+series+dbms)