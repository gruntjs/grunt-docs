Register, run and load external tasks.

See the [task lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/task.js) and [task util lib source](https://github.com/gruntjs/grunt/blob/master/lib/util/task.js) for more information.

## The task API
Many utility properties and methods are available inside of tasks via the `this` object. See the [[Inside tasks]] guide for a list of these properties and methods.

Note that any method marked with a ☃ (unicode snowman) is also available directly on the `grunt` object. Just so you know. See the [API main page](grunt) for more usage information.

## Creating Tasks
Tasks are grunt's bread and butter. The stuff you do most often, like `jshint` or `nodeunit`. Every time grunt is run, you specify one more more tasks to run, which tells grunt what you'd like it to do.

If you don't specify a task, but a task named "default" has been defined, that task will run (unsurprisingly) by default.

<a name="grunt-task-registerTask"></a>
### grunt.task.registerTask ☃
Register an "alias task" or a task function. This method supports the following two signatures:

**Alias task**

If a task list is specified, the new task will be an alias for one or more other tasks. Whenever this "alias task" is run, every specified task in `taskList` will be run, in the order specified. The `taskList` argument must be an array of tasks.

```javascript
grunt.task.registerTask(taskName, taskList)
```

This example alias task defines a "default" task whereby the "jshint", "qunit", "concat" and "uglify" tasks are run automatically if grunt is executed without any tasks specified:

```javascript
task.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
```

Task arguments can be specified as well. In this example, the alias "dist" runs both the "concat" and "uglify" tasks, each with the "dist" argument:

```javascript
task.registerTask('dist', ['concat:dist', 'uglify:dist']);
```

**Function task**

If a `description` and `taskFunction` are passed, the specified function will be executed whenever the task is run. In addition, the specified description will be shown when `grunt --help` is run. Task-specific properties and methods are available inside the task function as properties of the `this` object. The task function can return `false` to indicate that the task has failed.

Note that the `grunt.task.registerMultiTask` method, explained below, can be used to define a special type of task known as a "multi task."

```javascript
grunt.task.registerTask(taskName, description, taskFunction)
```

This example task logs `foo, testing 123` if grunt is run via `grunt foo:testing:123`. If the task is run without arguments as `grunt foo` the task logs `foo, no args`.

```javascript
grunt.task.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
  if (arguments.length === 0) {
    grunt.log.writeln(this.name + ", no args");
  } else {
    grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
  }
});
```

See the [creating tasks](Creating-tasks) documentation for more examples of tasks and alias tasks.

_This method is also available as [grunt.registerTask](grunt)._

<a name="grunt-task-registerMultiTask"></a>
### grunt.task.registerMultiTask ☃
Register a "multi task." A multi task is a task that implicitly iterates over all of its named sub-properties (AKA targets) if no target was specified. In addition to the default properties and methods, extra multi task-specific properties are available inside the task function as properties of the `this` object.

Many of the contrib tasks, including the [jshint task](https://github.com/gruntjs/grunt-contrib-jshint), [concat task](https://github.com/gruntjs/grunt-contrib-concat) and [uglify task](https://github.com/gruntjs/grunt-contrib-uglify) are multi tasks.

```javascript
grunt.task.registerMultiTask(taskName, description, taskFunction)
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

grunt.task.registerMultiTask('log', 'Log stuff.', function() {
  grunt.log.writeln(this.target + ': ' + this.data);
});
```

See the [creating tasks](Creating-tasks) documentation for more examples of multi tasks.

_This method is also available as [grunt.registerMultiTask](grunt)._

<a name="grunt-task-renameTask"></a>
### grunt.task.renameTask ☃
Rename a task. This might be useful if you want to override the default behavior of a task, while retaining the old name.

```javascript
grunt.task.renameTask(oldname, newname)
```

_This method is also available as [grunt.renameTask](grunt)._

## Loading Externally-Defined Tasks
For most projects, tasks will be defined in the [Gruntfile](Getting-started). For larger projects, or in cases where tasks need to be shared across projects, tasks can be loaded from one or more external directories or Npm-installed grunt plugins.

<a name="grunt-task-loadTasks"></a>
### grunt.task.loadTasks ☃
Load task-related files from the specified directory, relative to the [Gruntfile](Getting-started). This method can be used to load task-related files from a local grunt plugin by specifying the path to that plugin's "tasks" subdirectory.

```javascript
grunt.task.loadTasks(tasksPath)
```

_This method is also available as [grunt.loadTasks](grunt)._

<a name="grunt-task-loadNpmTasks"></a>
### grunt.task.loadNpmTasks ☃
Load tasks from the specified grunt plugin. This plugin must be installed locally via npm, and must be relative to the [Gruntfile](Getting-started). Grunt plugins can be created by using the [grunt-init gruntplugin template](https://github.com/gruntjs/grunt-init): `grunt init:gruntplugin`.

```javascript
grunt.task.loadNpmTasks(pluginName)
```

_This method is also available as [grunt.loadNpmTasks](grunt)._


## Queueing Tasks
Grunt automatically enqueues and runs all tasks specified on the command line, but individual tasks can enqueue additional tasks to be run.

<a name="grunt-task-run"></a>
### grunt.task.run
Enqueue one or more tasks. Every specified task in `taskList` will be run immediately after the current task completes, in the order specified. The task list can be an array of tasks or individual task arguments.

```javascript
grunt.task.run(taskList)
```

<a name="grunt-task-clearQueue"></a>
### grunt.task.clearQueue
Empty the task queue completely. Unless additional tasks are enqueued, no more tasks will be run.

```javascript
grunt.task.clearQueue()
```

<a name="grunt-task-normalizeMultiTaskFiles"></a>
### grunt.task.normalizeMultiTaskFiles
Normalizes a task target configuration object into an array of src-dest file mappings. This method is used internally by the multi task system [this.files / grunt.task.current.files](grunt.task#wiki-this-files) property.

```javascript
grunt.task.normalizeMultiTaskFiles(data [, targetname])
```
