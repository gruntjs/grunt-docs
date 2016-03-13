## Grunt 0.next

* Drop Node.JS 0.8 support
* New logging (https://github.com/cowboy/node-prolog)
  *  A logger to listen to events and output them to the console.  Deals with stderr/stdout, or Grunt itself has this built in.
* node-task (https://github.com/node-task)
  * Tasks as npm modules that can be required and run independent of any task runner (if you want to manually build a compliant config object to execute it).  Can pipe data between multiple tasks (think coffeescript transpilation + uglify in a single step).  All task output emitted as events.
  * A library for parsing configurations (merge options, template expansion, glob expansion (using lib from item #2) from the current Gruntfile format, into a valid form for running node-task compliant modules.  Will support user-defined middleware for controlling config output.
  * A task runner which uses config parsing library from item #3 to execute node-task compatible modules (can be used programmatically, or via cli).  Supports defining "alias" tasks which compile a set of tasks which can be run in parallel  See: http://github.com/gruntjs/grunt

## Grunt 0.5

### Update Release

* Updates dependencies
* Removes external libraries under `grunt.util.`
* A library for glob expansion that handles arrays of globs, negation, etc. See https://github.com/cowboy/node-globule

See https://github.com/gruntjs/grunt/issues/1045 for updated information.






## Out of Date Information  / Drafts

**0.5 Gruntfile Ideas**
```js
var grunt = require('grunt');

grunt.initConfig({
  // defaults for cli
  grunt: {
    dryRun: true,
    stack: true,
    verbose: true,
    // what about defining loggers specific to a task?
    // is this required in your gruntfile or on by default?
    logger: [require('grunt-logger')] 
  },
  jshint: {
    // ...
  },
  concat: {
    // ...
  },
  min: {
    // ...
  }
});

grunt.registerTask(require('grunt-contrib-jshint'));
grunt.registerTask(require('grunt-contrib-concat'));
grunt.registerTask(require('grunt-contrib-uglify'), 'min'); // optional second param renames

// generates a node-task compliant object and runs grunt.registerTask on it
grunt.registerTask('name','description', function (config) {
  //...
});

// load a set of tasks to be run in parallel
grunt.registerTask('name', ['jshint', 'concat'], { parallel:true });

// i think the cli should call this, but putting it here because you mentioned thinking it should go here.
grunt.run();
```
***Please ignore the section below.  It is a jumbled mess/work in progress and should not be considered anything resembling a roadmap.***

527 - parallel execution of tasks
545 - conditional compilation (probably belongs on the watch task)
493 - cwd handling

* more specific error codes
  * Task not found
  * Task failed
  * Task requirement not met
  * Config requirement not met

## grunt-log
* Log to stderr/stdout. [#586](https://github.com/gruntjs/grunt/issues/586) [#570](https://github.com/gruntjs/grunt/issues/570) [#120](https://github.com/gruntjs/grunt/issues/120)
* https://github.com/tkellen/grunt-decoupled/tree/master/grunt-log

## grunt-file
* https://github.com/tkellen/grunt-decoupled/tree/master/grunt-file

## grunt-util
* https://github.com/tkellen/grunt-decoupled/tree/master/grunt-util
