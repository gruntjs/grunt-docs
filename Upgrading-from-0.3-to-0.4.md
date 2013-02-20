_Note that even if you are familiar with grunt, it would be worthwhile to read the new [[Getting started]] guide._

Grunt is now split into three parts: `grunt`, `grunt-cli` and `grunt-init`.

1. The npm module `grunt` should be installed locally to your project. It contains the code and logic for running tasks, loading plugins, etc.
2. The npm module `grunt-cli` should be installed globally.  It puts the `grunt` command in your PATH so you can execute it anywhere. By itself, it doesn't do anything; its job is to load and run the Grunt that has been installed locally to your project, regardless of the version.  For more information about why this has changed, please read [npm 1.0: Global vs Local installation](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation).
3. The `init` task has been broken into its own npm module, `grunt-init`.  It should be installed globally with `npm install -g grunt-init` and run with the `grunt-init` command.  In the coming months, [Yeoman](http://yeoman.io/) will completely replace grunt-init.  See the [grunt-init project page](https://github.com/gruntjs/grunt-init) for more information.

## Pre-existing tasks and plugins
All `grunt-contrib-*` series plugins are Grunt 0.4 ready.  However, it is highly unlikely that third party plugins written for Grunt 0.3 will continue to work with 0.4 until they have been updated.  We are actively working with plugin authors to ensure this happens as swiftly as possible.

_A forthcoming Grunt release will be focused on decoupling grunt's architecture so that plugins are not affected by future updates._

## Requirements
* Grunt now requires Node.js version `>= 0.8.0`

## The Gruntfile
* The "Gruntfile" has changed from `grunt.js` to `Gruntfile.js`.
* CoffeeScript is supported in your `Gruntfile.coffee` project gruntfile or `*.coffee` task files (transpiling to JS happens automatically).

See the "The Gruntfile" section of the [[Getting started]] guide for more information.

## Core Tasks are now Grunt Plugins
The eight core tasks that were included in Grunt 0.3 are now separate Grunt plugins. Each is a discrete npm module that must be installed as a plugin per the "Loading Grunt plugins and tasks" section of the [[Getting started]] guide.

* concat → [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) plugin
* init → stand-alone [grunt-init] utility
* lint → [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) plugin
* min → [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) plugin
* qunit → [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit) plugin
* server → [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) plugin
* test → [grunt-contrib-nodeunit](https://github.com/gruntjs/grunt-contrib-nodeunit) plugin
* watch → [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) plugin

Some task names and options have changed.  Be sure to see each plugin's documentation as linked above for the latest configuration details.

## Configuration
The configuration format for Grunt 0.4 tasks has been standardized and greatly enhanced. See the [[Configuring tasks]] guide, as well as individual plugin documentation for more information.

* File globbing (wildcard) patterns may now be negated to exclude matched files.
* Tasks now support a standard `options` object.
* Tasks now support a standard `files` object.

`<% %>` style template strings specified as config data inside the Gruntfile are automatically expanded, see the [[grunt.template]] documentation for more information.

**Directives have been removed**, but their functionality has been retained. These replacements can be made:

* `'<config:prop.subprop>'` → `'<%= prop.subprop %>'`
* `'<json:file.json>'` → `grunt.file.readJSON('file.json')`
* `'<file_template:file.js>'` → `grunt.template.process(grunt.file.read('file.js'))`

Instead of specifying a banner in a file list with `'<banner>'` or `'<banner:prop.subprop>'`, the [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) and [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) plugins each have a `banner` option.

Instead of stripping banners from files individually with `'<file_strip_banner:file.js>'`, the [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) and [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) plugins each have an option to strip/preserve banners.

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

## Character encodings
The [file.defaultEncoding](grunt.file#wiki-grunt-file-defaultEncoding) method was added to normalize character encodings, and all `grunt.file` methods have been updated to support the specified encoding.

## Helpers
Grunt's helper system has been removed in favor of node `require`. For a concise example on how to share functionality between Grunt plugins, please see [grunt-lib-legacyhelpers](https://github.com/gruntjs/grunt-lib-legacyhelpers). Plugin authors are encouraged to upgrade their plugins.

## API
The Grunt API saw substantial changes from 0.3 to 0.4.

* [grunt](grunt)
  * Removed `grunt.registerHelper` and `grunt.renameHelper` methods.
* [grunt.config](grunt.config)
  * Changed [config.get](grunt.config#wiki-grunt-config-get) method to automatically recursively expand `<% %>` templates.
  * Added [config.getRaw](grunt.config#wiki-grunt-config-getRaw) method that will retrieve raw (unexpanded) config data.
  * Changed [config.process](grunt.config#wiki-grunt-config-process) method to now process a value as if it had been retrieved from the config, expanding templates recursively. This method is called internally inside of `config.get`, but _not_ inside of `config.getRaw`.
* [grunt.event](grunt.event) added so that tasks may emit events.
* [grunt.fail](grunt.fail)
  * Won't emit a beep if `--no-color` option specified.
  * Added `fail.code` exit code map.
  * Removed `fail.warnAlternate` method.
* [grunt.file](grunt.file)
  * Tasks are no longer automatically loaded from `~/.grunt/tasks/` directory (install them locally to your project!).
  * Added [file.defaultEncoding](grunt.file#wiki-grunt-file-defaultEncoding) method for normalizing character encoding across all `grunt.file` methods.
  * Added [file.delete](grunt.file#wiki-grunt-file-delete) method.
  * Added relatively self-explanatory [file.exists](grunt.file#wiki-grunt-file-exists), [file.isDir](grunt.file#wiki-grunt-file-isDir), [file.isFile](grunt.file#wiki-grunt-file-isFile), [file.isLink](grunt.file#wiki-grunt-file-isLink), [file.isPathCwd](grunt.file#wiki-grunt-file-isPathCwd), [file.isPathInCwd](grunt.file#wiki-grunt-file-isPathInCwd), [file.doesPathContain](grunt.file#wiki-grunt-file-doesPathContain), [file.arePathsEquivalent](grunt.file#wiki-grunt-file-arePathsEquivalent) testing methods.
  * Added [file.match](grunt.file#wiki-grunt-file-match) and [file.isMatch](grunt.file#wiki-grunt-file-isMatch) methods to facilitate matching wildcard patterns against file paths.
  * Added [file.expandMapping](grunt.file#wiki-grunt-file-expandMapping) method for use in generating 1-to-1 src-dest file mappings.
  * Added [file.readYAML](grunt.file#wiki-grunt-file-readYAML) method.
  * Changed [file.findup](grunt.file#wiki-grunt-file-findup) to use the [findup-sync](https://github.com/cowboy/node-findup-sync) module.
  * Changed [file.glob](grunt.file#wiki-grunt-file-glob) to use the [glob](https://github.com/isaacs/node-glob) module.
  * Added [file.minimatch](grunt.file#wiki-grunt-file-minimatch) which exposes the [minimatch](https://github.com/isaacs/minimatch) module.
  * Removed `file.userDir` method (moved into [grunt-init]).
  * Removed `file.clearRequireCache` method.
  * Removed `file.expandFiles` and `file.expandDirs` methods, use the `filter` option of `file.expand` instead.
  * Removed `file.expandFileURLs` method. Don't specify URLs where files should be specified (eg. the qunit task now allows for a `urls` option).
* [grunt.task](grunt#wiki-grunt-task)
  * Tasks registered with both [task.registerTask](grunt.task#wiki-grunt-task-registerTask) and [task.registerMultiTask](grunt.task#wiki-grunt-task-registerMultiTask) get a `this.options` method.
  * Added [task.normalizeMultiTaskFiles](grunt.task#wiki-grunt-task-normalizeMultiTaskFiles) method to facilitate the normalization of multi task `files` objects into the `this.file` property.
  * Removed `task.registerHelper` and `task.renameHelper` methods.
  * Removed `task.searchDirs` property.
  * Removed `task.expand` `task.expandDirs` `task.expandFiles` `task.getFile` `task.readDefaults` methods (moved into [grunt-init]).
* [grunt.package](grunt#wiki-grunt-package) reflects the metadata stored in grunt's `package.json`.
* [grunt.version](grunt#wiki-grunt-version) is the current version of Grunt as a string.
* [grunt.template](grunt.template)
  * Added [template.addDelimiters](grunt.template#wiki-grunt-template-addDelimiters) method to add new template delimiters.
  * Added [template.setDelimiters](grunt.template#wiki-grunt-template-setDelimiters) method to select template delimiters.
  * The `init` and `user` template delimiters have been removed, but you can add them in again if you need to with `template.addDelimiters` ([grunt-init] uses this to enable the `{% %}` template delimiters).
* [grunt.util](grunt.util) replaces the now-removed `grunt.utils`.
  * Changed `util._` to use [Lo-Dash](http://lodash.com/)
  * Added the [util.callbackify](grunt.util#wiki-grunt-util-callbackify) method.
  * Changed the [util.spawn](grunt.util#wiki-grunt-util-spawn) method to be much better behaved and pass more consistent arguments into its callback.

## Task / plugin authors
**Plugin authors, please indicate clearly on your repository README which version number of your Grunt plugin breaks compatibility with Grunt 0.3.**

### Tasks
* Multi tasks
  * Multiple src-dest file mappings may now be specified per target in a `files` object (this is optional).
* [this.files / grunt.task.current.files](grunt.task#wiki-this-files)
  * The `this.files` property is an array of src-dest file mapping objects to be iterated over in your multi task. It will always be an array, and you should always iterate over it, even if the most common use case is to specify a single file.
  * Each src-dest file mapping object has a `src` and `dest` property (and possibly others, depending on what the user specified). The `src` property is already expanded from whatever glob pattern the user may have specified.
* [this.filesSrc / grunt.task.current.filesSrc](grunt.task#wiki-this-filesSrc)
  * The `this.filesSrc` property is a reduced, uniqued array of all files matched by all specified `src` properties. Useful for read-only tasks.
* [this.options / grunt.task.current.options](grunt.task#wiki-this-options)
  * The `this.options` method may be used within tasks to normalize options. Inside a task, you may specify options defaults like: `var options = this.options({option: 'defaultvalue', ...});`

### Plugins
* An updated `gruntplugin` template has been created for Grunt 0.4-compatible plugins, and is available in the standalone [grunt-init].

## Troubleshooting
* If you had previously installed a development version of Grunt 0.4 or any grunt-contrib plugins, be sure to flush your npm cache with `npm cache clean` first to ensure that you are pulling the final version of Grunt and grunt-contrib plugins.

[grunt-init]: https://github.com/gruntjs/grunt-init