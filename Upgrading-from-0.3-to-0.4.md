## Installing grunt
Grunt is now split into two parts, `grunt` and `grunt-cli`.

1. `grunt` is the core library that gets installed locally to your project. It contains all the code and logic for running tasks, loading plugins, etc. Install locally, along with grunt plugins, per the [[Getting started]] guide.
1. `grunt-cli` is installed globally, giving you the `grunt` command in your shell. It doesn't do anything by itself, but will run a project's locally-installed grunt using the project's Gruntfile. Install globally, per the [[Getting started]] guide.

For more information about why this has changed, please read [npm 1.0: Global vs Local installation](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation).

## grunt-init
The grunt 0.3 init task has been broken out into a separate [grunt-init](/gruntjs/grunt-init) utility that may be installed globally with `npm install -g grunt-init` and run with the `grunt-init` command.

See the [grunt-init project page](/gruntjs/grunt-init) for more information.

TODO: explain changes in init templates

## The Gruntfile
The Gruntfile filename has changed to `Gruntfile.js` or `Gruntfile.coffee`.

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

## Task configuration
Specifying task options and files has been standardized in grunt 0.4. Options can be specified at both the task and target level, allowing target-level options to override more general task-level options. Multiple file src/dest groupings can be specified per-target.

See the [[Configuring tasks]] guide for more information.

## Alias task changes
When specifying an alias task, the list of tasks to run must now be specified as an array.

```js
grunt.registerTask('default', ['jshint', 'nodeunit', 'concat']);
```

## Task arguments can now contain spaces
The aforementioned alias task change (task lists must be specified as an array) makes this possible. Just be sure to surround task arguments containing spaces with quotes when specifying them on the command line, so they can be properly parsed.

```shell
grunt my-task:argument-without-spaces "other-task:argument with spaces"
```



## Helpers & Directives
* Gone! Alternatives for sharing code
* reference grunt-lib-legacyhelpers, it shows a basic shared gruntlib.


## Configuration changes
* No more directives
  * <% %> template tags work in config, even for non-strings
  * Tasks now have options like "banner"


## grunt-init changes
* Updated "gruntplugin" init template (todo: test)
* more stuff?


## API changes
* Event emitting (todo: add more events)
* Changes with "this" inside multi tasks
* grunt.utils -> grunt.util
* List added/changed/removed methods


## Shell auto-completion (todo: test, this might need to move from grunt -> grunt-cli?)


## more??