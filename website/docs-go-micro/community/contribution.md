---
title: contribution
description: Go-Micro contribution
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

# Contribution
This community hopes to get help from developers from all over the world, so I also hope you'd take a few minutes to read this guild before filling an issue or pull request.

## Bug fixed
Go-Micro uses Github Issues to manage issues. If you want to submit a bug report or help fix a bug, please to make sure to search the existing issues and pull requests.

## How to submit code
If you have never committed code on Github, please follow the steps below:

- First, please fork the project into your own Github account.
- Then create a new feature branch based on the **main branch** and named it after the feature like: **feature-test**
- Write your code.
- Submit the code to the remote branch
- Submit a PR request in Github
- Merge into **main branch** after waiting for review

## Commit rules
Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) to normalize the commit message

**Note that: when you submit a PR request, first ensure that the code uses the correct coding specification and has a complete test cases. It's best to associate the related issues in the submitted PR information to reduce the workload of reviewers.**

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### type
There are the following commit types:

#### Main types
- **fix**: A fix bugs
- **feat**: A new feature
- **deps**: Changes external dependencies
- **break**: Changes has break change

#### Other types
- **docs**: Documentation only changes
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **test**: Adding missing tests or correcting existing tests
- **chore** Daily work, examples, etc.
- **ci**: Changes to our CI configuration files and scripts

### scope
The following is the list of supported scopes:

- transport
- examples
- middleware
- config
- cmd
- etc.

### description
Clearly describe what the submitted code does in short sentences.

### body
Extra notes, used to describe reasons, purposes, implementation logic, etc., can be omitted.

### footer
- **When there is an incompatible (breaking change) update, it is necessary to describe the reason and the scope of impact.**
- Associate related issues, such as Refs #123.
- Links to PRs for documentation updates and updates for other modules that may be involved.

### Commit examples

#### Commit message only
```
fix: The log debug level should be -1
```

#### Needs attention
```
refactor!(transport/http): replacement underlying implementation
```

#### Contains all structures
```
fix(log): [BREAKING-CHANGE] unable to meet the requirement of log Library

Explain the reason, purpose, realization method, etc.

Close #111
Doc change on doc/#222
BREAKING CHANGE:
   Breaks log.info api, log_api.log should be used instead
```