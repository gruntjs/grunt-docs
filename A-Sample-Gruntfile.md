Below is a fully commented sample gruntfile which uses five modules:

- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

Note how it's possible to refer to settings for other tasks, which is useful to avoid duplication of settings, in particular when referring to files that tasks should run on.

```javascript
// this tells JSHint to not allow the module global to be overriden
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    /* read in the JSON from the package.json file
     * you can access the properties through pkg.propName
    */
    pkg: grunt.file.readJSON('package.json'),
    /*
     * the concat task (grunt-contrib-concat) takes multiple JS files
     * and merges them into one
     */
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
    },
    /*
     * settings for the uglify task (grunt-contrib-uglify)
     * this minifies your JS code to as small as it possibly can be
     */
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        /*
         * the output is done as an object. The key is the outputted file
         * and the value is the file to minify
         */
        files: {
          /* we set the output to be in dist/
           * and the file to minify to be the file our concat task generated
           * note that this means that uglify must run after concat
           */
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    /*
     * set up the QUnit module (grunt-contrib-qunit)
     * give it the location of our test runner(s)
     */
    qunit: {
      files: ['test/**/*.html']
    },
    /*
     * set up our linter, JSHint (grunt-contrib-jshint)
     */
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          console: true
        }
      }
    },
    /*
     * configure the watch task (grunt-contrib-watch)
     * this runs certain tasks when it detects file changes
     * to initalise this, run "grunt watch"
     */
    watch: {
      // tell it to run when any of the files in the jshint.files array are saved
      files: ['<%= jshint.files %>'],
      // define an array of tasks to run (these are run in order)
      tasks: ['jshint', 'qunit']
    }
  });

  // load in the Grunt modules we need
  // these must have been installed via npm
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  /*
   * set up some Grunt tasks
   * these take a name and an array of tasks to run
   * these tasks are run in the order they are defined in the array
   */
  // this would be run by typing "grunt test" on the command line
  grunt.registerTask('test', ['jshint', 'qunit']);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
```