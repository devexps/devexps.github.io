---
title: Walking around the streets with my wife in hand - Just write some technical notes
description: Locally deploy Docker development environment
tags: [deploy, docker, development, environment, local]
image: /assets/thoughts/devops/develop_docker_deploy/vng19.jpeg
hide_table_of_contents: false
--- 
<!--truncate-->

## Locally deploy Docker development environment

:::tip NOTE

Bash's newlines are `\\`

The newline character of CMD is `\^`

Brief analysis of parameters:

- `-p host port:container port`
- `-e key=value`

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