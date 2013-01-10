This guide explains how to configure tasks for your project using a Gruntfile.  If you don't know what a Gruntfile is, please read the [[Getting Started]] guide and check out a [[Sample Gruntfile]].

## Task Configuration & Targets
When a task is run, grunt looks for its configuration in the [Gruntfile](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-initConfig) under a property of the same name.  Multi-tasks can have multiple configurations, defined using arbitrarily named "targets."  In the example below, the `concat` task has `foo` and `bar` targets, while the `uglify` task only configures a `bar` target.

```js
grunt.initConfig({
  concat: {
    foo: {
      // concat task "foo" target options and files go here.
    },
    bar: {
      // concat task "bar" target options and files go here.
    }
  },
  uglify: {
    bar: {
      // uglify task "bar" target options and files go here.
    }
  }
});
```
Specifying both a task and target like `grunt concat:foo` or `grunt concat:bar` will process just the specified target's configuration, while running `grunt concat` will iterate over _all_ targets, processing each in turn.  Note that if a task has been renamed with [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask), grunt will look for a property with the _new_ task name in the config object.

## Options
Inside a task configuration, an `options` property may be specified to override built-in defaults.  In addition, each target may have an `options` property which is specific to that target.  Target-level options will override task-level options.

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
Because most tasks perform file operations, Grunt has powerful abstractions for declaring on which files the task should operate. There are several ways to define **src-dest** (source-destination) file mappings, offering varying degrees of verbosity and control. Any multi task will understand all the following formats, so choose whichever format best meets your needs.

All files formats support `src` and `dest` but the "Compact" and "Files Array" formats support a few additional properties:

* `filter` Either a valid [fs.Stats method name](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) or a function that is passed the matched `src` filepath and returns `true` or `false`.
* `nonull` Retain `src` patterns even if they fail to match files.
* `expand` Process a dynamic src-dest file mapping, see "Building the files object dynamically" for more information.
* Other properties will be passed into [node-glob][] as matching options.

### Compact Format
This form allows a single **src-dest** (source-destination) mapping per-target. It is most commonly used for read-only tasks, like [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint), where a single `src` property is needed, and no `dest` key is relevant.

```js
grunt.initConfig({
  jshint: {
    foo: {
      src: ['src/aa.js', 'src/aaa.js']
    },
  },
  concat: {
    bar: {
      src: ['src/bb.js', 'src/bbb.js'],
      dest: 'dest/b.js',
    },
  }
});
```

### Files Object Format
This form supports multiple src-dest mappings per-target, where the property name is the destination file, and its value is the source file(s). Any number of src-dest mappings may be specified in this way.

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

### Files Array Format
This form supports multiple src-dest mappings per-target, while also allowing extra properties for each src-dest mapping.

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
        {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
        {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'},
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

While this isn't a comprehensive tutorial on globbing patterns, know that in a filepath:

* `*` matches any number of characters, but not `/`
* `?` matches a single character, but not `/`
* `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
* `{}` allows for a comma-separated list of "or" expressions
* `!` at the beginning of a pattern will negate the match

All most people need to know is that `foo/*.js` will match all files ending with `.js` in the `foo/` subdirectory, but `foo/**/*.js` will match all files ending with `.js` in the `foo/` subdirectory _and all of its subdirectories_.

Also, in order to simplify otherwise complicated globbing patterns, grunt allows arrays of file paths or globbing patterns to be specified. Patterns are processed in-order, with `!`-prefixed matches excluding matched files from the result set. The result set is uniqued.

For example:

```js
// You can specify single files:
{src: 'foo/this.js', dest: ...}
// Or arrays of files:
{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: ...}
// Or you can generalize with a glob pattern:
{src: 'foo/th*.js', dest: ...}

// This single node-glob pattern:
{src: 'foo/{a,b}*.js', dest: ...}
// Could also be written like this:
{src: ['foo/a*.js', 'foo/b*.js'], dest: ...}

// All .js files, in foo/, in alpha order:
{src: ['foo/*.js'], dest: ...}
// Here, bar.js is first, followed by the remaining files, in alpha order:
{src: ['foo/bar.js', 'foo/*.js'], dest: ...}

// All files except for bar.js, in alpha order:
{src: ['foo/*.js', '!foo/bar.js'], dest: ...}
// All files in alpha order, but with bar.js at the end.
{src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: ...}

// Templates may be used in filepaths or glob patterns:
{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
// But they may also reference file lists defined elsewhere in the config:
{src: ['foo/*.js', '<%= jshint.all.src %>'], dest: ...}
```

For more on glob pattern syntax, see the [node-glob documentation][node-glob].

### Building the files object dynamically
When many static src-dest mappings must be specified for a one-to-one process like copying, compiling or minifying files, a few additional properties may be used to build src-dest file mappings dynamically.

* `expand` set to `true` to enable the following options
* `cwd` All `src` matches are relative to (but don't include) this path
* `src` Pattern(s) to match, relative to the `cwd`
* `dest` Destination path prefix
* `ext` Replace any existing extension with this value in generated `dest` paths
* `flatten` Remove all path parts from generated `dest` paths
* `rename` This function is called for each matched `src` file, post-ext/-flatten. The `dest` and matched `src` path are passed in, and this function must return a new `dest` value.

In the following example, the `minify` task will see the same list of src-dest file mappings for both the `static_mappings` and `dynamic_mappings` targets, because grunt will automatically expand the `dynamic_mappings` files object into 4 individual static file objects (assuming 4 files are found) when the task runs.

Any combination of static src-dest and dynamic src-dest file mappings may be specified, and templates may be used.

```js
grunt.initConfig({
  minify: {
    static_mappings: {
      // Because these src-dest file mappings are manually specified, every
      // time a new file is added or removed, the Gruntfile has to be updated.
      files: [
        {src: 'lib/a.js', dest: 'build/a.min.js'},
        {src: 'lib/b.js', dest: 'build/b.min.js'},
        {src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
        {src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'},
      ],
    },
    dynamic_mappings: {
      // Grunt will search for "**/?.js" under "lib/" when the "minify" task
      // runs and build the appropriate src-dest file mappings then, so you
      // don't need to update the Gruntfile when files are added or removed.
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'lib/'       // Src matches are relative to this path.
          src: ['**/?.js'], // Actual pattern(s) to match.
          dest: 'build/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
        },
      ],
    },
  },
});
```
