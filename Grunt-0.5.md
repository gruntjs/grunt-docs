**cli**
- Configure execution state (dry run, etc).
- Invoke task runner.

**config-processor lib**
- Merge options, expand templates.

**file-globbing lib**
- Expand globs based on declarative convention (many-to-one, one-to-one with renaming etc).
- Responsible for emitting events if files are missing during expansion.

**task-runner lib - [grunt](/gruntjs/grunt)**
- Expand files using file-globbing lib BEFORE they are sent to the task.  Support customized expansion through declarative config.  Emit events for files missing etc here, not at the task level.
- Merge config values using config-process lib BEFORE they are sent to the task.
- Send file patterns/config along to task, but user is on their own to implement using them correctly.
- New config conventions allow chaining a single set of files through multiple tasks.
- Invoke tasks with expanded config (send raw config as well).

**task - [node-task](/tkellen/task)**
- Dead simple npm module.
- Could use config-processor / file-globbing libs for runtime-configuration if needed, but user is entirely on their own to implement it.
- Abstract file reading and writing with task prototypes that emit all proper events.