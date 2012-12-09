Tasks are grunt's bread and butter. The stuff you do most often, like `jshint` or `nodeunit`. Every time grunt is run, you specify one or more tasks to run, which tells grunt what you'd like it to do.

If you don't specify a task, but a task named "default" has been defined, that task will run (unsurprisingly) by default.

## Alias Tasks
If a task list is specified, the new task will be an alias for one or more other tasks. Whenever this "alias task" is run, every specified task in `taskList` will be run, in the order specified. The `taskList` argument must be an array of tasks.

```javascript
grunt.registerTask(taskName, taskList)
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

## Init Tasks
Register an "init task." An init task is a task that doesn't require any configuration data, and as such will still run even if grunt can't find a [Gruntfile](Getting-started). The [grunt-init task](https://github.com/gruntjs/grunt-init) is an example of an "init task."

```javascript
grunt.registerInitTask(taskName, description, taskFunction)
```

For an init task example, see the [grunt-init task source](https://github.com/gruntjs/grunt-init/blob/master/tasks/init.js).

## Testing Tasks
_TODO_

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
