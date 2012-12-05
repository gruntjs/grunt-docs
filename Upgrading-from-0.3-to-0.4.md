## Installation
Grunt is now split into two parts, `grunt` and `grunt-cli`.

1. `grunt` is the core library that gets installed locally to your project. It contains all the code and logic for running tasks, loading plugins, etc. Install locally, per the [[Getting started]] guide.
1. `grunt-cli` is installed globally, giving you the `grunt` command in your shell. It doesn't do anything by itself, but when run inside a project where `grunt` has been installed, will actually run grunt. Install globally, per the [[Getting started]] guide.

For more information about why this has changed, please read [npm 1.0: Global vs Local installation](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation).

## The Gruntfile


## Core Tasks
The standard plugins that shipped with Grunt 0.3 are now discreet npm modules that must be included in your project's package.json devDependencies.

* lint -> [grunt-contrib-jshint](/gruntjs/grunt-contrib-jshint)
* concat -> [grunt-contrib-concat](/gruntjs/grunt-contrib-concat)
* min -> [grunt-contrib-uglify](/gruntjs/grunt-contrib-uglify)
* qunit -> [grunt-contrib-qunit](/gruntjs/grunt-contrib-qunit)
* server -> [grunt-contrib-connect](/gruntjs/grunt-contrib-connect)
* watch -> [grunt-contrib-watch](/gruntjs/grunt-contrib-watch)

Configuration formats may have changed slightly, please see the documentation for each plugin as linked above.

## grunt init

i'm writing this now


## Multi task changes
* The files object
* The options object


## Alias task changes


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