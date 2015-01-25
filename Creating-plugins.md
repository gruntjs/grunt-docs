1. Install [grunt-init](https://github.com/gruntjs/grunt-init) with `npm install -g grunt-init`
2. Install the gruntplugin template with `git clone git://github.com/gruntjs/grunt-init-gruntplugin.git ~/.grunt-init/gruntplugin` (`%USERPROFILE%\.grunt-init\gruntplugin` on Windows).
3. Run `grunt-init gruntplugin` in an empty directory.
4. Run `npm install` to prepare the development environment.
5. Author your plugin.
6. Run `npm publish` to publish the Grunt plugin to npm!

## Notes

### Naming your task

The "grunt-contrib" namespace is reserved for tasks maintained by the Grunt team, please name your task something appropriate that avoids that naming scheme.

### Debugging
Grunt hides error stack traces by default, but they can be enabled for easier task debugging with the `--stack` option. If you want Grunt to always log stack traces on errors, create an alias in your shell. Eg, in bash, you could do `alias grunt='grunt --stack'`.

### Storing task files

Only store data files in a .grunt/[npm-module-name]/ directory at the project's root and clean up after yourself when appropriate. This is not a solution for temporary scratch files, use one of the common npm modules (eg [temporary](https://npmjs.org/package/temporary), [tmp](https://npmjs.org/package/tmp)) that take advantage of the OS level temporary directories for that case.

### Avoid Changing the Current Working Directory: `process.cwd()`
By default, the current working directory is set to be the directory that contains the gruntfile. The user can change it using `grunt.file.setBase()` in their gruntfile, but plugins should take care to not change it.

`path.resolve('foo')` can be used to get the absolute path of the filepath 'foo' relative to the `Gruntfile`.

### Creating your task

You might also want to know how to [create your own tasks](http://gruntjs.com/creating-tasks) or take a look at the [API](http://gruntjs.com/api) reference.
