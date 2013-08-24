Below we walk through a sample `Gruntfile` which uses five Grunt plugins:

- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

The entire `Gruntfile` is at the bottom of this page, but if you keep reading we'll walk through it a step at a time.


The first part is the "wrapper" function, which encapsulates your Grunt configuration.

```javascript
module.exports = function(grunt) {
}
```

Within that function we can initialize our configuration object:

```javascript
grunt.initConfig({
});
```

Next we can read in the project settings from the `package.json` file into the `pkg` property. This allows us to refer to the values of properties within our `package.json` file, as we'll see shortly.

```javascript
pkg: grunt.file.readJSON('package.json')
```

This leaves us with this so far:

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });
};
```

Now we can define configuration for each of the tasks we have. The configuration object for a task lives as a property on the configuration object, that's named the same as the task. So the "concat" task goes in our config object under the "concat" key. Below is my configuration object for the "concat" task.

```javascript
concat: {
  options: {
    // define a string to put between each file in the concatenated output
    separator: ';'
  },
  dist: {
    // the files to concatenate
    src: ['src/**/*.js'],
    // the location of the resulting JS file
    dest: 'dist/<%= pkg.name %>.js'
  }
}
```

Note how I refer to the `name` property that's in the JSON file. We access this using `pkg.name` as earlier we defined the `pkg` property to be the result of loading the `package.json` file, which is then parsed to a JavaScript object. Grunt has simple template engine to output the values of properties in the configuration object. Here I tell the concat task to concatenate all files that exist within `src/` and end in `.js`.

Now lets configure the uglify plugin, which minifies our JavaScript:

```javascript
uglify: {
  options: {
    // the banner is inserted at the top of the output
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  },
  dist: {
    files: {
      'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    }
  }
}
```

This tells uglify to create a file within `dist/` that contains the result of minifying the JavaScript files. Here I use `<%= concat.dist.dest %>` so uglify will minify the file that the concat task produces.

The QUnit plugin is really simple to set up. You just need to give it the location of the test runner files, which are the HTML files QUnit runs on.

```javascript
qunit: {
  files: ['test/**/*.html']
},
```

The JSHint plugin is also very simple to configure:

```javascript
jshint: {
  // define the files to lint
  files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
  // configure JSHint (documented at http://www.jshint.com/docs/)
  options: {
  	// more options here if you want to override JSHint defaults
    globals: {
      jQuery: true,
      console: true,
      module: true
    }
  }
}
```

JSHint simply takes an array of files and then an object of options. These are all [documented on the JSHint site](http://www.jshint.com/docs/). If you're happy with the JSHint defaults, there's no need to redefine them in the Gruntfile.

Finally we have the watch plugin:

```javascript
watch: {
  files: ['<%= jshint.files %>'],
  tasks: ['jshint', 'qunit']
}
```

This can be run on the command line with `grunt watch`. When it detects any of the files specified have changed (here, I just use the same files I told JSHint to check), it will run the tasks you specify, in the order they appear.

Finally, we have to load in the Grunt plugins we need. These should have all been installed through npm.

```javascript
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
```

And finally set up some tasks. Most important is the default task:


```javascript
// this would be run by typing "grunt test" on the command line
grunt.registerTask('test', ['jshint', 'qunit']);

// the default task can be run just by typing "grunt" on the command line
grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
```

And here's the finished `Gruntfile.js`:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
```

