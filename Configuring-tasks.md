Task configuration happens inside a Gruntfile. If you don't know what a Gruntfile is, see the [[Getting Started]] guide and the [[Sample Gruntfile]].

## Will this guide help me?
Because most grunt tasks take optional parameters and operate on sets of files, a few conventions have been established to facilitate task configuration. **Multi tasks** registered using the [grunt.registerMultiTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-registerMultiTask) method should follow these conventions.

_Most tasks are multi tasks, so you'll probably find this guide useful._

That being said, it's possible that a task will be written in a fundamentally different way, in which case please see the documentation for that task or plugin.

## Tasks and Targets
When a multi task is run, grunt looks for a task-named property in the config object passed to the [grunt.initConfig](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-initConfig) method.

This task-named property is an object which must contain at least one **target**. The target name is completely arbitrary, and may be used to run an individual task's target. If a task is run without a specific target, grunt will iterate over _all_ targets, running each in-turn.

In the following example, configuration is specified for both a concat and uglify task. The concat task has foo and bar targets, and the uglify task has a single foo target. Running `grunt concat:foo` or `grunt concat:bar` will run just those targets, while running `grunt concat` will run all targets.

```js
grunt.initConfig({
  concat: {
    foo: {
      // concat task "foo" target options and files go here.
    },
    bar: {
      // concat task "bar" target options and files go here.
    },
  },
  uglify: {
    foo: {
      // uglify task "foo" target options and files go here.
    },
  },
});
```

Note that if a task has been renamed with the [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask) method, grunt will look for a property with the _new_ task name in the config object.

## Options
Inside a task-named object, a task-level `options` property may be specified. Task-level options will override built-in task defaults. In addition, each target may have an `options` property that is specific to that target. Target-level options will override task-level options.

The `options` object is optional and may be omitted if not needed.

```js
grunt.initConfig({
  concat: {
    options: {
      // Task-level options may go here, overriding task defaults.
    },
    foo: {
      options: {
        // "foo" target options may go here, overriding task-level options.
      },
    },
    bar: {
      // No options specified; this target will use task-level options.
    },
  },
});
```

## Files
Each multi task target may have one or more **src-dest** (source-destination) filepath mappings specified. The following formats are acceptible and will automatically be normalized into a format the task can process.

Regardless of the format, both src and dest may contain [[template strings]]. Additionally, please specify filepaths in the unix style, using `/` as a path separator, instead of `\`.

The **compact** file format allows for a single src-dest mapping per-target. It is most commonly used where a read-only task—like the [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) plugin `jshint` task—requires a single `src` property, or in other tasks where src-dest mappings aren't relevant.

```js
grunt.initConfig({
  concat: {
    foo: {
      src: ['src/aa.js', 'src/aaa.js'],
      dest: 'dest/a.js',
    },
    bar: {
      src: ['src/bb.js', 'src/bbb.js'],
      dest: 'dest/b.js',
    },
  },
});
```

The **files object** format supports multiple src-dest mappings per-target, where the property name is the dest, and its value is the src. Any number of src-dest mappings may be specified in this way.

```js
grunt.initConfig({
  concat: {
    foo: {
      files: {
        'dest/a.js': ['src/aa.js', 'src/aaa.js'],
        'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
      },
    },
    bar: {
      files: {
        'dest/b.js': ['src/bb.js', 'src/bbb.js'],
        'dest/b1.js': ['src/bb1.js', 'src/bbb1.js'],
      },
    },
  },
});
```

The **files array** format also supports multiple src-dest mappings per-target, but allows for extra per-mapping properties, in cases where a task might utilize them. Each src-dest mapping is a separate object in the files array.

```js
grunt.initConfig({
  concat: {
    foo: {
      files: [
        {src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
        {src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'},
      ],
    },
    bar: {
      files: [
        {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', flatten: true},
        {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', flatten: false},
      ],
    },
  },
});
```

### Older formats
The **dest-as-target** file format is a holdover from before multi tasks and targets existed, where the destination filepath is actually the target name. Unfortunately, because target names are filepaths, running `grunt task:target` can be awkward. Also, you can't specify target-level options.

Consider this format deprecated, and avoid it where possible.

```js
grunt.initConfig({
  concat: {
    'dest/a.js': ['src/aa.js', 'src/aaa.js'],
    'dest/b.js': ['src/bb.js', 'src/bbb.js'],
  },
});
```

### Globbing patterns
It is often impractical to specify all source filepaths individually, so grunt supports filename expansion (also know as globbing) via the built-in [node-glob][] library.

[node-glob]: https://github.com/isaacs/node-glob

While this isn't be a comprehensive tutorial on globbing patterns, know that in a filepath:

* `*` matches any number of characters, but not `/`
* `?` matches a single character, but not `/`
* `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
* `{}` allows for a comma-separated list of "or" expressions
* `!` at the beginning of a pattern will negate the match

Typically, all you need to know is that `foo/*.js` will match all files ending with `.js` in the `foo/` subdirectory, but `foo/**/*.js` will match all files ending with `.js` in the `foo/` subdirectory _and all of its subdirectories_.

For more examples, see the [node-glob documentation][node-glob].

In order to simplify otherwise complicated globbing patterns, grunt allows arrays of file paths or globbing patterns to be specified. Patterns are processed in-order, with `!`-prefixed matches excluding matched files from the result set. The result set is uniqued.

A few examples:

```js
// This single node-glob pattern:
{src: 'foo/{a,b}*.js', dest: ...}
// Could also be written like this:
{src: ['foo/a*.js', 'foo/b*.js'], dest: ...}

// This will return files in alphabetical order:
{src: ['foo/*.js'], dest: ...}
// This will return zed.js first, followed by all other files (in alpha order):
{src: ['foo/zed.js', 'foo/*.js'], dest: ...}

// This will return all files in alphabetical order, except for zed.js:
{src: ['foo/*.js', '!foo/zed.js'], dest: ...}
// But this won't, because the exclusion is happening too early:
{src: ['!foo/zed.js', 'foo/*.js'], dest: ...}

// Also, templates may be used in filepaths or glob patterns:
{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.js'}
```

### Building the files object dynamically
https://github.com/gruntjs/grunt/issues/450

In target3, the files object shows how a single target can specify multiple file/destination pairs.  This is useful for programmatically generating a list of src/dest pairs.  In the example below, a folder of coffeescript files are mapped to a destination javascript file.

```js
coffee: {
  compile: {
    files: grunt.file.expandMapping(['path/to/*.coffee'],'path/to/dest/',{
      rename: function(destBase,destPath) {
        return destBase+destPath.replace(/\.coffee$/,".js");
      }
    })
  }
}
```
