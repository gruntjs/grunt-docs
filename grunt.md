Grunt exposes all of its methods and properties on the `grunt` object that gets passed into the `module.exports` function exported in your [Gruntfile](Getting-started), Grunt plugin or in a [tasks file](Creating-tasks).

Nearly all of the following methods are defined elsewhere, but are provided directly on the `grunt` object for convenience. See the individual api section docs for detailed explanations and examples.

## Config

### grunt.initConfig
_This method is an alias for the [grunt.config.init](grunt.config#grunt.config.init) method._


## Creating Tasks

### grunt.registerTask
_This method is an alias for the [grunt.task.registerTask](grunt.task#grunt.task.registerTask) method._

### grunt.registerMultiTask
_This method is an alias for the [grunt.task.registerMultiTask](grunt.task#grunt.task.registerMultiTask) method._

### grunt.exists
_This method is an alias for the [grunt.task.exists](grunt.task#grunt.task.exists) method._

### grunt.renameTask
_This method is an alias for the [grunt.task.renameTask](grunt.task#grunt.task.renameTask) method._

## Loading Externally-Defined Tasks

### grunt.loadTasks
_This method is an alias for the [grunt.task.loadTasks](grunt.task#grunt.task.loadTasks) method._

### grunt.loadNpmTasks
_This method is an alias for the [grunt.task.loadNpmTasks](grunt.task#grunt.task.loadNpmTasks) method._


## Warnings and Fatal Errors

### grunt.warn
_This method is an alias for the [grunt.fail.warn](grunt.fail#grunt.fail.warn) method._

### grunt.fatal
_This method is an alias for the [grunt.fail.fatal](grunt.fail#grunt.fail.fatal) method._


## Command-line Options

### grunt.option
Retrieve the value of a command-line option, eg. `debug`. Note that for each command-line option, the inverse can be tested, eg. `no-debug`.

```javascript
grunt.option(optionName)
```

## Miscellaneous

### grunt.package
The current Grunt `package.json` metadata, as an object.

```javascript
grunt.package
```

### grunt.version
The current Grunt version, as a string. This is just a shortcut to the `grunt.package.version` property.

```javascript
grunt.version
```
