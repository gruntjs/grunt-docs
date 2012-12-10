Publishing a "grunt plugin" to Npm gives you 3 possible things:

1. An easily-included-in-your-project set of tasks that get referenced in `Gruntfile.js` when run via `grunt`.
2. A custom global binary that is like "some version of grunt, plus your specific extra stuff."
3. Either 1 or 2, depending on whether the plugin was installed globally or locally via Npm.

Other than that, it's not too much more than a specific directory structure, contain some number of task files. You load a plugin locally installed via Npm via [grunt.loadNpmTasks](grunt#wiki-grunt-loadNpmTasks), and you load tasks from a directory via [grunt.loadTasks](grunt#wiki-grunt-loadTasks).

## The "gruntplugin" init template
1. Run `grunt-init gruntplugin` in an empty directory.
2. Run `npm install` to install grunt locally.
3. When done, run `npm publish` to publish the grunt plugin to npm!

## Collections