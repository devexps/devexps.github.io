---
title: Golang microservice framework (Go-Micro) implements SSE service
description: Golang microservice framework (Go-Micro) implements SSE service
tags: [go, golang, microservice, go-micro, sse]
hide_table_of_contents: false
---
<!--truncate-->

## Overview

I also only recently learned about SSE.
I asked people around me and found that there are not many people who know it.

**How did I know about SSE?**
I looked at OpenAI's API and there is a Stream mode, which is implemented using SSE.
To put it bluntly, this is an HTTP long connection protocol that continuously sends data to the front end through the
server.
In the case of unstable network, it is better than WebSocket.

### What is SSE?

Server-Sent Events (SSE for short)

The truth is, the HTTP protocol cannot enable the server to actively push information.
However, there is a workaround where the server declares to the client that the next thing to send is streaming.

That means, what is sent is not a one-time data packet, but a data stream which will be sent continuously.
At this time, the client will not close the connection, but will always wait for the new data stream sent by the server.
And you can see from the Video Playback is an example of this.
Essentially, this kind of communication is to complete a long download in the form of streaming information.

SSE is similar to WebSocket, in that it establishes a communication channel between the browser and the client, and then
the server pushes information to the browser.

Overall, WebSocket is more powerful and flexible. Because it is a full-duplex channel, it can communicate in two
directions.
SSE is a one-way channel, which can only be sent from the server to the browser because streaming information is
essentially downloading.
If the browser sends information to the server, it becomes another HTTP request.

However, SSE also has its own advantages:

* SSE uses the HTTP protocol, which is supported by existing server software. *WebSocket is a separate protocol.*
* SSE is lightweight and easy to use, *but the WebSocket protocol is relatively complex.*
* SSE supports disconnection, and reconnection by default. *And WebSocket needs to implement it by itself.*
* SSE is only used to transmit text and binary data, and it needs to be encoded before transmission. *WebSocket supports
  the transmission of binary data by default.*
* SSE also supports customizing the message types sent.

Therefore, both have their own characteristics and are suitable for different occasions.

### Protocol description

#### Data format

The SSE data sent by the server to the browser must be UTF-8 encoded text with the following HTTP header information.

```text
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

Among the above three lines, the `Content-Type` of the first line must specify the MIME type as `event-stream`.

The information sent each time is composed of several messages, and each `message` is separated by `\n\n`.
Each message is composed of several lines, and each line is in the following format:

```text
[field]: value\n
```

The above `field` can take four values: **data**, **id**, **event**, **retry**

In addition, there can be lines beginning with a colon, indicating comments. Normally, the server will send a note to
the browser every so often, keeping the connection uninterrupted.

```text
: This is a comment\n\n
```

Below is an example:

```text
: This is a demo stream\n\n

data: some demo text\n\n

data: another demo message\n
data: with two lines \n\n
```

#### Data field

The data content is represented by the `data` field.
If the data is too long, it can be divided into multiple lines.
The last line ends with `\n\n`, and the previous lines end with `\n`.

```text
data:  demo message\n\n

data: begin demo message\n
data: continue demo message\n
data: end demo message\n\n
```

Here is an example of sending JSON data:

```text
data: {\n
data: "foo": "bar",\n
data: "baz", 555\n
data: }\n\n
```

#### ID field

The data identifier is represented by the `id` field, which is equivalent to the serial number of each piece of data.

```text
id: msg1\n
data: demo message\n\n
```

The browser reads this value and stores it with the `lastEventId` property.
Once the connection is disconnected, the browser will send an HTTP header containing a special `Last-Event-ID` header
information, and send this value back to help the server re-establish the connection.
Therefore, this header can be viewed as a synchronization mechanism.

#### Event field

The `event` field indicates a custom event type, and the default is a `message` event. The browser can listen to this
event with `addEventListener()`.

```text
event: foo\n
data: a foo event\n\n

data: an unnamed event or a message event\n\n

event: bar\n
data: a bar event\n\n
```

The above code creates three messages. The name of the first item is `foo`, which triggers the browser's `foo event`.
The second item is unnamed, indicating the default type, and triggers the browser's `message event`.
The third item is `bar`, which triggers the browser's `bar event`.

Here's other examples:

```text
event: userconnect
data: {"username": "Tom", "time": "02:33:48"}

event: usermessage
data: {"username": "Tom", "time": "02:34:11", "text": "Hi everyone."}

event: userdisconnect
data: {"username": "Tom", "time": "02:34:23"}

event: usermessage
data: {"username": "Jerry", "time": "02:34:36", "text": "Bye, Tom."}
```

#### Retry field

The server can use this `retry` field to specify the time interval for the browser to re-initiate the connection.

```text
retry: 10000\n
```

Two situations will cause the browser to re-initiate the connection:

- One is that the time interval expires.
- The other is a connection error due to network error and other reasons.

### Go-Micro server

Firstly install the library:

```bash
go get -u github.com/devexps/go-micro/transport/sse/v2
```

Then implement a simple server:

```go
interrupt := make(chan os.Signal, 1)
signal.Notify(interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

ctx := context.Background()

s := NewServer(
WithAddress(":8080"),
)
defer s.Stop(ctx)

s.HandleServeHTTP("/events")

s.CreateStream("demo")

go func () {
s.Start(ctx)
}()

s.Publish("demo", &Event{Data: []byte("message")})

<-interrupt
```

### Javascript client

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>SSE Client</title>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>
<body>
<div>
    <ul id="messages">
    </ul>
</div>

<script>
    if (window.EventSource == null) {
        alert('The browser does not support Server-Sent Events');
    }

    const eventSource = new EventSource("http://localhost:8080/events?stream=demo")

    // Fired when the event source connection fails to open.
    eventSource.onerror = function (error) {
        console.log('connection state: ' + eventSource.readyState + ', error: ' + error);
    };

    // Fired when a connection to the event source is opened.
    eventSource.onopen = function () {
        console.log('connection is established');
    };

    // Fired when data is received from the event source.
    eventSource.onmessage = (event) => {
        console.log('id: ' + event.lastEventId + ', data: ' + event.data);
        //console.log(JSON.parse(event.data))
        const ul = document.getElementById("messages");
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${event.data}`));
        li.setAttribute("id", `msg-${event.lastEventId}`);
        ul.appendChild(li);
    }
</script>
</body>
</html>
```

Code repository: [https://github.com/devexps/go-sse](https://github.com/devexps/go-sse)

### References

- [Server-sent events - Wikipedia](https://en.wikipedia.org/wiki/Server-sent_events)
- [Golang and Server-Sent Events (SSE)](https://dev.to/rafaelgfirmino/golang-and-sse-3l56)












