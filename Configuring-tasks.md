This guide explains how to configure tasks for your project using a Gruntfile.  If you don't know what a Gruntfile is, please read the [[Getting Started]] guide and check out a [[Sample Gruntfile]].

## Regular Tasks vs Multi-Tasks 
Explain this here.

## Task Configuration & Targets
When running a task, its configuration is found in your [Gruntfile](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-initConfig) under a property of the same name.  Multi-tasks can have multiple configurations, defined using arbitrarily named "targets".  In the example below, both `concat` and `uglify` tasks have been configured using targets.

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
    foo: {
      // uglify task "foo" target options and files go here.
    }
  }
});
```
Running `grunt concat:foo` or `grunt concat:bar` will process an individual target's configuration, while running `grunt concat` will iterate over _all_ targets, executing each in the order they were defined.  Note that if a task has been renamed with [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask), grunt will look for a property with the _new_ task name in the config object.

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
Because the vast majority of tasks perform some kind of file operation, Grunt has powerful abstractions for selecting the files you wish to work with.

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
// You can specify individual files:
{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: ...}
// Or you can generalize with a glob pattern:
{src: ['foo/t*.js'], dest: ...}

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

For more on glob pattern syntax, see the [node-glob documentation][node-glob].

### Building the files object dynamically
When many related src-dest mapping must be specified for a one-to-one process like copying files, the [grunt.file.expandMapping](https://github.com/gruntjs/grunt/wiki/grunt.file#wiki-grunt-file-expandMapping) method may be used to build the `files` object dynamically.

In this example, assuming all four src files exist, the following copy task foo and bar `files` objects will be equivalent:

```js
grunt.initConfig({
  copy: {
    foo: {
      files: {
        'dest/a.js': 'src/a.js',
        'dest/b.js': 'src/b.js',
        'dest/subdir/c.js': 'src/subdir/c.js',
        'dest/subdir/d.js': 'src/subdir/d.js',
      },
    },
    bar: {
      files: grunt.file.expandMapping(['**/*.js'], 'dest', {cwd: 'src'}),
    },
  },
});
```

In addition, templates may be used to generate dynamic filenames. In this example, assuming all four src files exist, the following copy task foo and bar `files` objects will be equivalent. Because [[template strings]] are expanded when read by a task, destination filepaths can be dynamically updated by changing the `stuff.dest` and ``stuff.ext` properties.

```js
grunt.initConfig({
  stuff: {
    dest: 'foo/',
    ext: '.bar',
  },
  copy: {
    foo: {
      files: {
        '<%= stuff.dest %>a<%= stuff.ext %>': 'src/a.js',
        '<%= stuff.dest %>b<%= stuff.ext %>': 'src/b.js',
        '<%= stuff.dest %>subdir/c<%= stuff.ext %>': 'src/subdir/c.js',
        '<%= stuff.dest %>subdir/d<%= stuff.ext %>': 'src/subdir/d.js'
      },
    },
    bar: {
      files: grunt.file.expandMapping('**/*.js', '<%= stuff.dest %>', {
        cwd: 'src',
        rename: function(destBase, destPath) {
          return destBase + destPath.replace(/\.js$/, '<%= stuff.ext %>');
        }
      })
    },
  },
});
```