Grunt plugins define tasks that implement certain build steps and can be reused across multiple projects. The examples will use the plugin _"grunt-contrib-uglify"_. Check the [Grunt website](http://gruntjs.com/) for a list of available plugins.

## Installing a Grunt plugin

The first step to using an existing Grunt plugin is to install it.Grunt plugins are packaged as node modules and can be installed using [npm](http://npmjs.org) like this:

`npm install --save-dev grunt-contrib-uglify`

This will install the Grunt plugin _"grunt-contrib-uglify"_ locally into the `node_modules` folder (cf. [npm folders](https://docs.npmjs.com/files/folders)).
Plugins must be installed locally to avoid version conflicts when working with multiple projects.

Specifying `--save-dev` as option automatically adds this Grunt plugin to the _"devDependency"_ section in the `package.json` file. This file lists all node dependencies of a project.
Adding the Grunt plugin there will allow other developers working on the project to simply run `npm install` to locally install these required dependencies.

## Loading plugin tasks

Now that the plugin is installed, it is time to tell Grunt about it and let it load all defined tasks. To do this, add the following line to your `Gruntfile.js`:

`grunt.loadNpmTasks('grunt-contrib-uglify')`

This line should be added within the top level function scope (not the initConfig section) where other `grunt.registerTask()` calls are made.

## Running plugin tasks

Plugin tasks can be run like other Grunt tasks either by specifying them on the command line:

`grunt uglify`

Or by registering a new task alias which calls this task, and running that task:

`grunt.registerTask("dist", ["uglify"])`

## Configuring plugins

Plugin configuration depends on the specific plugin, so check the plugin's documentation for further information. Generally the configuration is located in the `initConfig` section of the Gruntfile.

**TODO**: Configuration Targets/options (Merge [Configuring tasks](Configuring tasks)?)
