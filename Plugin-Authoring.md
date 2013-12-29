# What Is A Grunt plugin?

In Grunt you can quickly create [custom tasks](/creating-tasks#custom-tasks) by registering your task with:

	grunt.registerTask('mycustomtask', 'My "mycustomtask" task description.', function() {
	  // Awesome custom functionality.
	});

and placing it at the bottom of your Gruntfile.

Grunt plugins are actually nothing else but custom Grunt tasks separated out into a file, packaged up as Node modules and distributed over npm.

# General Plugin Structure

In order to create a plugin, it is recommended to use grunt-init or Yeoman to scaffold a skeleton for your plugin.

When you use grunt-init and the gruntplugin template you can scaffold a plugin with `grunt-init gruntplugin`. grunt-init will scaffold out a project structure that will look like this:

(INSERT IMAGE OF DIR STRUCTURE HERE)

Notice the two most important items in your folder:
* the "tasks" folder
* the "package.json" file

Just with those two items alone this would be a functioning plugin that could be published to npm as a node module.

The tasks folder contains your extracted `registerTask` function that we showed above. The file has the same name as your plugin just without the `grunt-` prefix.
The package.json contains all the meta data required to make this a valid npm package.

## package.json: keywords
The keywords property in the package.json is important for discoverability of your plugin since the keywords will be indexed npm's search and your plugin will be listed on gruntjs.com/plugins if you use the the keyword "gruntplugin" as well.

## package.json: dependencies
Any dependencies your plugin has to other node modules can be declared in the package.json's "dependencies"-property. These modules will then be installed with your plugin.

**Pro Tip™:** When you install a dependency to develop your plugin use `npm install <modulename> --save` on the command line. This will automatically update your "dependencies"-property in your package.json with the new.

You can use those dependencies by requiring them at the top of your file with `var someDep = require('<modulename>');` and then use them in your code.

**Pro Tip:** if your plugin requires you to capsule functionality into functions then it makes sense to create a `lib` folder and keep that functionality in modules. You can export those modules with `modules.exports` for testing and require them in your main tasks file like so:
`var myCoolModule = require(../lib/mycoolmodule.js')`.

## Configuration, Testing etc.
Now, all the other files that have been scaffolded by grunt-init are generated for good reasons of course so let's not forget them.

### /test/*
The tasks folder contains an example task that just concatenates strings from files and writes them into another file. The Test folder contains an example test that tests the tasks functionality.

### .gitignore
This file contains sensible ignore rules for Git.

### .jshintrc
This file contains a sensible JSHint configuration. Remember to install a JSHint plugin for your editor.

### Gruntfile.js
This is a preconfigured Gruntfile that lints your JS code and runs the tests.

### LICENSE-MIT
Presumably you are going to open source your plugin. The MIT License is a good license for this case.

### Readme.md
A good default README file that gives you a sensible structure to document your plugin.

# Bundling Up Plugins With `peerDependencies`
If you want to specify a bundle of plugins you can do that by using the [`peerDependencies`](http://blog.nodejs.org/2013/02/07/peer-dependencies/) property in the package.json.

This will ensure that the plugins specified in the peerDependencies property will be installed at the same level as your plugin in the correct versions.

This means you can be sure that when your plugin is installed, all those peer dependencies specified will be installed next to your plugin in the specified versions.

Once example for this is the [`grunt-contrib`](https://github.com/gruntjs/grunt-contrib) plugin which will install the full `grunt-contrib`-suite of plugins for you to check out.

Here the peerDependencies excerpt from grunt-contrib's package.json:

```js
"peerDependencies": {
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-coffee": "~0.7.0",
    "grunt-contrib-compass": "~0.6.0",
    "grunt-contrib-compress": "~0.5.2",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-contrib-connect": "~0.5.0",
    "grunt-contrib-copy": "~0.4.1",
    "grunt-contrib-cssmin": "~0.6.2",
    "grunt-contrib-csslint": "~0.1.2",
    "grunt-contrib-handlebars": "~0.5.11",
    "grunt-contrib-htmlmin": "~0.1.3",
    "grunt-contrib-imagemin": "~0.3.0",
    "grunt-contrib-jade": "~0.8.0",
    "grunt-contrib-jasmine": "~0.5.2",
    "grunt-contrib-jshint": "~0.6.4",
    "grunt-contrib-jst": "~0.5.1",
    "grunt-contrib-less": "~0.7.0",
    "grunt-contrib-nodeunit": "~0.2.1",
    "grunt-contrib-qunit": "~0.3.0",
    "grunt-contrib-requirejs": "~0.4.1",
    "grunt-contrib-sass": "~0.5.0",
    "grunt-contrib-stylus": "~0.8.0",
    "grunt-contrib-uglify": "~0.2.4",
    "grunt-contrib-watch": "~0.5.3",
    "grunt-contrib-yuidoc": "~0.5.0",
    "grunt": "~0.4.0"
  },
```

--

**THIS SECTION IS JUST BRAINDUMP + COMMENTARY FOR NOW**

# Grunt Plugin Authoring Guidlines

I asked Sindre for a quick list fo bullets for what he would like to see in Grunt plugin authoring guidelines: https://gist.github.com/sindresorhus/8159792

It is definitely influenced by Gulps plugin authoring guidelines: https://github.com/gulpjs/gulp/wiki/Writing-a-gulp-plugin#plugin-guidelines which are great IMHO.

I am just putting this here for reference for now. Feedback is needed on this. I definitely think this is extremely important for plugin quality going forward.

- **plugins should only do one thing and do them well.** Your task shouldn't concat files that's why we have grunt-contrib-concat. Your task shouldn't minify CSS, that's what eg. grunt-csso is for.
- don't bloat with uneeded options. pick sane defaults.
- should be fully tested (this should be enforced! we really don't want people using untested plugins).
- search the plugin list before creating one. what you want to create is probably already created and all you're doing is making it harder for users to find one.
- don't use the prototyped colors properties like, ''.green. This will be deprecated in the future. Use a sane coloring lib like [chalk](https://github.com/sindresorhus/chalk) instead.
- readme:
  - should have a good intro
  - travis badge
  - have examples
  - describe all options with types and defaults
  - license
  - (we should show an example of how it's done)
- use async as much as possible.
- don't be slow. `time (grunt yourplugin)` will tell you how slow you are. So will [time-grunt](https://github.com/sindresorhus/time-grunt).
- don't create useless grunt wrapper plugins that could be just as easily used directly as a node module.
- be a responsible maintainer. if you don't intend to maintain it don't release it. if you no longer have time to maintain it, say so, there might be someone that does.









