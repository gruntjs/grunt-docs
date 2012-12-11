## grunt
* Requires Node.js version `>= 0.8.0`
* `grunt.utils` was renamed to [grunt.util](grunt.util).
* The `grunt.js` config file was renamed to `Gruntfile.js`.
* CoffeeScript is supported; your project gruntfile can be `Gruntfile.coffee`, task files can be `yourtask.coffee`.
* [grunt.package](grunt#wiki-grunt-package) reflects the metadata stored in grunt's `package.json`.
* [grunt.version](grunt#wiki-grunt-version) is the current version of grunt as a string.
* [grunt.event](grunt.event) library added so that tasks may emit events.
* [grunt.fail](grunt.fail) won't emit a beep if `--no-color` option specified.
* [grunt.template](grunt.template) added `.addDelimiters` and `.setDelimiters` methods to add/set template delimiters.

### Removed: task.registerHelper, task.renameHelper
Grunt's helper system has been removed in favor of node `require`. For a concise example on how to share functionality between gruntplugins, please see [grunt-lib-legacyhelpers](https://github.com/gruntjs/grunt-lib-legacyhelpers).

## Inside of tasks

### [this.file / grunt.task.current.file](grunt.task#wiki-this-file)
`this.file.src` within a multi-task is now normalized and auto expanded using `grunt.file.expand()`. `this.file.srcRaw` will contain the raw, unexpanded (but still template processed) source file patterns. `this.file.dest` will still be the destination file string.

In addition, multi task targets can now contain more than one set of src-dest pairs in a `files` object, see the [[Configuring tasks]] guide for more information on this.

### [this.options / grunt.task.current.options](grunt.task#wiki-this-options)
The method `this.options()` within a task is available and contains the options for the current task.  You may also pass a default options object like so: `this.options({option: 'defaultvalue', ...})`

