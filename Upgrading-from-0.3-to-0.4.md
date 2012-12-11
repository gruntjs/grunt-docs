Grunt is now split into three parts: `grunt`, `grunt-cli` and `grunt-init`.

1. `grunt` is the core library that gets installed locally to your project. It contains all the code and logic for running tasks, loading plugins, etc. Install locally, along with grunt plugins, per the [[Getting started]] guide.

2. `grunt-cli` is installed globally, giving you the `grunt` command in your shell. It doesn't do anything by itself, but will run a project's locally-installed grunt using the project's Gruntfile. Install globally, per the [[Getting started]] guide.  For more information about why this has changed, please read [npm 1.0: Global vs Local installation](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation).

3. `grunt-init` has been broken into a separate [grunt-init](/gruntjs/grunt-init) utility that may be installed globally with `npm install -g grunt-init` and run with the `grunt-init` command.  In the coming months, [Yeoman](http://yeoman.io/) will completely replace grunt-init.  See the [grunt-init project page](/gruntjs/grunt-init) for more information.

## Pre-existing tasks and plugins
All `grunt-contrib-*` series plugins are grunt 0.4 ready.  However, it is highly unlikely that third party plugins written for grunt 0.3 will continue to work with 0.4 until they have been updated.  We are actively working with plugin authors to ensure this happens as swiftly as possible.

_A future grunt release will be focused on decoupling grunt's architecture so that plugins are not affected by future updates._

## General
* grunt now requires Node.js version `>= 0.8.0`
* The `grunt.js` "Gruntfile" config filename has been renamed to `Gruntfile.js`.
* CoffeeScript is supported in your `Gruntfile.coffee` project gruntfile or `*.coffee` task file(s). (transpiling to JS happens automatically).

See the "The Gruntfile" section of the [[Getting started]] guide for more information.

## Core Tasks are now Grunt Plugins
The eight core tasks that were included in grunt 0.3 are now separate grunt plugins. Each is a discreet npm module that must be installed as a plugin per the "Loading grunt plugins and tasks" section of the [[Getting started]] guide.

* concat → [grunt-contrib-concat](/gruntjs/grunt-contrib-concat) plugin
* init → stand-alone [grunt-init](/gruntjs/grunt-init) utility
* lint → [grunt-contrib-jshint](/gruntjs/grunt-contrib-jshint) plugin
* min → [grunt-contrib-uglify](/gruntjs/grunt-contrib-uglify) plugin
* qunit → [grunt-contrib-qunit](/gruntjs/grunt-contrib-qunit) plugin
* server → [grunt-contrib-connect](/gruntjs/grunt-contrib-connect) plugin
* test → [grunt-contrib-nodeunit](/gruntjs/grunt-contrib-nodeunit) plugin
* watch → [grunt-contrib-watch](/gruntjs/grunt-contrib-watch) plugin

Some task names have changed, and specifying options and files has been standardized in grunt 0.4, so be sure to see each plugin's documentation as linked above for the latest configuration details.

## Configuration
`<% %>` style template strings specified as config data inside the Gruntfile are automatically expanded, see the [[grunt.template]] documentation for more information.

**Directives have been removed**, but their functionality has been retained. These replacements can be made:

* `'<config:prop.subprop>'` → `'<%= prop.subprop %>'`
* `'<json:file.json>'` → `grunt.file.parseJSON('file.json')`
* `'<file_template:file.js>'` → `grunt.template.process(grunt.file.read('file.js'))`

Instead of specifying a banner in a file list with `'<banner>'` or `'<banner:prop.subprop>'`, the [grunt-contrib-concat](/gruntjs/grunt-contrib-concat) and [grunt-contrib-uglify](/gruntjs/grunt-contrib-uglify) plugins each have a `banner` option.

Instead of stripping banners from files individually with `'<file_strip_banner:file.js>'`, the [grunt-contrib-concat](/gruntjs/grunt-contrib-concat) and [grunt-contrib-uglify](/gruntjs/grunt-contrib-uglify) plugins each have an option to strip/preserve banners.

## Task configuration
The configuration format for grunt 0.4 has been standardized and greatly enhanced.

See the [[Configuring tasks]] guide as well as individual plugin documentation for more information.

## Alias task changes
When specifying an alias task, the list of tasks to run must now be specified as an array.

```js
// v0.3.x (old format)
grunt.registerTask('default', 'jshint nodeunit concat');
// v0.4.x (new format)
grunt.registerTask('default', ['jshint', 'nodeunit', 'concat']);
```

## Task arguments may now contain spaces
The aforementioned alias task change (task lists must be specified as an array) makes this possible. Just be sure to surround task arguments containing spaces with quotes when specifying them on the command line, so they can be properly parsed.

```shell
grunt my-task:argument-without-spaces "other-task:argument with spaces"
```

## Helpers
Grunt's helper system, and the related methods `task.registerHelper` and `task.renameHelper`, have been removed in favor of node `require`. For a concise example on how to share functionality between gruntplugins, please see [grunt-lib-legacyhelpers](/gruntjs/grunt-lib-legacyhelpers).

## API
* [grunt.util](grunt.util) replaces the now-removed `grunt.utils`.
 * [Lo-Dash](http://lodash.com/) is now available as [grunt.util._](grunt.util#wiki-grunt-util-_) instead of [Underscore.js](http://underscorejs.org/)
* [grunt.template](grunt.template)
 * added `.addDelimiters` and `.setDelimiters` methods to add/set template delimiters.
* [grunt.fail](grunt.fail) won't emit a beep if `--no-color` option specified.
* [grunt.package](grunt#wiki-grunt-package) reflects the metadata stored in grunt's `package.json`.
* [grunt.version](grunt#wiki-grunt-version) is the current version of grunt as a string.
* [grunt.event](grunt.event) library added so that tasks may emit events.

## Task authors
** First, please indicate clearly on your repository README which major version number breaks compatibility with grunt 0.3.**

### [this.file / grunt.task.current.file](grunt.task#wiki-this-file)
The `this.file.src` property within a multi-task is now _automatically_ expanded using `grunt.file.expand()` to the set of matching files. If you want to manually expand files using different options or a different method, the `this.file.srcRaw` will contain the raw, unexpanded (but still template processed) source file patterns. `this.file.dest` will still be the destination file string.

In addition, multi task targets can now contain more than one set of src-dest pairs in a `files` object, see the [[Configuring tasks]] guide for more information on this.

### [this.options / grunt.task.current.options](grunt.task#wiki-this-options)
The `this.options()` method may be used within tasks to normalize options. You may also specify options defaults like so: `this.options({option: 'defaultvalue', ...})`

## Troubleshooting

* If you had previously installed a development version of grunt 0.4 or any grunt-contrib plugins, be sure to flush your npm cache with `npm cache clean` first to ensure that you are pulling the final version of grunt and grunt-contrib plugins.
