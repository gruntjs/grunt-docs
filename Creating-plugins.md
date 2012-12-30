1. Install [grunt-init](/gruntjs/grunt-init) with `npm install -g grunt-init`
2. Run `grunt-init gruntplugin` in an empty directory.
3. Run `npm install` to prepare the development environment.
4. Author your plugin.
5. Run `npm publish` to publish the grunt plugin to npm!

## Notes

### Naming your task

The "grunt-contrib" namespace is reserved for tasks maintained by the grunt team, please name your task something appropriate that avoids that naming scheme.

### Storing task files

Only store data files in a .grunt/[npm-module-name]/ directory at the project's root and clean up after yourself when appropriate. This is not a solution for temporary scratch files, use one of the common npm modules (eg [temporary](https://npmjs.org/package/temporary), [tmp](https://npmjs.org/package/tmp)) that take advantage of the OS level temporary directories for that case.

### Avoid Changing the Current Working Directory: `process.cwd()`
By default, the current working directory is set to be the directory that contains the gruntfile. The user can change it using `grunt.file.setBase()` in their gruntfile, but plugins should take care to not change it.

`path.resolve('foo')` can be used to get the absolute path of the filepath 'foo' relative to the gruntfile.