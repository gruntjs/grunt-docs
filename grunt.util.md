Miscellaneous utilities, including Lo-Dash, Async and Hooker.

<a name="grunt-util-kindOf"></a>
### grunt.util.kindOf
Return the "kind" of a value. Like `typeof` but returns the internal `[[Class]]` value. Possible results are `"number"`, `"string"`, `"boolean"`, `"function"`, `"regexp"`, `"array"`, `"date"`, `"error"`, `"null"`, `"undefined"` and the catch-all `"object"`.

```js
grunt.util.kindOf(value)
```

<a name="grunt-util-error"></a>
### grunt.util.error
Return a new Error instance (that can be thrown) with the appropriate message. If an Error object is specified instead of `message` that object will be returned. Also, if an Error object is specified for `origError` and grunt was run with the `--debug 9` option, the original Error stack will be dumped.

```js
grunt.util.error(message [, origError])
```

<a name="grunt-util-linefeed"></a>
### grunt.util.linefeed
The linefeed character, normalized for the current operating system. (`\r\n` on Windows, `\n` otherwise)

<a name="grunt-util-normalizelf"></a>
### grunt.util.normalizelf
Given a string, return a new string with all the linefeeds normalized for the current operating system. (`\r\n` on Windows, `\n` otherwise)

```js
grunt.util.normalizelf(string)
```

<a name="grunt-util-recurse"></a>
### grunt.util.recurse
Recurse through nested objects and arrays, executing `callbackFunction` for each non-object value. If `continueFunction` returns `false`, a given object or value will be skipped.

```js
grunt.util.recurse(object, callbackFunction, continueFunction)
```

<a name="grunt-util-repeat"></a>
### grunt.util.repeat
Return string `str` repeated `n` times.

```js
grunt.util.repeat(n, str)
```

<a name="grunt-util-pluralize"></a>
### grunt.util.pluralize
Given `str` of `"a/b"`, If `n` is `1`, return `"a"` otherwise `"b"`. You can specify a custom separator if '/' doesn't work for you.

```js
grunt.util.pluralize(n, str, separator)
```

<a name="grunt-util-spawn"></a>
### grunt.util.spawn
Spawn a child process, keeping track of its stdout, stderr and exit code. The method returns a reference to the spawned child. When the child exits, the done function is called.

```js
grunt.util.spawn(options, doneFunction)
```

The `options` object has these possible properties:

```js
var options = {
  // The command to execute. It should be in the system path.
  cmd: commandToExecute,
  // If specified, the same grunt bin that is currently running will be
  // spawned as the child command, instead of the "cmd" option. Defaults
  // to false.
  grunt: boolean,
  // An array of arguments to pass to the command.
  args: arrayOfArguments,
  // Additional options for the Node.js child_process spawn method.
  opts: nodeSpawnOptions,
  // If this value is set and an error occurs, it will be used as the value
  // and null will be passed as the error value.
  fallback: fallbackValue
};
```

The done function accepts these arguments:

```js
function doneFunction(error, result, code) {
  // If the exit code was non-zero and a fallback wasn't specified, an Error
  // object, otherwise null.
  error
  // The result object is an object with the properties .stdout, .stderr, and
  // .code (exit code).
  result
  // When result is coerced to a string, the value is stdout if the exit code
  // was zero, the fallback if the exit code was non-zero and a fallback was
  // specified, or stderr if the exit code was non-zero and a fallback was
  // not specified.
  String(result)
  // The numeric exit code.
  code
}
```

<a name="grunt-util-toArray"></a>
### grunt.util.toArray
Given an array or array-like object, return an array. Great for converting `arguments` objects into arrays.

```js
grunt.util.toArray(arrayLikeObject)
```

<a name="grunt-util-callbackify"></a>
### grunt.util.callbackify
Normalizes both "returns a value" and "passes result to a callback" functions to always pass a result to the specified callback. If the original function returns a value, that value will now be passed to the callback, which is specified as the last argument, after all other predefined arguments. If the original function passed a value to a callback, it will continue to do so.

```js
grunt.util.callbackify(syncOrAsyncFunction)
```

This example might better illustrate:

```js
function add1(a, b) {
  return a + b;
}
function add2(a, b, callback) {
  callback(a + b);
}

var fn1 = grunt.util.callbackify(add1);
var fn2 = grunt.util.callbackify(add2);

fn1(1, 2, function(result) {
  console.log('1 plus 2 equals ' + result);
});
fn2(1, 2, function(result) {
  console.log('1 plus 2 equals ' + result);
});
```

## Internal libraries

<a name="grunt-util-namespace"></a>
### grunt.util.namespace
An internal library for resolving deeply-nested properties in objects.

<a name="grunt-util-task"></a>
### grunt.util.task
An internal library for task running.

## External libraries

<a name="grunt-util-_"></a>
### grunt.util._
[Lo-Dash](http://lodash.com/) - Tons of super-useful array, function and object utility methods.
[Underscore.string](https://github.com/epeli/underscore.string) - Tons of string utility methods.

Note that Underscore.string is mixed into `grunt.util._` but is also available as `grunt.util._.str` for methods that conflict with existing Lo-Dash methods.

<a name="grunt-util-async"></a>
### grunt.util.async
[Async](https://github.com/caolan/async) - Async utilities for node and the browser.

<a name="grunt-util-hooker"></a>
### grunt.util.hooker
[JavaScript Hooker](https://github.com/cowboy/javascript-hooker) - Monkey-patch (hook) functions for debugging and stuff.
