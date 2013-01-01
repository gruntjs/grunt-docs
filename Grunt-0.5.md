**Architecture**

1. Tasks as npm modules that can be required and run independent of any task runner (if you want to manually build a compliant config object to execute it).  Can pipe data between multiple tasks (think coffescript transpilation + uglify in a single step).  All task output emitted as events.  See: http://github.com/tkellen/node-task

2. A library for glob expansion that handles arrays of globs, negation, etc. See http://github.com/cowboy/globtastic

3. A library for parsing configurations (merge options, template expansion, glob expansion (using lib from item #2) from the current Gruntfile format, into a valid form for running node-task compliant modules.  Will support user-defined middleware for controlling config output.  See: http://github.com/cowboy/configthing

3. A task runner which uses config parsing library from item #3 to execute node-task compatible modules (can be used programmatically, or via cli).  Supports defining "alias" tasks which compile a set of tasks which can be run in parallel  See: http://github.com/gruntjs/grunt

4. A logger to listen to events and output them to the console.  See: http://github.com/gruntjs/grunt-logger


***Please ignore the section below.  It is a jumbled mess/work in progress and should not be considered anything resembling a roadmap.***

527 - parallel execution of tasks
545 - conditional compilation (probably belongs on the watch task)
493 - cwd handling

## grunt
* should abort early if no files defined, if a flag like needsFiles is set to true when exporting task
* should give config to task with files expanded, allow custom expansion if desired
* Investigate shelljs integration. [#59](https://github.com/gruntjs/grunt/issues/59)
* more specific error codes
  * Task not found
  * Task failed
  * Task requirement not met
  * Config requirement not met

## grunt-log
* Log to stderr/stdout. #570 [#120](https://github.com/gruntjs/grunt/issues/120)
* https://github.com/tkellen/grunt-decoupled/tree/master/grunt-log

## grunt-file
* https://github.com/tkellen/grunt-decoupled/tree/master/grunt-file

## grunt-util
* https://github.com/tkellen/grunt-decoupled/tree/master/grunt-util

## grunt-task
* Task loading should be more robust.  Allow it to load from a single tasks file, a directory of tasks files, or a passed-in callback. [#261](https://github.com/gruntjs/grunt/issues/261)
* Task testability: [#183](https://github.com/gruntjs/grunt/issues/183)
* Task API: [#189](https://github.com/gruntjs/grunt/issues/189), [#385](https://github.com/gruntjs/grunt/issues/385)
* Make a convention for what happens when files for a task are missing [#434](https://github.com/gruntjs/grunt/issues/434)
* anonymous task names