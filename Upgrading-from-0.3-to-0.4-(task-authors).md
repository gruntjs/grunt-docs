## grunt
* Requires Node.js version `>= 0.8.0`

## The Gruntfile
* The `grunt.js` config file was renamed to `Gruntfile.js`.
* CoffeeScript is supported in your `Gruntfile.coffee` project gruntfile or `*.coffee` task file(s).

## API changes
* [grunt.util](grunt.util) replaces the now-removed `grunt.utils`.
 * [Lo-Dash](http://lodash.com/) is now available as [grunt.util._](grunt.util#wiki-grunt-util-_) instead of [Underscore.js](http://underscorejs.org/)
* [grunt.template](grunt.template)
 * added `.addDelimiters` and `.setDelimiters` methods to add/set template delimiters.
* [grunt.fail](grunt.fail) won't emit a beep if `--no-color` option specified.
* [grunt.package](grunt#wiki-grunt-package) reflects the metadata stored in grunt's `package.json`.
* [grunt.version](grunt#wiki-grunt-version) is the current version of grunt as a string.
* [grunt.event](grunt.event) library added so that tasks may emit events.

## Helpers have been removed
Grunt's helper system, and the related methods `task.registerHelper` and `task.renameHelper` have been removed in favor of node `require`. For a concise example on how to share functionality between gruntplugins, please see [grunt-lib-legacyhelpers](https://github.com/gruntjs/grunt-lib-legacyhelpers).

## Task changes

### [this.file / grunt.task.current.file](grunt.task#wiki-this-file)
`this.file.src` within a multi-task is now _automatically_ expanded using `grunt.file.expand()` to the set of matching files. If you want to manually expand files using different options or a different method, the `this.file.srcRaw` will contain the raw, unexpanded (but still template processed) source file patterns. `this.file.dest` will still be the destination file string.

In addition, multi task targets can now contain more than one set of src-dest pairs in a `files` object, see the [[Configuring tasks]] guide for more information on this.

### [this.options / grunt.task.current.options](grunt.task#wiki-this-options)
A `this.options()` method may be used within tasks to normalize options. You may also specify options defaults like so: `this.options({option: 'defaultvalue', ...})`