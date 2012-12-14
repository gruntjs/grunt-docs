**cli**
- Configure execution state (dry run, etc).
- Provide help system.
- Invoke task runner.

**config-processor lib**
- Merge options, expand templates.

**file-globbing lib**
- Expand globs based on declarative convention (many-to-one, one-to-one with renaming etc).
- Responsible for emitting events if files are missing during expansion.

**task-runner lib [grunt](/gruntjs/grunt)**
- Process config using config/file-globbing libs.
- New config conventions allow chaining a single set of files through multiple tasks.
- Invoke tasks with expanded config (send raw config as well).

**task [node-task](/tkellen/task)**
- Dead simple node module.
- Can use config-processor / file-globbing libs for runtime-configuration if needed.
- Abstracts file reading and writing.