## The Gruntfile
(mention it, link to it in the getting started guide)

### File globbing


### Specifying Files
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

### The options object
Grunt will now merge options defined at the task level with each target (as long as the task has been updated to support grunt 0.4).  As a result, you can now share your configuration across multiple targets.  In the example below, both the `dev` and `prod` targets will inherit the options defined at the top level before the task is run.  Target level options can override task level options.

```js
requirejs: {
  options: {
    baseUrl: './app',
    name: 'lib/almond/almond',
    include: 'app',
    mainConfigFile: 'app/config.js',
    out: 'build/js/app.js',
    wrap: true,
  },
  dev: {
    options: {
      optimize: 'none'
    }
  },
  prod: {
    options: {
      optimize: 'uglify',
      out: 'build/js/app.min.js'
    }
  }
}
```

## "Basic" tasks
(explanation that configuring tasks is sometimes entirely up to the task author)