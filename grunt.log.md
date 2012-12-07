Output messages to the console.

See the [log lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/log.js) for more information.

## The log API
Grunt output should look consistent, and maybe even pretty. As such, there is a plethora of logging methods, and a few useful patterns. All of the methods that actually log something are chainable.

_Note: all methods available under `grunt.verbose` work exactly like `grunt.log` methods, but only log if the `--verbose` command-line option was specified._

<a name="grunt-log-write"></a>
### grunt.log.write / grunt.verbose.write
Log the specified `msg` string, with no trailing newline.

```javascript
grunt.log.write(msg)
```

<a name="grunt-log-writeln"></a>
### grunt.log.writeln / grunt.verbose.writeln
Log the specified `msg` string, with trailing newline.

```javascript
grunt.log.writeln([msg])
```

<a name="grunt-log-error"></a>
### grunt.log.error / grunt.verbose.error
If `msg` string is omitted, logs `ERROR` in red, otherwise logs `>> msg`, with trailing newline.

```javascript
grunt.log.error([msg])
```

<a name="grunt-log-errorlns"></a>
### grunt.log.errorlns / grunt.verbose.errorlns
Log an error with `grunt.log.error`, wrapping text to 80 columns using `grunt.log.wraptext`.

```javascript
grunt.log.errorlns(msg)
```

<a name="grunt-log-ok"></a>
### grunt.log.ok / grunt.verbose.ok
If `msg` string is omitted, logs `OK` in green, otherwise logs `>> msg`, with trailing newline.

```javascript
grunt.log.ok([msg])
```

<a name="grunt-log-oklns"></a>
### grunt.log.oklns / grunt.verbose.oklns
Log an ok message with `grunt.log.ok`, wrapping text to 80 columns using `grunt.log.wraptext`.

```javascript
grunt.log.oklns(msg)
```

<a name="grunt-log-subhead"></a>
### grunt.log.subhead / grunt.verbose.subhead
Log the specified `msg` string in **bold**, with trailing newline.

```javascript
grunt.log.subhead(msg)
```

<a name="grunt-log-writeflags"></a>
### grunt.log.writeflags / grunt.verbose.writeflags
Log a list of `obj` properties (good for debugging flags).

```javascript
grunt.log.writeflags(obj, prefix)
```

<a name="grunt-log-debug"></a>
### grunt.log.debug / grunt.verbose.debug
Logs a debugging message, but only if the `--debug` command-line option was specified.

```javascript
grunt.log.debug(msg)
```

## Verbose and Notverbose
All logging methods available under `grunt.verbose` work exactly like their `grunt.log` counterparts, but only log if the `--verbose` command-line option was specified. There is also a "notverbose" counterpart available at both `grunt.log.notverbose` and `grunt.log.verbose.or`. In fact, the `.or` property can be used on both `verbose` and `notverbose` to effectively toggle between the two.

<a name="grunt-verbose"></a>
### grunt.verbose / grunt.log.verbose
This object contains all methods of `grunt.log` but only logs if the `--verbose` command-line option was specified.

```javascript
grunt.verbose
```

<a name="grunt-verbose-or"></a>
### grunt.verbose.or / grunt.log.notverbose
This object contains all methods of `grunt.log` but only logs if the `--verbose` command-line option was _not_ specified.

```javascript
grunt.verbose.or
```

## Utility Methods
These methods don't actually log, they just return strings that can be used in other methods.

<a name="grunt-log-wordlist"></a>
### grunt.log.wordlist
Returns a comma-separated list of `arr` array items.

```javascript
grunt.log.wordlist(arr [, options])
```

The `options` object has these possible properties, and default values:

```javascript
var options = {
  // The separator string (can be colored).
  separator: ', ',
  // The array item color (specify false to not colorize).
  color: 'cyan',
};
```

<a name="grunt-log-uncolor"></a>
### grunt.log.uncolor
Removes all color information from a string, making it suitable for testing `.length` or perhaps logging to a file.

```javascript
grunt.log.uncolor(str)
```

<a name="grunt-log-wraptext"></a>
### grunt.log.wraptext
Wrap `text` string to `width` characters with `\n`, ensuring that words are not split in the middle unless absolutely necessary.

```javascript
grunt.log.wraptext(width, text)
```

<a name="grunt-log-table"></a>
### grunt.log.table
Wrap `texts` array of strings to columns `widths` characters wide. A wrapper for the `grunt.log.wraptext` method that can be used to generate output in columns.

```javascript
grunt.log.table(widths, texts)
```

## An Example

A common pattern is to only log when in `--verbose` mode OR if an error occurs, like so:

```javascript
grunt.registerTask('something', 'Do something interesting.', function(arg) {
  var msg = 'Doing something...';
  grunt.verbose.write(msg);
  try {
    doSomethingThatThrowsAnExceptionOnError(arg);
    // Success!
    grunt.verbose.ok();
  } catch(e) {
    // Something went wrong.
    grunt.verbose.or.write(msg).error().error(e.message);
    grunt.fail.warn('Something went wrong.');
  }
});
```

An explanation of the above code:

1. `grunt.verbose.write(msg);` logs the message (no newline), but only in `--verbose` mode.
2. `grunt.verbose.ok();` logs OK in green, with a newline.
3. `grunt.verbose.or.write(msg).error().error(e.message);` does a few things:
  1. `grunt.verbose.or.write(msg)` logs the message (no newline) if not in `--verbose` mode, and returns the `notverbose` object.
  2. `.error()` logs ERROR in red, with a newline, and returns the `notverbose` object.
  3. `.error(e.message);` logs the actual error message (and returns the `notverbose` object).
4. `grunt.fail.warn('Something went wrong.');` logs a warning in bright yellow, exiting grunt with exit code 1, unless `--force` was specified.

Take a look at the [grunt-contrib-* tasks source code](https://github.com/gruntjs) for more examples.
