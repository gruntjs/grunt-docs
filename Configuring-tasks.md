Task configuration happens inside a Gruntfile. If you don't know what a Gruntfile is, see the [[Getting Started]] guide and the [[Sample Gruntfile]].

## Multi tasks
Because most grunt tasks take optional parameters and operate on sets of files, a few conventions have been established to facilitate task configuration. "Multi tasks" registered using the [grunt.registerMultiTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-registerMultiTask) method should follow these conventions.

Most tasks will be multi tasks; if in doubt, see the task or plugin documentation.

### Task configuration
When a multi task is run, grunt looks for a task-named property in the config object passed to the [grunt.initConfig](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-initConfig) method. In the following example, configuration is specified for both a `concat` and `uglify` task.

```js
grunt.initConfig({
  concat: {
    // "concat" task targets and task-level options go here.
  },
  uglify: {
    // "uglify" task targets and task-level options go here.
  }
});
```

Note that if a task is renamed with the [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask) method, grunt will look for a property with the _new_ task name in the config object.

### Targets
Multi tasks SOMETHING  
It's often useful for tasks to run using different options for different sets of files.  
Talk about specifying targets explicitly vs implicit iteration over targets  
Target names are completely arbitrary  

```js
grunt.initConfig({
  concat: {
    foo: {
      // "foo" target options and files go here.
    },
    bar: {
      // "bar" target options and files go here.
    }
  }
});
```

### Options
Inside a multi task configuration object, a task-level `options` property may be specified. Task-level options will override built-in task defaults. In addition, each target may have an `options` property that is specific to that target. Target-level options will override task-level options.

The `options` object is optional and may be omitted if not needed.

```js
grunt.initConfig({
  concat: {
    options: {
      // Task-level options may go here, overriding task defaults.
    }
    foo: {
      options: {
        // "foo" target options may go here, overriding task-level options.
      }
    },
    bar: {
      // No options specified; this target will use task-level options.
    },
  }
});
```

### Files
Each multi task target configuration may have one or more files specified. A few formats are acceptible.

The "compact" format is a holdover from before multi tasks and targets existed. At that time, you could just have a config like this, but it wasn't really possible to just process a subset of task files. The destination filepath is actually the target name.

Pros:
* Very concise.

Cons:
* Target names are filepaths which can be awkward, especially if paths contain templates or spaces.
* Can't specify target-level options.

```js
grunt.initConfig({
  foo: {
    'dest/a.js': ['src/aa.js', 'src/aaa.js'],
    'dest/b.js': ['src/bb.js', 'src/bbb.js'],
  },
});
```

**TODO: MORE DOCS**


Grunt provides several ways of declaring your files.  Each target in the following example of a configuration for the [grunt-contrib-concat plugin](/gruntjs/grunt-contrib-concat) is functionally equivalent. 
```js
grunt.initConfig({
  concat: {
    target1: {
      src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
      dest: 'dist/built.js'
    },
    target2: {
      'dist/built.js': ['src/intro.js', 'src/project.js', 'src/outro.js']
    },
    target3: {
      files: {
        'dist/built.js': ['src/intro.js', 'src/project.js', 'src/outro.js']
      }
    }
  }
});
```

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



#### File globbing
- How node-glob works
- How arrays of globs can negate stuff
- Some examples

#### Building the files object dynamically
https://github.com/gruntjs/grunt/issues/450

## Non-multi tasks
