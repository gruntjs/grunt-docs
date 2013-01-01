**cli**
- Configure execution state (dry run, etc).
- Invoke task runner.

**config-processor lib**
- Merge options, expand templates.

**file-globbing lib**
- Expand globs based on declarative convention (many-to-one, one-to-one with renaming etc).
- Responsible for emitting events if files are missing during expansion.

**grunt.log**
- Listens to the emitter object exported by a task and writes to console.log.
- Can be swapped out with any other logger.

**task-runner lib - [grunt](/gruntjs/grunt)**
- Responsible for task execution, and for producing task-compatible configs / file listings.
- Expand files using file-globbing lib **before** they are sent to the task.  Tasks which need to customize expansion should export declarative flags that instruct the runner what to do.  These exported flags must be carefully considered and backwards compatibility must be retained in perpetuity to prevent tasks relying on the runner version for correct operation.  This stuff could happen at the task level with an exported method like task.expandFiles but I really think we can nail the needed use-cases at the runner level to ensure consistency throughout the ecosystem.
- Merge config values using config-processor lib **before** they are sent to the task.
- Send raw config / file globs to task during execution, but discourage handling this at the task level.
- New config conventions allow chaining a single set of files through multiple tasks.

**task - [node-task](/tkellen/task)**
- Dead simple npm module exporting a specified set of common methods.
- If user really needs runtime config processing or file expansion, they can require the config processor lib or file expansion lib themselves.  These situations should be carefully examined and generalized into the runner.
- Abstract file reading and writing with task prototypes that emit all proper events.













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