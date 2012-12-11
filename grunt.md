Grunt exposes all of its methods and properties on the `grunt` object that gets passed into the `module.exports` function exported in your [Gruntfile](Getting-started) or in your [tasks file](Creating-tasks).

For example, your project's [Gruntfile](Getting-started) might look like this:

```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        browser: true
      },
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    }
  });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  grunt.loadNpmTasks('grunt-sample');

  // Default task.
  grunt.registerTask('default', ['jshint', 'sample']);

};
```

And if you're creating a [grunt plugin](Creating-plugins) or just organizing tasks into a folder, a [custom tasks file](Creating-tasks) might look like this:

```javascript
module.exports = function(grunt) {

  // Create a new task.
  grunt.registerTask('awesome', 'Print out some awesome stuff.', function() {
    grunt.log.write('The ' + this.name + ' task is awesome...').ok();
  });

};
```

But these are just examples. For more information, read on.

## A Very Important Note
Your Gruntfile or tasks file **must** contain this code, once and **only** once. If it doesn't, things won't work. For the sake of brevity, this "wrapper" code has been omitted from all future examples on this page, but it needs to be there. Like in the previous examples.

```javascript
module.exports = function(grunt) {
  // Your grunt code goes in here.
};
```

## Libraries

* [grunt.config](grunt.config) - Access project-specific configuration data defined in the [Gruntfile](Getting-started).
* [grunt.event](grunt.event) - Event emitting via the [EventEmitter2](https://github.com/hij1nx/EventEmitter2) library.
* [grunt.fail](grunt.fail) - For when something goes horribly wrong.
* [grunt.file](grunt.file) - Wildcard expansion, file reading, writing, directory traversing.
* [grunt.log](grunt.log), [grunt.verbose](grunt.log) - Output messages to the console.
* [grunt.task](grunt.task) - Register, run and load external tasks.
* [grunt.template](grunt.template) - Lo-Dash template processing and other template-related methods.
* [grunt.util](grunt.util) - Miscellaneous utilities, including Lo-Dash, Async and Hooker.

## Config
_Note that the method listed below is also available on the [grunt.config](grunt.config) object in addition to the `grunt` object._

<a name="grunt-initConfig"></a>
### grunt.initConfig
Initialize a configuration object for the current project. The specified `configObject` is used by tasks and can be accessed using the [grunt.config](grunt.config) method. Nearly every project's [Gruntfile](Getting-started) will call this method.

Note that any specified `<% %>` [template strings](grunt.template) will only be processed when config data is retrieved via a [grunt.config](grunt.config) method.

```javascript
grunt.initConfig(configObject)
```

This example contains sample config data for the [jshint task](https://github.com/gruntjs/grunt-contrib-jshint):

```javascript
grunt.initConfig({
  jshint: {
    all: ['lib/*.js', 'test/*.js', 'Gruntfile.js']
  }
});
```

See the [configuring grunt](Getting-started) page for more configuration examples.

_This method is an alias for the [grunt.config.init](grunt.config#wiki-grunt-config-init) method._


## Creating Tasks
Tasks are grunt's bread and butter. The stuff you do most often, like `jshint` or `nodeunit`. Every time grunt is run, you specify one or more tasks to run, which tells grunt what you'd like it to do.

If you don't specify a task, but a task named "default" has been defined, that task will run (unsurprisingly) by default.

_Note that the methods listed below are also available on the [grunt.task](grunt.task) object in addition to the `grunt` object._

<a name="grunt-registerTask"></a>
### grunt.registerTask
Register an "alias task" or a task function. This method supports the following two signatures:

**Alias task**

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

**Function task**

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

See the [creating tasks](Creating-tasks) documentation for more examples of tasks and alias tasks.

_This method is an alias for the [grunt.task.registerTask](grunt.task#wiki-grunt-task-registerTask) method._

<a name="grunt-registerMultiTask"></a>
### grunt.registerMultiTask
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

_This method is an alias for the [grunt.task.registerMultiTask](grunt.task#wiki-grunt-task-registerMultiTask) method._

<a name="grunt-registerInitTask"></a>
### grunt.registerInitTask
Register an "init task." An init task is a task that doesn't require any configuration data, and as such will still run even if grunt can't find a [Gruntfile](Getting-started). The [grunt-init task](https://github.com/gruntjs/grunt-init) is an example of an "init task."

```javascript
grunt.registerInitTask(taskName, description, taskFunction)
```

For an init task example, see the [grunt-init task source](https://github.com/gruntjs/grunt-init/blob/master/tasks/init.js).

_This method is an alias for the [grunt.task.registerInitTask](grunt.task#wiki-grunt-task-registerInitTask) method._

<a name="grunt-renameTask"></a>
### grunt.renameTask
Rename a task. This might be useful if you want to override the default behavior of a task, while retaining the old name.

```javascript
grunt.renameTask(oldname, newname)
```

_This method is an alias for the [grunt.task.renameTask](grunt.task#wiki-grunt-task-renameTask) method._

## Inside Tasks
An object is made available as `this` inside each task function that contains a number of useful task-specific properties and methods. This same object is also exposed as `grunt.task.current` for use in [templates](grunt.template).

<a name="this-async"></a>
### this.async / grunt.task.current.async
If a task is asynchronous, this method must be invoked to instruct grunt to wait. It returns a handle to a "done" function that should be called when the task has completed. `false` can be passed to the done function to indicate that the task has failed. If this method isn't invoked, the task executes synchronously.

```javascript
// Tell grunt this task is asynchronous.
var done = this.async();
// Your async code.
setTimeout(function() {
  // Let's simulate an error, sometimes.
  var success = Math.random() > 0.5;
  // All done!
  done(success);
}, 1000);
```

<a name="this-requires"></a>
### this.requires / grunt.task.current.requires
If one task depends on the successful completion of another task (or tasks), this method can be used to force grunt to abort if the other task didn't run, or if the other task failed. The task list can be an array of task names or individual task name arguments.

Note that this won't actually run the specified task(s), it will just fail the current task if they haven't already run successfully.

```javascript
this.requires(taskList)
```

<a name="this-requiresConfig"></a>
### this.requiresConfig / grunt.task.current.requiresConfig
Fail the current task if one or more required [config](grunt.config) properties is missing. One or more string or array config properties may be specified.

```javascript
this.requiresConfig(prop [, prop [, ...]])
```

See the [grunt.config documentation](grunt.config) for more information about config properties.

_This method is an alias for the [grunt.config.requires](grunt.config#wiki-grunt-config-requires) method._

<a name="this-name"></a>
### this.name / grunt.task.current.name
The name of the task, as defined in `grunt.registerTask`. For example, if a "sample" task was run as `grunt sample` or `grunt sample:foo`, inside the task function, `this.name` would be `"sample"`.

<a name="this-nameArgs"></a>
### this.nameArgs / grunt.task.current.nameArgs
The name of the task, as specified with any colon-separated arguments or flags on the command-line. For example, if a "sample" task was run as `grunt sample:foo`, inside the task function, `this.nameArgs` would be `"sample:foo"`.

<a name="this-args"></a>
### this.args / grunt.task.current.args
An array of arguments passed to the task. For example, if a "sample" task was run as `grunt sample:foo:bar`, inside the task function, `this.args` would be `["foo", "bar"]`. Note that in multi tasks, the target is removed from the `this.args` array and is not passed into the task function.

<a name="this-flags"></a>
### this.flags / grunt.task.current.flags
An object generated from the arguments passed to the task. For example, if a "sample" task was run as `grunt sample:foo:bar`, inside the task function, `this.flags` would be `{foo: true, bar: true}`. In a multi task, the target name is not set as a flag.

<a name="this-errorCount"></a>
### this.errorCount / grunt.task.current.errorCount
The number of [grunt.log.error](grunt.log#wiki-grunt-log-error) calls that occurred during this task. This can be used to fail a task if errors occurred during the task.

<a name="this-options"></a>
### this.options / grunt.task.current.options
Returns a task-specific options object. This object contains properties merged from the optional `defaultsObj` argument, which can be overridden by a task-specific `options` property (and for multi tasks, an additional target-specific `options` property) in the config data.

```javascript
this.options([defaultsObj])
```

So for the given Gruntfile:

```javascript
grunt.initConfig({
  ourtask: {
    // Options set on all of this task's targets
    options: {
      separator: ' & '
    },
    target: {
      // Options specific to this target
      options: {
        separator: '|'
      }
      src: ['src/*.js'],
      dest: 'dist/built.js'
    }
  }
});
```

We can access the options within our task with `this.options()`:

```javascript
grunt.registerTask('ourtask', function() {
  var options = this.options({
    // Default options
    punctuation: '.',
    separator: ', '
  });
});
```

`options` would equal the following as the target specific option gets precedence:

```json
{ punctuation: '.',
  separator: '|' }
```

## Inside Multi Tasks

<a name="this-target"></a>
### this.target / grunt.task.current.target
In a multi task, this is the name of the target currently being iterated over. For example, if a "sample" multi task was run as `grunt sample:foo` with the config data `{sample: {foo: "bar"}}`, inside the task function, `this.target` would be `"foo"`.

<a name="this-data"></a>
### this.data / grunt.task.current.data
In a multi task, this is the actual data stored in the grunt config object for the given target. For example, if a "sample" multi task was run as `grunt sample:foo` with the config data `{sample: {foo: "bar"}}`, inside the task function, `this.data` would be `"bar"`.

<a name="this-file"></a>
### this.file / grunt.task.current.file
In a multi task, target data can be stored in three different formats. A relatively basic "compact" format, a much more flexible "full" format and a multiple destination "list" format.

When the compact format is used, that key and value are made available as `this.file.dest` and `this.file.src`, respectively. When the full format is used, the specified `src` and `dest` values are used for `this.file.dest` and `this.file.src`. When the list format is used, the task is ran for each entry in the `files` object with the key and value made available as `this.file.dest` and `this.file.src`.

All formats are normalized to the following example object structure:

```json
{ src: ['src/one.js', 'src/two.js'],
  dest: 'dist/built.js',
  srcRaw: [ 'src/*.js' ] }
```

`this.file.src` is auto expanded with [grunt.file.expand()](grunt.file). `this.file.srcRaw` will contain the raw, unexpanded (but still template processed) source file patterns. `this.file.dest` will be the destination file string.

The following are examples of the mentioned formats:

```javascript
grunt.initConfig({
  concat: {
    // This is the "compact" format.
    'dist/built.js': ['src/file1.js', 'src/file2.js'],
    // This is the "full" format.
    built: {
      src: ['src/file1.js', 'src/file2.js'],
      dest: 'dist/built.js'
    },
    // This is the "list" format.
    // The task is ran once per files entry.
    list: {
      files: {
        'dist/buildOne.js': ['src/one_*.js'],
        'dist/buildTwo.js': ['src/two_*.js'],
        'dist/all.js': ['<%= concat.built.src %>']
      }
    }
  }
});
```

## Loading Externally-Defined Tasks
For most projects, tasks will be defined in the [Gruntfile](Getting-started). For larger projects, or in cases where tasks need to be shared across projects, tasks can be loaded from one or more external directories or Npm-installed grunt plugins.

_Note that the methods listed below are also available on the [grunt.task](grunt.task) object in addition to the `grunt` object._

<a name="grunt-loadTasks"></a>
### grunt.loadTasks
Load task-related files from the specified directory, relative to the [Gruntfile](Getting-started). This method can be used to load task-related files from a local grunt plugin by specifying the path to that plugin's "tasks" subdirectory.

```javascript
grunt.loadTasks(tasksPath)
```

_This method is an alias for the [grunt.task.loadTasks](grunt.task#wiki-grunt-task-loadTasks) method._

<a name="grunt-loadNpmTasks"></a>
### grunt.loadNpmTasks
Load tasks from the specified grunt plugin. This plugin must be installed locally via npm, and must be relative to the [Gruntfile](Getting-started). Grunt plugins can be created by using the [grunt-init gruntplugin template](https://github.com/gruntjs/grunt-init).

```javascript
grunt.loadNpmTasks(pluginName)
```

_This method is an alias for the [grunt.task.loadNpmTasks](grunt.task#wiki-grunt-task-loadNpmTasks) method._


## Warnings and Fatal Errors
If something explodes (or is about to explode) inside a task, it can force grunt to abort. See the [exit codes documentation](Exit-Codes) for a list of all built-in grunt exit codes.

<a name="grunt-warn"></a>
### grunt.warn
Display a warning and abort grunt immediately. Grunt will continue processing tasks if the `--force` command-line option was specified. The `error` argument can be a string message or an error object.

```javascript
grunt.warn(error [, errorcode])
```

If `--debug 9` is specified on the command-line and an error object was specified, a stack trace will be logged.

_This method is an alias for the [grunt.fail.warn](grunt.fail#wiki-grunt-fail-warn) method._

<a name="grunt-fatal"></a>
### grunt.fatal
Display a warning and abort grunt immediately. The `error` argument can be a string message or an error object.

```javascript
grunt.fatal(error [, errorcode])
```

If `--debug 9` is specified on the command-line and an error object was specified, a stack trace will be logged.

_This method is an alias for the [grunt.fail.fatal](grunt.fail#wiki-grunt-fail-fatal) method._


## Command-line Options

<a name="grunt-option"></a>
### grunt.option
Retrieve the value of a command-line option, eg. `debug`. Note that for each command-line option, the inverse can be tested, eg. `no-debug`.

```javascript
grunt.option(optionName)
```

## Miscellaneous

<a name="grunt-package"></a>
### grunt.package
The current grunt `package.json` metadata, as an object.

```javascript
grunt.package
```

<a name="grunt-version"></a>
### grunt.version
The current grunt version, as a string. This is just a shortcut to the `grunt.package.version` property.

```javascript
grunt.version
```