## The Gruntfile
(mention it, link to it in the getting started guide)

## File globbing


## Multi tasks

### Targets

### The options object
Grunt will now merge options defined at the task level with each target (as long as the task has been updated to support grunt 0.4).  As a result, you can now share your configuration across multiple targets.  In the example below, both the `dev` and `prod` targets will inherit the options defined at the top level before the task is run.  Target level options can override task level options.

```js
requirejs: {
  options: {
    baseUrl: './app',
    name: 'lib/almond/almond',
    include: 'app',
    mainConfigFile: 'app/config.js',
    out: 'build/js/app.js',
    wrap: true,
  },
  dev: {
    options: {
      optimize: 'none'
    }
  },
  prod: {
    options: {
      optimize: 'uglify',
      out: 'build/js/app.min.js'
    }
  }
}
```

### The files object

### Building the files object dynamically


## "Basic" tasks
(explanation that configuring tasks is sometimes entirely up to the task author)