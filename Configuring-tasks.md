Task configuration happens in your Gruntfile. If you don't know what a Gruntfile is, see the [[Getting Started]] guide and the [[Sample Gruntfile]].

## Multi tasks
Because most grunt tasks take optional parameters and operate on sets of files, a few conventions have been established to facilitate task configuration. "Multi tasks" registered using the [grunt.registerMultiTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-registerMultiTask) method should follow these conventions.

Most tasks will be multi tasks; if in doubt, see the task or plugin documentation.

### Task configuration
When a multi task is run, grunt looks for a task-named property in the config object passed to the [grunt.initConfig](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-initConfig) method. In the following example, configuration is specified for both a `concat` and `uglify` task.

```js
grunt.initConfig({
  concat: {
    // "concat" task targets and task-level options are specified here.
  },
  uglify: {
    // "uglify" task targets and task-level options are specified here.
  }
});
```

Note that if a task is renamed with the [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask) method, it will look for a property with the _new_ task name in the config object.

### Targets
Multi tasks SOMETHING  
It's often useful for tasks to run using different options for different sets of files.  
Talk about specifying targets explicitly vs implicit iteration over targets  

```js
grunt.initConfig({
  concat: {
    foo: {
      // "foo" target options and files are specified here.
    },
    bar: {
      // "bar" target options and files are specified here.
    }
  }
});
```

### Options
In a multi task, a task-level `options` property may be specified. Task-level options will override built-in task defaults.

In addition, each target may have an `options` property that is specific to that target. Target-level options will override task-level options.

As implied by its name, the `options` object is optional and may be omitted if not needed.

```js
grunt.initConfig({
  concat: {
    options: {
      // Task-level options may be specified here.
    }
    foo: {
      options: {
        // "foo" target options may be specified here.
      }
    },
    bar: {
      // No options specified; this target will use task-level options.
    },
  }
});
```

### Files

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
