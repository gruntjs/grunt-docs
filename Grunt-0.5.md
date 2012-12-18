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