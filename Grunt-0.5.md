** Architecture **

1. Tasks as npm modules that can be required and run independent of any task runner (if you want to manually build a compliant config object to execute it).  You will also be able to pipe data between multiple tasks (think coffescript transpilation + uglify in a single step).  See: http://github.com/tkellen/node-task

2. A library for parsing configurations (merge options, template expansion, glob expansion etc) from the current Gruntfile format, into a valid form for running node-task compliant modules.  Will support user-defined middleware for controlling config output.  See: http://github.com/cowboy/configthing

3. A task runner which uses said config parsing library to execute node-task compatible modules (can be used programmatically, or via cli)  See: http://github.com/gruntjs/grunt

4. All task output emitted as events which can be listened to by any compatible logger (the default being a console logger that produces output very similar to what we currently have).

**task-runner lib - [grunt](/gruntjs/grunt)**
- Responsible for task execution, and for producing task-compatible configs / file listings.
- Expand files using file-globbing lib **before** they are sent to the task.  Tasks which need to customize expansion should export declarative flags that instruct the runner what to do.  These exported flags must be carefully considered and backwards compatibility must be retained in perpetuity to prevent tasks relying on the runner version for correct operation.  This stuff could happen at the task level with an exported method like task.expandFiles but I really think we can nail the needed use-cases at the runner level to ensure consistency throughout the ecosystem.
- Merge config values using config-processor lib **before** they are sent to the task.
- Send raw config / file globs to task during execution, but discourage handling this at the task level.
- New config conventions allow chaining a single set of files through multiple tasks.








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