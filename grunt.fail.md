For when something goes horribly wrong.

See the [fail lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/fail.js) for more information.

## The fail API

If something explodes (or is about to explode) inside a task, it can force Grunt to abort. See the [exit codes documentation](Exit-Codes) for a list of all built-in Grunt exit codes.

Note that any method marked with a ☃ (unicode snowman) is also available directly on the `grunt` object. Just so you know. See the [API main page](grunt) for more usage information.

### grunt.warn ☃
Display a warning and abort Grunt immediately. Grunt will continue processing tasks if the `--force` command-line option was specified. The `error` argument can be a string message or an error object.

```javascript
grunt.fail.warn(error [, errorcode])
```

If `--debug 9` is specified on the command-line and an error object was specified, a stack trace will be logged.

_This method is also available as `grunt.warn`._

### grunt.fatal ☃
Display a warning and abort Grunt immediately. The `error` argument can be a string message or an error object.

```javascript
grunt.fail.fatal(error [, errorcode])
```

If `--debug 9` is specified on the command-line and an error object was specified, a stack trace will be logged.

A beep is emitted on fatal unless the `--no-color` option is specified.

_This method is also available as `grunt.fatal`._
