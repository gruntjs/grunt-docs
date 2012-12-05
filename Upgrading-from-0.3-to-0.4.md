## Installation
Grunt itself should no longer be installed globally.  To install the `grunt` command on your system, run `npm install -g grunt-cli`  As of grunt 0.4, the job of the `grunt` command is to load and run the version of grunt you have installed locally to your project, irrespective of its version.  For more information about why this has changed, [please read this](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation).  For a basic primer on setting up grunt, please read [[Getting started]].

## The Gruntfile


## Built-in tasks are now plugins (mostly)
* Name changes, functionality changes
* Again, package.json
* grunt-init is now a separate, globally-installed module


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