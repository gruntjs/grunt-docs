* Options object: #302
* Migration doc: #203, #350
* Normalized file object: #457, #266
* Build files object dynamically: #450
* Don't change cwd: #423
* Task installation: #303 (lets reference https://npmjs.org/doc/faq.html about where npm puts stuff)
* File globbing: #300
* Stack Overflow: #249
* concat / min banner option: #233
* default behavior for missing files is to log the error and continue
* sharing params across tasks: https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#how-can-i-share-parameters-across-multiple-tasks


# Introduction

## Getting Started With Grunt

## Diving into Grunt

### Tasks / Multi-tasks & Targets
### Options Hierarchy
### Dynamic file objects (one-to-one conversions)

## Developers
### Writing tasks (high level overview including task types)
### Testing tasks
### API
#### file
#### util
#### log
#### template

## FAQ



## Ben's list

Getting Started
* The CLI
* package.json
* The Gruntfile

Creating Tasks
* Alias tasks
* Multi tasks
* "Basic" tasks

Configuring Tasks
* File globbing
* Multi tasks
  * Targets
  * The options object
  * The files object
* "Basic" tasks
  * -explanation that it's entirely up to the task author-

Migration guide
* 0.3 -> 0.4
  * Installing grunt
    * grunt-cli global
    * grunt installed locally via package.json
  * The Gruntfile
  * Built-in tasks are now plugins
    * Name changes, functionality changes
    * Again, package.json
  * Multi task changes
    * The files object
    * The options object
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

API
* All the things

