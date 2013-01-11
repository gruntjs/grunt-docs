Tasks are grunt's bread and butter. The stuff you do most often, like `jshint` or `nodeunit`. Every time grunt is run, you specify one or more tasks to run, which tells grunt what you'd like it to do.

If you don't specify a task, but a task named "default" has been defined, that task will run (unsurprisingly) by default.

## Alias Tasks
If a task list is specified, the new task will be an alias for one or more other tasks. Whenever this "alias task" is run, every specified task in `taskList` will be run, in the order specified. The `taskList` argument must be an array of tasks.

```javascript
grunt.registerTask(taskName, [description, ] taskList)
```

This example alias task defines a "default" task whereby the "jshint", "qunit", "concat" and "uglify" tasks are run automatically if grunt is executed without any tasks specified:

```javascript
task.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
```

Task arguments can be specified as well. In this example, the alias "dist" runs both the "concat" and "min" tasks, each with the "dist" argument:

```javascript
task.registerTask('dist', ['concat:dist', 'uglify:dist']);
```

## "Basic" Tasks
If a `description` and `taskFunction` are passed, the specified function will be executed whenever the task is run. In addition, the specified description will be shown when `grunt --help` is run. Task-specific properties and methods are available inside the task function as properties of the `this` object. The task function can return `false` to indicate that the task has failed.

Note that the `grunt.registerMultiTask` method, explained below, can be used to define a special type of task known as a "multi task."

```javascript
grunt.registerTask(taskName, description, taskFunction)
```

This example task logs `foo, testing 123` if grunt is run via `grunt foo:testing:123`. If the task is run without arguments as `grunt foo` the task logs `foo, no args`.

```javascript
grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
  if (arguments.length === 0) {
    grunt.log.writeln(this.name + ", no args");
  } else {
    grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
  }
});
```

## Multi Tasks
Register a "multi task." A multi task is a task that implicitly iterates over all of its named sub-properties (AKA targets) if no target was specified. In addition to the default properties and methods, extra multi task-specific properties are available inside the task function as properties of the `this` object.

Many of the contrib tasks, including the [jshint task](https://github.com/gruntjs/grunt-contrib-jshint), [concat task](https://github.com/gruntjs/grunt-contrib-concat) and [uglify task](https://github.com/gruntjs/grunt-contrib-jshint) are multi tasks.

```javascript
grunt.registerMultiTask(taskName, description, taskFunction)
```

Given the specified configuration, this example multi task would log `foo: 1,2,3` if grunt was run via `grunt log:foo`, or it would log `bar: hello world` if grunt was run via `grunt log:bar`. If grunt was run as `grunt log` however, it would log `foo: 1,2,3` then `bar: hello world` then `baz: false`.

```javascript
grunt.initConfig({
  log: {
    foo: [1, 2, 3],
    bar: 'hello world',
    baz: false
  }
});

grunt.registerMultiTask('log', 'Log stuff.', function() {
  grunt.log.writeln(this.target + ': ' + this.data);
});
```

See the [creating tasks](Creating-tasks) documentation for more examples of multi tasks.

## Custom tasks
You can go crazy with tasks. If your tasks don't follow the "multi task" structure, use a custom task.

```javascript
grunt.registerTask('default', 'My "default" task description.', function() {
  grunt.log.writeln('Currently running the "default" task.');
});
```

Inside a task, you can run other tasks.

```javascript
grunt.registerTask('foo', 'My "foo" task.', function() {
  // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
  grunt.task.run('bar', 'baz');
  // Or:
  grunt.task.run(['bar', 'baz']);
});
```

Tasks can be asynchronous.

```javascript
grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function() {
  // Force task into async mode and grab a handle to the "done" function.
  var done = this.async();
  // Run some sync stuff.
  grunt.log.writeln('Processing task...');
  // And some async stuff.
  setTimeout(function() {
    grunt.log.writeln('All done!');
    done();
  }, 1000);
});
```

Tasks can access their own name and arguments.

```javascript
grunt.registerTask('foo', 'My "foo" task.', function(a, b) {
  grunt.log.writeln(this.name, a, b);
});

// Usage:
// grunt foo foo:bar
//   logs: "foo", undefined, undefined
//   logs: "foo", "bar", undefined
// grunt foo:bar:baz
//   logs: "foo", "bar", "baz"
```

Tasks can fail if any errors were logged.

```javascript
grunt.registerTask('foo', 'My "foo" task.', function() {
  if (failureOfSomeKind) {
    grunt.log.error('This is an error message.');
  }

  // Fail by returning false if this task had errors
  if (ifErrors) { return false; }

  grunt.log.writeln('This is the success message');
});
```

When tasks fail, all subsequent tasks will be aborted unless `--force` was specified.

```javascript
grunt.registerTask('foo', 'My "foo" task.', function() {
  // Fail synchronously.
  return false;
});

grunt.registerTask('bar', 'My "bar" task.', function() {
  var done = this.async();
  setTimeout(function() {
    // Fail asynchronously.
    done(false);
  }, 1000);
});
```

Tasks can be dependent on the successful execution of other tasks. Note that `grunt.task.requires` won't actually RUN the other task(s). It'll just check to see that it has run and not failed.

```javascript
grunt.registerTask('foo', 'My "foo" task.', function() {
  return false;
});

grunt.registerTask('bar', 'My "bar" task.', function() {
  // Fail task if "foo" task failed or never ran.
  grunt.task.requires('foo');
  // This code executes if the "foo" task ran successfully.
  grunt.log.writeln('Hello, world.');
});

// Usage:
// grunt foo bar
//   doesn't log, because foo failed.
// grunt bar
//   doesn't log, because foo never ran.
```

Tasks can fail if required configuration properties don't exist.

```javascript
grunt.registerTask('foo', 'My "foo" task.', function() {
  // Fail task if "meta.name" config prop is missing.
  grunt.config.requires('meta.name');
  // Also fails if "meta.name" config prop is missing.
  grunt.config.requires(['meta', 'name']);
  // Log... conditionally.
  grunt.log.writeln('This will only log if meta.name is defined in the config.');
});
```

Tasks can access configuration properties.

```javascript
grunt.registerTask('foo', 'My "foo" task.', function() {
  // Log the property value. Returns null if the property is undefined.
  grunt.log.writeln('The meta.name property is: ' + grunt.config('meta.name'));
  // Also logs the property value. Returns null if the property is undefined.
  grunt.log.writeln('The meta.name property is: ' + grunt.config(['meta', 'name']));
});
```

Take a look at the [contrib tasks](https://github.com/gruntjs/) for more examples.

## CLI options / environment
_TODO_
(pull from FAQ, recommend process.env)

## Why doesn't my asynchronous task complete?
Chances are this is happening because you have forgotten to call the [this.async](grunt.task#wiki-this-async) method to tell grunt that your task is asynchronous. For simplicity's sake, grunt uses a synchronous coding style, which can be switched to asynchronous by calling `this.async()` within the task body.

Note that passing `false` to the `done()` function tells grunt that the task has failed.

For example:

```javascript
grunt.registerTask('asyncme', 'My asynchronous task.', function() {
  var done = this.async();
  doSomethingAsync(done);
});
```