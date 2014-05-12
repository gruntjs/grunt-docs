Access project-specific configuration data defined in the Gruntfile.

Note that any method marked with a ☃ (unicode snowman) is also available directly on the `grunt` object, and any method marked with a ☆ (white star) is also available inside tasks on the `this` object. Just so you know.

## Initializing Config Data
_Note that the following method is also available on the `grunt` object as `grunt.initConfig`._

### grunt.config.init ☃
Initialize a configuration object for the current project. The specified `configObject` is used by tasks and can be accessed using the `grunt.config` method. Nearly every project's `Gruntfile` will call this method.

```js
grunt.config.init(configObject)
```

Note that any specified `<% %>` template strings will be processed when config data is retrieved.

This example contains sample config data for the [grunt-contrib-jshint plugin](https://github.com/gruntjs/grunt-contrib-jshint) `jshint` task:

```js
grunt.config.init({
  jshint: {
    all: ['lib/*.js', 'test/*.js', 'Gruntfile.js']
  }
});
```

See the [[Getting started]] guide for more configuration examples.

_This method is also available as `grunt.initConfig`._


## Accessing Config Data
The following methods allow Grunt configuration data to be accessed either via dot-delimited string like `'pkg.author.name'` or via array of property name parts like `['pkg', 'author', 'name']`.

Note that if a specified property name contains a `.` dot, it must be escaped with a literal backslash, eg. `'concat.dist/built\\.js'`. If an array of parts is specified, Grunt will handle the escaping internally with the `grunt.config.escape` method.

### grunt.config
Get or set a value from the project's Grunt configuration. This method serves as an alias to other methods; if two arguments are passed, `grunt.config.set` is called, otherwise `grunt.config.get` is called.

```js
grunt.config([prop [, value]])
```

### grunt.config.get
Get a value from the project's Grunt configuration. If `prop` is specified, that property's value is returned, or `null` if that property is not defined. If `prop` isn't specified, a copy of the entire config object is returned. Templates strings will be recursively processed using the `grunt.config.process` method.

```js
grunt.config.get([prop])
```

### grunt.config.process
Process a value, recursively expanding `<% %>` templates (via the `grunt.template.process` method) in the context of the Grunt config, as they are encountered. this method is called automatically by `grunt.config.get` but _not_ by `grunt.config.getRaw`.

```js
grunt.config.process(value)
```

If any retrieved value is entirely a single `'<%= foo %>'` or `'<%= foo.bar %>'` template string, and the specified `foo` or `foo.bar` property is a non-string (and not `null` or `undefined`) value, it will be expanded to the _actual_ value. That, combined with grunt's task system automatically flattening arrays, can be extremely useful.

### grunt.config.getRaw
Get a raw value from the project's Grunt configuration, without processing `<% %>` template strings. If `prop` is specified, that property's value is returned, or `null` if that property is not defined. If `prop` isn't specified, a copy of the entire config object is returned.

```js
grunt.config.getRaw([prop])
```

### grunt.config.set
Set a value into the project's Grunt configuration.

```js
grunt.config.set(prop, value)
```

Note that any specified `<% %>` template strings will only be processed when config data is retrieved.

### grunt.config.escape
Escape `.` dots in the given `propString`. This should be used for property names that contain dots.

```js
grunt.config.escape(propString)
```

### grunt.config.merge
*Added in 0.4.5*

Recursively merges properties of the specified `configObject` into the current project configuration.

```js
grunt.config.merge(configObject)
```


## Requiring Config Data
_Note that the method listed below is also available inside tasks on the `this` object as `this.requiresConfig`._

### grunt.config.requires ☆
Fail the current task if one or more required config properties is missing, `null` or `undefined`. One or more string or array config properties may be specified.

```js
grunt.config.requires(prop [, prop [, ...]])
```

_This method is also available inside tasks as `this.requiresConfig`._
