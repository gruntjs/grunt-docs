<a name="faq-devel"></a>
## When will I be able to use in-development feature 'X'?
While critical bug fixes are applied to both the latest stable release as well as the in-development version of grunt, new features are usually only added to the in-development version.

If you want to install the latest bleeding-edge, in-development version, you can npm install `grunt@devel`. _This is something you do not want to do in a project_, as the in-development version of grunt is constantly evolving and a feature you've come to depend on may have changed between installs of `grunt@devel`, thus breaking your build.

If you want to install an in-development version of grunt, locked in at a specific commit (totally fine for projects), follow the instructions for specifying a [git URL as a dependency](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies), and be sure to specify an actual commit SHA (not a branch name) as the `commit-ish`.

Finally, it is preferable to specify grunt as a [devDependency](https://npmjs.org/doc/json.html#devDependencies) in your project's [package.json](https://npmjs.org/doc/json.html) and instruct users to do `npm install` than to have them install grunt explicitly with `npm install grunt`. This makes the task of installing grunt (and any other dev dependencies) much easier and less error-prone.

<a name="faq-windows"></a>
## Does grunt work on Windows?
Grunt works fine on Windows, because [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) both work fine on Windows. Usually the problematic part is [Cygwin](http://www.cygwin.com/), because it bundles an outdated version of Node.js.

The best way to avoid this issue is to use the [msysGit installer](http://msysgit.github.com/) to install the `git` binary and the [Node.js installer](http://nodejs.org/#download) to install the `node` and `npm` binaries, and to use the built-in [Windows command prompt](http://www.cs.princeton.edu/courses/archive/spr05/cos126/cmd-prompt.html) or [PowerShell](http://support.microsoft.com/kb/968929) instead of Cygwin.

<a name="faq-windows-editor"></a>
## On Windows, why does my JS editor open when I try to run grunt?
If you're in the same directory as the [Gruntfile](Getting-started), Windows tries to execute _that file_ when you type grunt. So you need to type `grunt.cmd` instead.

An alternative would be to use the `DOSKEY` command to create a grunt macro, following [these directions](http://devblog.point2.com/2010/05/14/setup-persistent-aliases-macros-in-windows-command-prompt-cmd-exe-using-doskey/). That would allow you to use `grunt` instead of `grunt.cmd`.

This is the `DOSKEY` command you'd use:

```
DOSKEY grunt=grunt.cmd $*
```

<a name="faq-async-complete"></a>
## Why doesn't my asynchronous task complete?
Chances are this is happening because you have forgotten to call the [this.async](grunt.task#wiki-this-async) method to tell grunt that your task is asynchronous. For simplicity's sake, grunt uses a synchronous coding style, which can be switched to asynchronous by calling `this.async()` within the task body.

Note that passing `false` to the `done()` function tells grunt that the task has failed.

For example:

```javascript
grunt.registerTask('asyncme', 'My asynchronous task.', function() {
  var done = this.async();
  doSomethingAsync(done);
});
```

## How do I enable shell tab auto-completion?
To enable bash tab auto-completion for grunt, add the following line to your `~/.bashrc` file:

```bash
eval "$(grunt --completion=bash)"
```

This assumes that grunt has been installed globally with `npm install -g grunt`. Currently, the only supported shell is bash.

<a name="faq-share-parameters"></a>
## How can I share parameters across multiple tasks?
While each task can accept its own parameters, there are a few options available for sharing parameters across multiple tasks.

### "Dynamic" alias tasks
**This is the preferred method for sharing parameters across multiple tasks.**

Whereas [alias tasks](grunt#wiki-grunt-registerTask) are necessarily simple, a regular task can use [grunt.task.run](grunt.task#wiki-grunt-task-run) to make it effectively function as a "dynamic" alias task. In this example, running `grunt build:001` on the command line would result in the `foo:001`, `bar:001` and `baz:001` tasks being run.

```javascript
grunt.registerTask('build', 'Run all my build tasks.', function(n) {
  if (n == null) {
    grunt.warn('Build num must be specified, like build:001.');
  }
  grunt.task.run('foo:' + n, 'bar:' + n, 'baz:' + n);
});
```

### -- options

Another way to share a parameter across multiple tasks would be to use [grunt.option](grunt#wiki-grunt-option). In this example, running `grunt deploy --target=staging` on the command line would cause `grunt.option('target')` to return `"staging"`.

```javascript
grunt.registerTask('upload', 'Upload code to specified target.', function(n) {
  var target = grunt.option('target');
  // do something useful with target here
});
grunt.registerTask('deploy', ['validate', 'upload']);
```

_Note that boolean options can be specified using just a key without a value. For example, running `grunt deploy --staging` on the command line would cause `grunt.option('staging')` to return `true`._

### Globals and configs

In other cases, you may want to expose a way to set configuration or global values. In those cases, register a task that sets its arguments as a global or config value.

In this example, running `grunt set_global:name:peter set_config:target:staging deploy` on the command line would cause `global.name` to be `"peter"` and `grunt.config('target')` to return `"staging"`. Presumably, the `deploy` task would use those values.

```javascript
grunt.registerTask('set_global', 'Set a global variable.', function(name, val) {
  global[name] = val;
});

grunt.registerTask('set_config', 'Set a config property.', function(name, val) {
  grunt.config.set(name, val);
});
```