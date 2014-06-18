Register, run and load external tasks.

See the [task lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/task.js) and [task util lib source](https://github.com/gruntjs/grunt/blob/master/lib/util/task.js) for more information.

## The task API
While a task is running, Grunt exposes many task-specific utility properties and methods inside the task function via the `this` object. See the [[Inside tasks]] guide for a list of these properties and methods.

Many utility properties and methods are available inside of tasks via the `this` object. 

Note that any method marked with a ☃ (unicode snowman) is also available directly on the `grunt` object. Just so you know. See the [API main page](grunt) for more usage information.

## Creating Tasks

### grunt.task.registerTask ☃
Register an "alias task" or a task function. This method supports the following two signatures:

**Alias task**

If a task list is specified, the new task will be an alias for one or more other tasks. Whenever this "alias task" is run, every specified task in `taskList` will be run, in the order specified. The `taskList` argument must be an array of tasks.

```javascript
grunt.task.registerTask(taskName, taskList)
```

This example alias task defines a "default" task whereby the "jshint", "qunit", "concat" and "uglify" tasks are run automatically if Grunt is executed without any tasks specified:

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

This example task logs `foo, testing 123` if Grunt is run via `grunt foo:testing:123`. If the task is run without arguments as `grunt foo` the task logs `foo, no args`.

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

### grunt.task.registerMultiTask ☃
Register a "multi task." A multi task is a task that implicitly iterates over all of its named sub-properties (AKA targets) if no target was specified. In addition to the default properties and methods, extra multi task-specific properties are available inside the task function as properties of the `this` object.

Many of the contrib tasks, including the [jshint task](https://github.com/gruntjs/grunt-contrib-jshint), [concat task](https://github.com/gruntjs/grunt-contrib-concat) and [uglify task](https://github.com/gruntjs/grunt-contrib-uglify) are multi tasks.

```javascript
grunt.task.registerMultiTask(taskName, description, taskFunction)
```

Given the specified configuration, this example multi task would log `foo: 1,2,3` if Grunt was run via `grunt log:foo`, or it would log `bar: hello world` if Grunt was run via `grunt log:bar`. If Grunt was run as `grunt log` however, it would log `foo: 1,2,3` then `bar: hello world` then `baz: false`.

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

### grunt.task.requires

Fail the task if some other task failed or never ran.

```javascript
grunt.task.requires(taskName);
```

### grunt.task.exists
*Added in 0.4.5*

Check with the name, if a task exists in the registered tasks. Return a boolean.

```javascript
grunt.task.exists(name)
```

### grunt.task.renameTask ☃
Rename a task. This might be useful if you want to override the default behavior of a task, while retaining the old name.

_Note that if a task has been renamed, the [this.name](inside-tasks#this.name) and [this.nameArgs](inside-tasks#this.nameArgs) properties will change accordingly._

```javascript
grunt.task.renameTask(oldname, newname)
```

_This method is also available as [grunt.renameTask](grunt)._

## Loading Externally-Defined Tasks
For most projects, tasks will be defined in the [Gruntfile](Getting-started). For larger projects, or in cases where tasks need to be shared across projects, tasks can be loaded from one or more external directories or Npm-installed Grunt plugins.

### grunt.task.loadTasks ☃
Load task-related files from the specified directory, relative to the [Gruntfile](Getting-started). This method can be used to load task-related files from a local Grunt plugin by specifying the path to that plugin's "tasks" subdirectory.

```javascript
grunt.task.loadTasks(tasksPath)
```

_This method is also available as [grunt.loadTasks](grunt)._

### grunt.task.loadNpmTasks ☃
Load tasks from the specified Grunt plugin. This plugin must be installed locally via npm, and must be relative to the [Gruntfile](Getting-started). Grunt plugins can be created by using the [grunt-init gruntplugin template](https://github.com/gruntjs/grunt-init): `grunt init:gruntplugin`.

```javascript
grunt.task.loadNpmTasks(pluginName)
```

_This method is also available as [grunt.loadNpmTasks](grunt)._


## Queueing Tasks
Grunt automatically enqueues and runs all tasks specified on the command line, but individual tasks can enqueue additional tasks to be run.

### grunt.task.run
Enqueue one or more tasks. Every specified task in `taskList` will be run immediately after the current task completes, in the order specified. The task list can be an array of tasks or individual task arguments.

```javascript
grunt.task.run(taskList)
```

### grunt.task.clearQueue
Empty the task queue completely. Unless additional tasks are enqueued, no more tasks will be run.

```javascript
grunt.task.clearQueue()
```

### grunt.task.normalizeMultiTaskFiles
Normalizes a task target configuration object into an array of src-dest file mappings. This method is used internally by the multi task system [this.files / grunt.task.current.files](grunt.task#wiki-this-files) property.

```javascript
grunt.task.normalizeMultiTaskFiles(data [, targetname])
```
