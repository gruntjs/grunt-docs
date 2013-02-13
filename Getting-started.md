Grunt and grunt plugins are installed and managed via [npm](https://npmjs.org/), the [Node.js](http://nodejs.org/) package manager.

_These instructions are written for grunt 0.4.x, but are still valid for grunt 0.3.x. Just note that for 0.3.x, plugin names and task configuration options may be different than those shown in "The Gruntfile" section._

## Installing the CLI
**If you have installed grunt globally in the past, you will need to remove it first:**

```shell
npm uninstall -g grunt
```

In order to get started, you'll want to install grunt's command line interface (CLI) globally.  You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

```shell
npm install -g grunt-cli
```

This will put the `grunt` command in your system path, allowing it to be run from any directory.

Note that installing `grunt-cli` does not install the grunt task runner!  The job of the grunt CLI is simple: run the version of grunt which has been installed next to a `Gruntfile`. This allows multiple versions of grunt to be installed on the same machine simultaneously.

## How the CLI works

Each time `grunt` is run, it looks for a locally installed grunt using node's `require()` system. Because of this, you can run `grunt` from any subfolder in your project.

If a locally installed grunt is found, the CLI loads the local installation of the grunt library, applies the configuration from your `Gruntfile`, and executes any tasks you've requested for it to run.

*To really understand what is happening, [read the code](https://github.com/gruntjs/grunt-cli/blob/master/bin/grunt).  It's very short.*

## Working with an existing grunt project
Assuming that the grunt CLI has been installed and that the project has already been configured with a `package.json` and a `Gruntfile`, it's very easy to start working with grunt:

1. Change to the project's root directory.
1. Install project dependencies with `npm install`.
1. Run grunt with `grunt`.

That's really all there is to it. Installed grunt tasks can be listed by running `grunt --help` but it's usually a good idea to start with the project's documentation.

## Preparing a new grunt project
A typical setup will involve adding two files to your project: `package.json` and the `Gruntfile`.

**package.json**: This file is used by [npm] to store metadata for projects published as npm modules.  You will list grunt and the grunt plugins your project needs as [devDependencies] in this file.

**Gruntfile**: This file is named `Gruntfile.js` or `Gruntfile.coffee` and is used to configure or define tasks and load grunt plugins. 

_This file was named `grunt.js` for 0.3.x versions of grunt._

## package.json

The `package.json` file belongs in the root directory of your project, next to the `Gruntfile`, and should be committed with your project source.  Running `npm install` in the same folder as a `package.json` file will install the correct version of each dependency listed therein.

There are a few ways to create a `package.json` file for your project:

* Most [grunt-init] templates will automatically create a project-specific `package.json` file.
* The [npm init] command will create a basic `package.json` file.
* Start with the example below, and expand as needed, following this [specification][json].

```js
{
  "name": "my-project-name",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "0.4.0rc7",
    "grunt-contrib-jshint": "0.1.1rc6",
    "grunt-contrib-nodeunit": "0.1.2rc6"
  }
}
```

### Installing grunt and grunt plugins
The easiest way to add grunt and grunt plugins to an existing `package.json` is with the command `npm install <module> --save-dev`.  Not only will this install `<module>` locally, but it will automatically be added to the [devDependencies] section, using a [tilde version range].

For example, this will install the latest 0.4.0 release candidate of grunt in your project folder, adding it to your devDependencies:

```shell
npm install grunt@0.4.0rc7 --save-dev
```

The same can be done for grunt plugins and other node modules. Be sure to commit the updated `package.json` file with your project when you're done!

_Note: until 0.4.0 is officially released, a list of updated contrib plugins compatible with the latest release candidate can be found in the [[Plugin Release Candidate Versions]] guide._

<!--
For example, this will install the latest version of grunt in your project folder, adding it to your devDependencies:

```shell
npm install grunt --save-dev
```
-->

## The Gruntfile
The `Gruntfile.js` or `Gruntfile.coffee` file is a valid JavaScript or CoffeeScript file that belongs in the root directory of your project, next to the `package.json` file, and should be committed with your project source. _This file was named `grunt.js` for 0.3.x versions of grunt._

A Gruntfile is comprised of the following parts:

* The "wrapper" function
* Project and task configuration
* Loading grunt plugins and tasks
* Custom tasks

### An example Gruntfile
In the following Gruntfile, project metadata is imported into the grunt config from the project's `package.json` file and the [grunt-contrib-uglify] plugin's `uglify` task is configured to minify a source file and generate a banner comment dynamically using that metadata. When grunt is run on the command line, the `uglify` task will be run by default.

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
```

Now that you've seen the whole Gruntfile, let's look at its component parts.

### The "wrapper" function
Every Gruntfile (and grunt plugin) uses this basic format, and all of your grunt code must be specified inside this function:

```js
module.exports = function(grunt) {
  // Do grunt-related things in here
};
```

### Project and task configuration
Most grunt tasks rely on configuration data defined in an object passed to the [[grunt.initConfig|grunt#grunt.initconfig]] method.

In this example, `grunt.file.readJSON('package.json')` imports the JSON metadata stored in `package.json` into the grunt config. Because `<% %>` template strings may reference any config properties, configuration data like filepaths and file lists may be specified this way to reduce repetition.

You may store any arbitrary data inside of the configuration object, and as long as it doesn't conflict with properties your tasks require, it will be otherwise ignored. Also, because this is JavaScript, you're not limited to JSON; you may use any valid JS here. You can even programmatically generate the configuration if necessary.

Like most tasks, the [grunt-contrib-uglify] plugin's `uglify` task expects its configuration to be specified in a property of the same name. Here, the `banner` option is specified, along with a single uglify target named `build` that minifies a single source file to a single destination file.

```js
// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'build/<%= pkg.name %>.min.js'
    }
  }
});
```

### Loading grunt plugins and tasks
Many commonly used tasks like [concatenation], [minification][grunt-contrib-uglify] and [linting] are available as [grunt plugins](https://github.com/gruntjs). As long as a plugin is specified in `package.json` as a dependency, and has been installed via `npm install`, it may be enabled inside your `Gruntfile` with a simple command:

```js
// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
```

**Note:** the `grunt --help` command will list all available tasks.

### Custom tasks
You can configure grunt to run one or more tasks by default by defining a `default` task. In the following example, running `grunt` at the command line without specifying a task will run the `uglify` task. This is functionally the same as explicitly running `grunt uglify` or even `grunt default`. Any number of tasks (with or without arguments) may be specified in the array.

```js
// Default task(s).
grunt.registerTask('default', ['uglify']);
```

If your project requires tasks not provided by a [grunt plugin][grunt plugins], you may define custom tasks right inside the `Gruntfile`. For example, this Gruntfile defines a completely custom `default` task that doesn't even utilize task configuration:

```js
module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};
```

Custom project-specific tasks don't need to be defined in the Gruntfile; they may be defined in external `.js` files and loaded via the [[gruntgrunt.loadTasks|grunt#grunt.loadtasks]] method.

## Further Reading

* The [[Installing grunt]] guide has detailed information about installing specific, production or in-development, versions of grunt and grunt-cli.
* The [[Configuring Tasks]] guide has an in-depth explanation on how to configure tasks, targets, options and files inside the Gruntfile, along with an explanation of templates, globbing patterns and importing external data.
* The [[Creating Tasks]] guide lists the differences between the types of grunt tasks and shows a number of sample tasks and configurations.
* For more information about writing custom tasks or grunt plugins, check out the [[developer documentation|grunt]].

[npm]: https://npmjs.org/
[devDependencies]: https://npmjs.org/doc/json.html#devDependencies
[json]: https://npmjs.org/doc/json.html
[npm init]: https://npmjs.org/doc/init.html
[grunt-init]: Project-Scaffolding
[tilde version range]: https://npmjs.org/doc/json.html#Tilde-Version-Ranges
[grunt-contrib-uglify]: http://github.com/gruntjs/grunt-contrib-uglify
[concatenation]: https://github.com/gruntjs/grunt-contrib-concat
[linting]: https://github.com/gruntjs/grunt-contrib-jshint
[grunt.loadTasks]: https://github.com/gruntjs/grunt/wiki/grunt.task