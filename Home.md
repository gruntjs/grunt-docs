## Introduction

### [[Why Grunt?]]
* Possibly link to [Why grunt? Why not something else?](http://benalman.com/news/2012/08/why-grunt/)


### [[Getting Started]]
* The CLI
* package.json
* The Gruntfile


## Diving into Grunt

### [[Configuring Tasks]]
* File globbing
* Multi tasks
  * Targets
  * The options object
  * The files object
  * Building the files object dynamically
* "Basic" tasks
  * explanation that configuring tasks is sometimes entirely up to the task author


## For Developers

### [[Creating Tasks]]
* Alias tasks
* Multi tasks
* "Basic" tasks
* Testing tasks
* CLI options / environment (pull from FAQ, recommend process.env)
* Why doesn't my asynchronous task complete?

### [[Creating Plugins]]
* Migrating from Gruntfile task to plugin
* The "gruntplugin" init template
* Recommendations
  * Multi task vs basic task
  * Sharing libs across plugins (plus existing libs)
* Requirements
  * keywords
  * grunt version
  * etc?
* Collections

### [[The grunt API]]
* [[grunt.config]]
* [[grunt.event]]
* [[grunt.fail]]
* [[grunt.file]]
* [[grunt.log]]
* [[grunt.task]]
* [[grunt.template]]
* [[grunt.util]]

## [[Advanced Usage]]
* Using in-development features
* Installing grunt-cli locally
* Shell auto-completion
* Using grunt as a lib

## Migration guides

### [[Upgrading from 0.3 to 0.4]]
* Installing grunt
  * grunt-cli global
  * grunt installed locally via package.json
* The Gruntfile
* Built-in tasks are now plugins
  * Name changes, functionality changes
  * Again, package.json
  * Except for init, which is still built-in (for now)
* Multi task changes
  * The files object
  * The options object
* Alias task changes
* Updated "gruntplugin" init template (todo: test)
* Helpers & Directives
  * Gone! Alternatives for sharing code
* Configuration changes
  * No more directives
    * <% %> template tags work in config, even for non-strings
    * Tasks now have options like "banner"
* API changes
  * Event emitting (todo: add more events)
  * Changes with "this" inside multi tasks
  * grunt.utils -> grunt.util
  * List added/changed/removed methods
* Shell auto-completion (todo: test, this might need to move from grunt -> grunt-cli?)
