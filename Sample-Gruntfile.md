In this page we walk you through the creation of a `Gruntfile` that covers the usual needs of a simple project. If you already know how to set up a `Gruntfile` and you're looking for a quick example, here's one:

```js
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

};
```

## Requirements

Every project has its own needs, but most of them have something in common. In this guide we introduce you to a few Grunt plugins to automate basic requirements. The final goal is to teach you how to configure these Grunt plugins so that you can use them in your projects.

For the sake of the example, let's say that you're creating a JavaScript library. The typical folder structure features the following folders: `src`, `dist`, and `test`. The `src` folder (sometimes called `app`) contains the source code of the library as you author it. The `dist` folder (sometimes called `build`) contains the distribution, a minified version of the source code. A minified file is one where all unnecessary characters, such as spaces, new lines, comments are removed, without affecting the functionality of the source code. Minified source code is especially useful for users of the project because it reduces the amount of data that needs to be transferred. Finally, the `test` folder contains the code to test the project. This set up will be used in the next sections when creating the `Gruntfile` configuration.

While developing the library and releasing new versions there are a few tasks that you need to perform on a regular basis. For example, you might want to ensure that the code you write adheres to best practices, or that the code you've written doesn't result in unexpected behaviors. To do that, you can employ a tool called [JSHint](http://jshint.com/about/). Grunt has an official plugin for it called [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) which we'll adopt in this example. In particular, you might want to ensure that as you modify your code, you don't break any rules or best practices. So, a good strategy is to check the code at every change you perform. To do that, we'll cover a Grunt plugin called [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch). The latter runs predefined tasks, such as `grunt-contrib-jshint`, whenever files are added, changed, or deleted.

Checking that your source code follows best practices is not enough to guarantee that it's stable and doesn't contain bugs. To create a robust project, you need to test it. There are several libraries you can adopt such as [QUnit](https://qunitjs.com/) or [Jasmine](http://jasmine.github.io/). In this guide, we describe how to configure QUnit, and specifically [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit), to test your code.

When it comes to distributing your work, you want to offer a version as small in size  as possible. To create a minified version you need a Grunt plugin like [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify). Moreover,  unless the project you're developing is very small, chances are that you've split the code in multiple files. While this is a good practice for the developer, you want users to include only one file. So, before minifying the code, you should concatenate the source files to create a single one. To achieve this goal you need a Grunt plugin like [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat).

To sum up, in this guide we'll use the following five Grunt plugins:

- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

If you're curious about what the final result looks like, the entire `Gruntfile` can be found at the bottom of this page.

## Setting up the `Gruntfile`

The first part is the "wrapper" function, which encapsulates your Grunt configuration.

```javascript
module.exports = function(grunt) {
};
```

Within that function we can initialize our configuration object:

```javascript
grunt.initConfig({
});
```

Next, we can store the project settings from the `package.json` file into the `pkg` property. This allows us to refer to the values of properties within our `package.json` file, as we'll see shortly.

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

Now we can define a configuration for each of the tasks we mentioned. The configuration object for a plugin lives as a property on the configuration object, that often shares the same name as its plugin. The configuration for `grunt-contrib-concat` goes in the configuration object under the `concat` key as shown below:

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

Note how in the snippet above we refer to the `name` property that's in the JSON file. We access it by using `pkg.name` as earlier we defined the `pkg` property to be the result of loading the `package.json` file, which is then parsed to a JavaScript object. Grunt has a simple template engine to output the values of properties in the configuration object. Here we tell the `concat` task to concatenate all files that exist within `src/` and end in `.js`.

Now let's configure the `grunt-contrib-uglify` plugin, which minifies the JavaScript code:

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

This snippet tells `grunt-contrib-uglify` to create a file within `dist/` that contains the result of minifying the JavaScript files. Here we use `<%= concat.dist.dest %>` so uglify will minify the file that the concat task produces.

Up to this point, we have configured the plugins to create the distribution version the library. It's now time to use `grunt-contrib-qunit` to automate the testing of the code. To do that, we need to give to specify the location of the test runner files, which are the HTML files QUnit runs on. The resulting code is reported below:

```javascript
qunit: {
  files: ['test/**/*.html']
},
```

Once done, it's time to set up the configuration to ensure that the code of the project adheres to best practices. JSHint is a tool that can detect issues or potential issues like a high cyclomatic complexity, the use of the equality operator instead of the strict equality operator, and the definition of unused variables and functions.

We advice you to analyze with `grunt-contrib-jshint` all the JavaScript files of your project, including `Gruntfile` and the test files. An example of configuration of `grunt-contrib-jshint` is the following:

```javascript
jshint: {
  // define the files to lint
  files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
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

This plugin takes an array of files and then an object of options. These are all [documented on the JSHint site](http://www.jshint.com/docs/). If you're happy with the plugin defaults, there's no need to redefine them in the Gruntfile.

The last plugin left to configure is `grunt-contrib-watch`. We'll use it to run the `jshint` and the `qunit` tasks as soon as a JavaScript file is added, deleted, or modified. When it detects any of the files specified have changed (here, we use the same files we told JSHint to check), it will run the tasks you specify, in the order they appear. This can be run on the command line with `grunt watch`.

Turning the previous description into a configuration for `grunt-contrib-watch` results in the snippet below:

```javascript
watch: {
  files: ['<%= jshint.files %>'],
  tasks: ['jshint', 'qunit']
}
```

With this snippet, we've set up the configuration for all the plugins mentioned in the introduction. The last step to perform is to load in the Grunt plugins we need. All of these should have been previously installed through npm.

```javascript
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
```

And finally set up some tasks. The most important of these tasks is the default task:

```javascript
// this would be run by typing "grunt test" on the command line
grunt.registerTask('test', ['jshint', 'qunit']);

// the default task can be run just by typing "grunt" on the command line
grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
```

The default task is executed when you invoke `Grunt` without specifying a task to execute (`grunt`).

## The resulting `Gruntfile`

If you've followed this guide correctly you should have the following `Gruntfile`:

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
