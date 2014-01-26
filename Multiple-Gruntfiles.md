## Managing Large Scale and Complex Projects

Grunt offers infinite ways to get extended and configured, easily tackling the most demanding build flows out there. In this article a sensible setup for complex build flows will be presented, it will demonstrate how you can scale Grunt to use in large and distributed teams and perform complex and optimized builds.


## General Principle

Much like your `package.json` file, there should be one **and only one** `Gruntfile.js` per repository.

This cannot be stressed enough. Scenarios that require multiple Gruntfiles can really be solved by using simpler setups and infrastructure. Since Grunt is mostly about frontend build flows, let's examine the most common complex requirement, third-party libraries...


## Handling Frontend Dependencies

All frontend third-party libraries provide a build version. `jQuery.min.js`, that's what your application needs to consume, clean and simple. The fact that jQuery has it's own `Gruntfile.js` in the source repository is absolutely irrelevant to your build flow. Another package may use a `Makefile` instead or any other means of creating the end product. You should never have to deal with what tools the third-party library author uses to produce the build.

If your intention is to include the library in your final bundle, then you should use the file provided by the author and not make your own build from source. If however you want to include parts of the library's source in your bundle, that's a different story and is what this article is about.

### Custom builds from third-party libraries

In order to directly require the sources of a third-party library, you need to use exactly the same or a compatible dependency system. So if you are using [requireJS](http://requirejs.org/) in your frontend application and the library is authored using a different one, you can't just `require()` the *Modules* in your app. For such Dependency System incompatibilities you need to take the explicit way of defining the dependencies and name them one by one, file by file. So after you solve the Dependency challenge you are ready to start designing the build flow.

Suppose you use [Bower](http://bower.io) to handle your front-end dependencies and you decide to use the [Twitter's Bootstrap](http://getbootstrap.com/) CSS framework. You will install bootstrap locally using the following command:

```shell
bower install bootstrap --save
```

This command will install Twitter's Bootstrap in the `components/` directory (configurable) and will update your `bower.json` file. At the time this article was authored the directory `components/bootstrap/` contained these three folders:

```
- dist/
- js/
- less/
```

While the directory names may change in the future, the meaning behind them will not, these three folders represent the following semantic explanations:

```
- dist/  # Here is where the library's Build files exist
- js/    # Here are the Javascript Sources
- less/  # Here are the **Less** Sources
```

To not over complicate things we assume our imaginary project also uses **Less** so we have Dependency System compatibility as far as Stylesheets go. Including any of Bootstrap's *Less Modules* is as easy as adding a require statement on top of your less files! For our example there are two Less files, `main.less` and `frontpage.less`, and they both are in the `less/` directory.:


```
- components/
  |- bootstrap/
    |- ...
- less/
  |- main.less
  |- frontpage.less
```

So here's how `main.less` would look like:

```less
# Select only the parts we need from bootstrap
@import "../components/bootstrap/less/forms";
@import "../components/bootstrap/less/print";

# Require our application's less files
@import "frontpage";
```

This import statement requires only specific parts of the Bootstrap framework, the parts that we need, thus producing a smaller end product, faster download times, billions.

It's also clear at this point that the only thing that you need to do is define a very simple *Less Task* configuration in your Project's Gruntfile:

```js
module.exports = function(grunt) {
  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // compile less -> css
    less: {
      production: {
        options: {
          paths: ['less', 'components/bootstrap/less'],
        },
        files: {
          'dist/css/main.css': 'less/main.less'
        }
      }
    },
};

```
And that is pretty much it, you can directly include only the parts of a third-party library and produce your own custom build.

## Extending your Gruntfile for Teams

Each team has its own unique workflow, policies and legacy that needs to be expressed in a build flow. When dealing with large scale projects spanning throughout a team or even when multiple teams are involved, the complexity of the build flows can become daunting. At these scenarios it is important to properly identify and classify the different parts of your application that developers or teams are working on. A rule of thumb here is to classify all legacy code as a third-party library and treat its build flow as such, like previously described in this article.

Another rule of thumb in classifying the parts, is if they are isolated enough from the main application that they require their own build flows. These are the cases where a Module of a project has grown enough to require it's own test suite, linting guides and a bunch of custom tasks. That's the time to break apart this module into a separate repository, make it a project on its own and require it in your main project as a third-party dependency. Since the Dependency Systems will be the same you can just follow the solution described in the [Handling Frontend Dependencies][] part of this article.

For the cases that do not fall under any of the above categories what you need to do next is break your Gruntfile.js apart. That's assuming that your Gruntfile has grown to a point where it's not manageable. There are two parts of Grunt that can be extended, [the configuration directives][extconf] and [the custom tasks][exttask].

### Extending Grunt's Configuration

Grunt's configuration file, `Gruntfile.js`, can be extended in infinite ways. In this chapter we will examine how to break out the task definitions in multiple files and how we can then break out each definition in even more files to achieve code scalability and better maintainability for all teams and co-workers.

#### The grunt.config Method

Grunt's [`grunt.config()`][grunt.config] method enables us to break out task definitions in separate files. Let's see how a setup using `grunt.config` would look like, suppose we want to create a task in the `grunt-tasks/` folder:

##### `grunt-tasks/grunt-github-pages.js`

```js
module.exports = function(grunt) {
  grunt.config('githubPages', {
    target: {
      src: 'build/wwwroot',
    },
  });

  grunt.loadNpmTasks('grunt-github-pages');
};
```


##### Gruntfile.js

Now to include and evaluate this configuration file here's what we need to do in the `Gruntfile.js`:

```js
module.exports = function(grunt) {

  // Initialize config.
  grunt.initConfig({
    pkg: require('./package.json'),
  });

  // Load per-task config from separate files.
  grunt.loadTasks('grunt-tasks');

  grunt.registerTask('deploy',
    'Deploy site via github-pages.',
    ['githubPages']);

  grunt.registerTask('default', ['deploy']);
};
```

So what happens here is that we instruct Grunt to go look in the local folder `grunt-tasks/` and require all files from there. The github-pages file is loaded and evaluated and the configuration *injected* into the main Grunt's process by the use of `grunt.config()`. 

This pattern is your first line of defence when your Gruntfile starts to grow to a non manageable state. You can check out a [sample repo][wesbos repo] made by [Ben Alman][], author of Grunt, that exposes this pattern to its fullest.

#### Breaking out Task Targets into Multiple Files

We saw how we can break out separate Tasks into different files, now let's see how we can do that for each Task's Target. Let's start with the simple truth, Grunt requires nothing but a vanilla Object Literal to be configured. So we can do this:

```js
var gruntConf = {};

gruntConf.less = {};

gruntConf.less.production = {
  options: {
    paths: ['src/less', 'components/bootstrap/less'],
  },
  files: {
    'dist/css/main.css': 'less/main.less'
  }
}
};

gruntConf.less.devone = {}; 
// ... and so on for another 50 Less targets

module.exports = function(grunt) {
  grunt.initConfig(gruntConf);
};

```

Now suppose we want to break out and distribute all the separate less targets because they have grown to a point where they are not manageable. We have one module, ModuleA in the `moduleA/` directory. The team of ModuleA will have a file named `grunt-less.js` where they export their own less targets:

```js
var gruntLess = module.exports = {};

gruntLess.moduleADev = { /* ... */ };
gruntLess.moduleAStage = { /* ... */ };
gruntLess.moduleAProd = { /* ... */ };
```

Now to include those less targets all we have to do is require that file and extend our own `gruntConf.less` object:

```js
var _ = require('lodash');
var moduleAless = require('./moduleA/grunt-less');

var gruntConf = {};

gruntConf.less = {};

gruntConf.less.production = { /* ... */ };

// Add the Less targets from ModuleA
_.extend(gruntConf.less, moduleAless);

module.exports = function(grunt) {
  grunt.initConfig(gruntConf);
};

```

So using this method, all the ModuleA folks need to do to make their own builds is using their Less target name in the command line:

```shell
$ grunt less:moduleADev
```

Following this pattern you can extend all and every task that you or your teams are using. You don't have to create a separate `grunt-*.js` file, just define a way of how each file exports what, and enforce the policy throughout your organization.

### Extending Grunt's Custom Tasks

A custom task is whatever you create using any of the [Creating Tasks](http://gruntjs.com/api/grunt#creating-tasks) methods. You can easily remove those custom tasks from your `Gruntfile.js` and into their own files using this very straightforward way:

#### tasks/customTaskOne.js

```js
module.exports = function (grunt) {
  // Custom task to ...
  grunt.registerTask('customTaskOne', 'Compile yadda yadda', function () {
    grunt.log.ok('Generating yadda yadda...');
    /* ... */
  });
};
```

#### Gruntfile.js

```js
module.exports = function(grunt) {
  // load all custom tasks
  grunt.task.loadTasks('tasks');

  // Project configuration.
  grunt.initConfig({});
};
```

So, bottom line, to properly extend your custom tasks [`grunt.task.loadTasks`](http://gruntjs.com/api/grunt.task#grunt.task.loadtasks) is your friend.

[Handling Frontend Dependencies]: #handling-frontend-dependencies
[extconf]: #extending-grunts-configuration
[exttask]: #extending-grunts-custom-tasks
[grunt.config]: http://gruntjs.com/api/grunt.config
[Ben Alman]: https://github.com/cowboy
[wesbos repo]: https://github.com/cowboy/wesbos

