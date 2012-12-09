## grunt
* Requires Node.js version `>= 0.8.0`
* `grunt.utils` was renamed to [grunt.util](grunt.util).
* The `grunt.js` config file was renamed to `Gruntfile.js`.
* ES5 Strict Mode is enabled throughout Grunt.
* CoffeeScript is supported.
* [grunt.package](grunt#wiki-grunt-package) was added containing the contents of Grunt's `package.json`.
* [grunt.version](grunt#wiki-grunt-version) added holding the current version of Grunt.
* `--version` option added to display Grunt's version.
* The `meta.banner` config option is now just `banner`.

## grunt.task
* `grunt.task.splitArgs()` added to split colon separated params but not escaped `\\:` colons.
* `grunt.task.unregisterTasks()` added to unregister one or more tasks.

### `task.registerHelper` Removed
Grunt's helper system has been removed in favor of node require. For a concise example on how to share functionality between gruntplugins, please see [grunt-lib-legacyhelpers](https://github.com/gruntjs/grunt-lib-legacyhelpers).

### [this.file / grunt.task.current.file](grunt.task#wiki-this-file)
`this.file.src` within a multi-task is now normalized and auto expanded with `grunt.file.expand()`. `this.file.srcRaw` will contain the raw, unexpanded (but still template processed) source file patterns. `this.file.dest` will be the destination file string.

### [this.options / grunt.task.current.options](grunt.task#wiki-this-options)
The method `this.options()` within a task is available and contains the options for the current task.

## [grunt.template](grunt.template)
* `grunt.template.addDelimiters()`, `grunt.template.setDelimiters()` added to set or add to underscore.js template delimiters.

## [grunt.completion](Frequently-Asked-Questions)
* grunt.completion library was added for bash auto-completion.

## [grunt.event](grunt.event)
* [grunt.event](grunt.event) library added (todo add more events).

## grunt.fail
* Won't emit a beep if `--no-color` option specified.
