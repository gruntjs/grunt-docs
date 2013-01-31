## Inside Tasks
An object is made available as `this` inside each task function that contains a number of useful task-specific properties and methods. This same object is also exposed as `grunt.task.current` for use in [templates](grunt.template).

<a name="this-async"></a>
### this.async / grunt.task.current.async
If a task is asynchronous, this method must be invoked to instruct grunt to wait. It returns a handle to a "done" function that should be called when the task has completed. Either `false` or an `Error` object may be passed to the done function to indicate that the task has failed.

If the `this.async` method isn't invoked, the task will execute synchronously.

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
If one task depends on the successful completion of another task (or tasks), this method can be used to force grunt to abort if the other task didn't run, or if the other task failed. The tasks list can be an array of task names or individual task names, as arguments.

Note that this won't actually run the specified task(s), it will just fail the current task if they haven't already run successfully.

```javascript
this.requires(tasksList)
```

<a name="this-requiresConfig"></a>
### this.requiresConfig / grunt.task.current.requiresConfig
Fail the current task if one or more required [config](grunt.config) properties is missing. One or more string or array config properties may be specified.

```javascript
this.requiresConfig(prop [, prop [, ...]])
```

See the [grunt.config documentation](grunt.config) for more information about config properties.

_This method is an alias for the [grunt.config.requires](grunt.config) method._

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
An object generated from the arguments passed to the task. For example, if a "sample" task was run as `grunt sample:foo:bar`, inside the task function, `this.flags` would be `{foo: true, bar: true}`.

Note that inside multi tasks, the target name is _not_ set as a flag.

<a name="this-errorCount"></a>
### this.errorCount / grunt.task.current.errorCount
The number of [grunt.log.error](grunt.log) calls that occurred during this task. This can be used to fail a task if errors occurred during the task.

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

```js
{
  punctuation: '.',
  separator: '|'
}
```

## Inside Multi Tasks

<a name="this-target"></a>
### this.target / grunt.task.current.target
In a multi task, this is the name of the target currently being iterated over. For example, if a "sample" multi task was run as `grunt sample:foo` with the config data `{sample: {foo: "bar"}}`, inside the task function, `this.target` would be `"foo"`.

<a name="this-file"></a>
### this.file / grunt.task.current.file
In a multi task, target data can be stored in three different formats. A relatively basic "compact" format, a much more flexible "full" format and a multiple destination "list" format.

When the compact format is used, that key and value are made available as `this.file.dest` and `this.file.src`, respectively. When the full format is used, the specified `src` and `dest` values are used for `this.file.dest` and `this.file.src`. When the list format is used, the task is ran for each entry in the `files` object with the key and value made available as `this.file.dest` and `this.file.src`.

All formats are normalized to the following example object structure:

```js
{
  src: ['src/one.js', 'src/two.js', 'src/three.js'],
  dest: 'dist/built.js',
  srcRaw: [ 'src/*.js' ]
}
```

`this.file.src` is auto expanded with [grunt.file.expand()](grunt.file). `this.file.srcRaw` will contain the raw, unexpanded (but still template processed) source file patterns. Both `this.file.src` and `this.file.srcRaw` values will always be flattened arrays. `this.file.dest` will be the destination file string.

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

<a name="this-data"></a>
### this.data / grunt.task.current.data
In a multi task, this is the actual data stored in the grunt config object for the given target. For example, if a "sample" multi task was run as `grunt sample:foo` with the config data `{sample: {foo: "bar"}}`, inside the task function, `this.data` would be `"bar"`.

It is recommended that `this.file` and `this.options` are use instead of `this.data`, as their values are normalized.
