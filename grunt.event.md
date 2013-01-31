Even though only the most relevant methods are listed on this page, the full [EventEmitter2 API][ee2] is available on the `grunt.event` object. Event namespaces may be specified with the `.` (dot) separator, and namespace wildcards have been enabled.

*Note that grunt doesn't yet emit any events, but can still be useful in your own tasks.*

[ee2]: https://github.com/hij1nx/EventEmitter2

<a name="grunt-event-on"></a>
### grunt.event.on
Adds a listener to the end of the listeners array for the specified event.

```js
grunt.event.on(event, listener)
```

<a name="grunt-event-once"></a>
### grunt.event.once
Adds a **one time** listener for the event. The listener is invoked only the first time the event is fired, after which it is removed.

```js
grunt.event.once(event, listener)
```

<a name="grunt-event-many"></a>
### grunt.event.many
Adds a listener that will execute **n times** for the event before being removed. The listener is invoked only the first time the event is fired, after which it is removed.

```js
grunt.event.many(event, timesToListen, listener)
```

<a name="grunt-event-off"></a>
### grunt.event.off
Remove a listener from the listener array for the specified event.

```js
grunt.event.off(event, listener)
```

<a name="grunt-event-removeAllListeners"></a>
### grunt.event.removeAllListeners
Removes all listeners, or those of the specified event.

```js
grunt.emitter.removeAllListeners([event])
```

<a name="grunt-event-emit"></a>
### grunt.event.emit
Execute each of the listeners that may be listening for the specified event name in order with the list of arguments.

```js
grunt.event.emit(event, [arg1], [arg2], [...])
```