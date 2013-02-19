While a task is running, Grunt exposes many task-specific utility properties and methods inside the task function via the `this` object. This same object is also exposed as `grunt.task.current` for use in [templates](grunt.template), eg. the property `this.name` is also available as `grunt.task.current.name`.

## Inside All Tasks

### this.async
If a task is asynchronous, this method must be invoked to instruct Grunt to wait. It returns a handle to a "done" function that should be called when the task has completed. Either `false` or an `Error` object may be passed to the done function to instruct Grunt that the task has failed.

If the `this.async` method isn't invoked, the task will execute synchronously.

```javascript
// Tell Grunt this task is asynchronous.
var done = this.async();
// Your async code.
setTimeout(function() {
  // Let's simulate an error, sometimes.
  var success = Math.random() > 0.5;
  // All done!
  done(success);
}, 1000);
```

### this.requires
If one task depends on the successful completion of another task (or tasks), this method can be used to force Grunt to abort if the other task didn't run, or if the other task failed. The tasks list can be an array of task names or individual task names, as arguments.

Note that this won't actually run the specified task(s), it will just fail the current task if they haven't already run successfully.

```javascript
this.requires(tasksList)
```

### this.requiresConfig
Fail the current task if one or more required [config](grunt.config) properties is missing. One or more string or array config properties may be specified.

```javascript
this.requiresConfig(prop [, prop [, ...]])
```

See the [grunt.config documentation](grunt.config) for more information about config properties.

_This method is an alias for the [grunt.config.requires](grunt.config#grunt.config.requires) method._

### this.name
The name of the task, as defined in `grunt.registerTask`. For example, if a "sample" task was run as `grunt sample` or `grunt sample:foo`, inside the task function, `this.name` would be `"sample"`.

_Note that if a task has been renamed with [grunt.task.renameTask](grunt.task#grunt.task.renameTask) this property will reflect the new name._


### this.nameArgs
The name of the task, as specified with any colon-separated arguments or flags on the command-line. For example, if a "sample" task was run as `grunt sample:foo`, inside the task function, `this.nameArgs` would be `"sample:foo"`.

_Note that if a task has been renamed with [grunt.task.renameTask](grunt.task#grunt.task.renameTask) this property will reflect the new name._

### this.args
An array of arguments passed to the task. For example, if a "sample" task was run as `grunt sample:foo:bar`, inside the task function, `this.args` would be `["foo", "bar"]`.

_Note that in multi tasks, the target is removed from the `this.args` array and is not passed into the task function._

### this.flags
An object generated from the arguments passed to the task. For example, if a "sample" task was run as `grunt sample:foo:bar`, inside the task function, `this.flags` would be `{foo: true, bar: true}`.

_Note that inside multi tasks, the target name is _not_ set as a flag._

### this.errorCount
The number of [grunt.log.error](grunt.log#grunt.log.error) calls that occurred during this task. This can be used to fail a task if errors occurred during the task.

### this.options
Returns an options object. Properties of the optional `defaultsObj` argument will be overridden by any task-level `options` object properties, which will be further overridden in multi tasks by any target-level `options` object properties.

The [Configuring tasks](/configuring-tasks#options) guide shows an example of how options may be specified.

```js
this.options([defaultsObj])
```

This example shows how a task might use `this.options`:

```js
var options = this.options({
  enabled: false,
});

doSomething(options.enabled);
```

## Inside Multi Tasks

### this.target
In a multi task, this property contains the name of the target currently being iterated over. For example, if a "sample" multi task was run as `grunt sample:foo` with the config data `{sample: {foo: "bar"}}`, inside the task function, `this.target` would be `"foo"`.

### this.files
In a multi task, any number of files specified using any of the [file formats](/configuring-tasks#files) are automatically normalized by Grunt into the [Files Array file format](/configuring-tasks#files-array-format). It will always be an array of objects, where each object contains a `dest` property (`String` or `undefined`) and a `src` property (`Array` of `String`).

This example shows how a simple "concat" task might use `this.files`:

```js
this.files.filter(function(f) {
  var contents = f.src.filter(function(filepath) {
    // Remove nonexistent files (it's up to you to filter or warn here).
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  }).map(function(filepath) {
    // Read and return the file's source.
    return grunt.file.read(filepath);
  }).join('\n');
  // Write joined contents to destination filepath.
  grunt.file.write(f.dest, contents);
  // Print a success message.
  grunt.log.writeln('File "' + f.dest + '" created.');
});
```

_If you need the original file object properties, they are available on each individual file object under the `orig` property. Because grunt does all the hard work for you, the use-case for this property is unclear._

### this.filesSrc
In a multi task, all `src` files files specified using any of the [file formats](/configuring-tasks#files) are reduced to a single array. If your task is "read only" and doesn't care about destination filepaths, you can use this array instead of `this.files`.

This example shows how a simple "lint" task might use `this.filesSrc`:

```js
// Lint specified files.
var files = this.filesSrc;
var errorCount = 0;
files.forEach(function(filepath) {
  if (!lint(grunt.file.read(filepath))) {
    errorCount++;
  }
});

// Fail task if errors were logged.
if (errorCount > 0) { return false; }

// Otherwise, print a success message.
grunt.log.ok('Files lint free: ' + files.length);
```

### this.data
In a multi task, this is the actual data stored in the grunt config object for the given target. For example, if a "sample" multi task was run as `grunt sample:foo` with the config data `{sample: {foo: "bar"}}`, inside the task function, `this.data` would be `"bar"`.

_It is recommended that `this.options` `this.files` and `this.filesSrc` are used instead of `this.data`, as their values are normalized._
