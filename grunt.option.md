The Grunt option API is for sharing parameters across multiple tasks and accessing parameters set on the command line.

An example would be a flag to target whether your build is for development or staging. On the command line: `grunt deploy --target=staging` would cause `grunt.option('target')` to return `"staging"`.

An example `Gruntfile` to utilize the `target` option could be:

```javascript
grunt.initConfig({
  compass: {
   dev: {
     options: {
       /* ... */
       outputStyle: 'expanded'
      },
    },
    staging: {
      options: {
        /* ... */
        outputStyle: 'compressed'
      },
    },
  },
});
var target = grunt.option('target') || 'dev';
grunt.registerTask('deploy', ['compass:' + target]);
```

As you run `grunt deploy` your stylesheets would default to the `dev` target and output the CSS in the expanded format. If you ran `grunt deploy --target=staging` the `staging` target would instead be ran and your CSS would be in the compressed format.

`grunt.option` can be used within tasks as well, for example:

```javascript
grunt.registerTask('upload', 'Upload code to specified target.', function(n) {
  var target = grunt.option('target');
  // do something useful with target here
});
grunt.registerTask('deploy', ['validate', 'upload']);
```

_Note that boolean options can be specified using just a key without a value. For example, running `grunt deploy --staging` on the command line would cause `grunt.option('staging')` to return `true`._

_There is a bug preventing boolean options from working correctly in 0.4.5.  You can only have a single boolean option, and it must be specified last on the command-line.  This bug will be fixed in Grunt 0.5.0._


### grunt.option ☃
Gets or sets an option.

```javascript
grunt.option(key[, val])
```

Boolean options can be negated by prepending `no-` onto the `key`. For example:

```javascript
grunt.option('staging', false);
var isDev = grunt.option('no-staging');
// isDev === true
```

### grunt.option.init
Initialize `grunt.option`. If `initObject` is omitted option will be initialized to an empty object otherwise will be set to `initObject`.

```javascript
grunt.option.init([initObject])
```

### grunt.option.flags
Returns the options as an array of command line parameters.

```javascript
grunt.option.flags()
```
