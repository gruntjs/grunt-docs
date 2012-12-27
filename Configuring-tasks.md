Task configuration happens in your Gruntfile. If you don't know what a Gruntfile is, see the [[Getting Started]] guide and the [[Sample Gruntfile]].

## Multi tasks
Because most grunt tasks take optional parameters and operate on sets of files, a few conventions have been established to facilitate task configuration. "Multi tasks" registered using the [grunt.registerMultiTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-registerMultiTask) method should follow these conventions.

Most tasks will be multi tasks; when in doubt, see the task or plugin documentation.

## Task configuration
When a multi task is run, grunt looks for a task-named property in the config object passed to the [grunt.initConfig](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-initConfig) method. In the following example, configuration for both the `concat` and `uglify` tasks are specified.

```js
grunt.initConfig({
  concat: {
    // concat task targets go here.
  },
  uglify: {
    // uglify task targets go here.
  }
});
```

Note that if a task is renamed with the [grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask) method, it will look for the _new_ task-named property in the config object.

## Targets
Multi tasks SOMETHING 
It's often useful for tasks to run using different options for different sets of files. 
Talk about specifying targets explicitly vs implicit iteration over targets 

```js
grunt.initConfig({
  concat: {
    foo: {
      // "foo" target configuration goes here.
    },
    bar: {
      // "bar" target configuration goes here.
    }
  }
});
```

## Options
Each target in a multi task may have an `options` property that is specific to that target. In addition, a task-level `options` property may be specified that is used as default options for each target. Target-level options will override task-level options, which override built-in task defaults.

```js
grunt.initConfig({
  concat: {
    options: {
      // task-level options go here. These options will override built-in
      // task defaults, and may be overridden by target-level options.
    }
    foo: {
      options: {
        // "foo" target options go here, overridding task-level options
        // and built-in task defaults.
      }
    },
    bar: {
      options: {
        // "bar" target options go here, overridding task-level options
        // and built-in task defaults.
      }
    }
  }
});
```

## Files

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



### File globbing
- How node-glob works
- How arrays of globs can negate stuff
- Some examples
