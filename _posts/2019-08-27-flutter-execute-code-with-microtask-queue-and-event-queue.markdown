---
layout: post
title: "Flutter execute code with MicroTask queue and Event queue"
date: "2019-08-27 21:16:02 +0700"
---
### Dart is a single threaded language
First thing, everyone need to known that Dart is **a single thread** and Flutter replies on Dart.

> ***IMPORTANT***  
> Dart executes **one operation at a time, one after the other** meaning that as long as one operation is executing, it cannot be interrupted by any other Dart code.

```dart
void myLoop(){
    for (int i = 0; i < 1000; i++){
        _doSomething();
    }
}
```
In the example above, the execution of the `myLoop()` method will never be interrupted until it completes. As a consequence, if this method takes some time, the thread will be `“blocked”` during the whole method execution complete, the application will be `"blocked"` during too.

### The Dart execution model
<img src="/assets/thoughts/flutter-mobile/flutter-thread/dart-start-app.png" width="100%" alt="Flutter (or any Dart) app start">

When start a Flutter (*or any Dart*) application, a new **Thread** process (in Dart language call *isolate*) is created and Launched. This thread will be only one that you need to care for the entire application.

After **main thread** created, Dart automatically:  
1. initializes 2 Queues, namely `“MicroTask”` and `“Event”` FIFO queues;
2. executes the **main()** method and, once this code execution is completed;
3. launches the `Event Loop`

<img src="/assets/thoughts/flutter-mobile/flutter-thread/dart-event-loop.png" width="100%" alt="Flutter (or any Dart) app start">

During the whole life of the thread, a single internal and invisible process, called the `“Event Loop”`, will drive the way your code will be executed and in which sequence order, depending on the content of both **MicroTask Queue** and **Event** queues.

The *Event Loop* corresponds to some kind of **infinite** loop, cadence by an internal clock which, at each tick, if no other Dart code is being executed, does something like the following:
```dart
static void eventLoop() {
    while (microTaskQueue.isNotEmpty){
        fetchFirstMicroTaskFromQueue();
        executeThisMicroTask();
        return;
    }

    if (eventQueue.isNotEmpty){
        fetchFirstEventFromQueue();
        executeThisEventRelatedCode();
    }
}
```
As we can see the MicroTask Queue has precedence over the Event Queue.

### MicroTask Queue
The *MicroTask* queue is used for **very short** internal actions that need to be run *asynchronously*, right after something else completes and before giving the hand back to the Event queue.

As an example of a *MicroTask* you could imagine having to dispose a resource, right after it has been closed. As the closure process could take some time to complete, you could write something like this:
```dart
    MyResource myResource;

    //...

    void closeAndRelease() {
        scheduleMicroTask(_dispose);
        _close();
    }

    void _close(){
        // The code to be run synchronously
        // to close the resource
        //...
    }

    void _dispose(){
        // The code which has to be run
        // right after the _close()
        // has completed
    }
```

### Event Queue
The *Event* queue is used to reference operations that result from  
* external events such as  
     * I/O;
     * gesture;
     * drawing;
     * timers;
     * streams;
     * …
* futures  

In fact, each time an **external** event is triggered, the corresponding code to be executed is referenced into the *Event* queue.

As soon as there is no longer any *micro task* to run, the *Event Loop* considers the first item in the *Event* Queue and will execute it.

It is very interesting to note that **Futures** are also handled via the *Event* queue.

Okay, that's all and I'll see you next article, enjoy!
