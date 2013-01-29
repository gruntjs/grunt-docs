For general installation instructions, please read the [[Getting Started]] guide. If you need more specific information after having read that, read on.

## Overview
Grunt is comprised of two parts: `grunt` and `grunt-cli`.

1. The npm module `grunt` should be installed locally to your project. It contains the code and logic for running tasks, loading plugins, etc.
1. The npm module `grunt-cli` should be installed globally. It puts the `grunt` command in your PATH so you can execute it anywhere. By itself, it doesn't do anything; its job is to load and run the grunt that has been installed locally to your project, regardless of its version.

It is preferable to specify grunt and grunt plugins as [devDependencies](https://npmjs.org/doc/json.html#devDependencies) in your project's [package.json](https://npmjs.org/doc/json.html) and instruct users to do `npm install` than to have users install grunt and grunt plugins manually. Utilizing `package.json` makes the task of installing grunt (and any other dev dependencies) much easier and less error-prone.

## Installing grunt / grunt plugins
As the "Installing grunt and grunt plugins" section of the [[Getting Started]] guide explains, run `npm install grunt --save-dev` and npm will install the latest official version of grunt in your project folder, adding it to your `package.json` devDependencies.

Note that a [tilde version range][] will be automatically specified in `package.json`. This is good, as new patch releases of the latest version will be installable by npm.

The same process may be used to install the latest official version of a grunt plugin.

[tilde version range]: https://npmjs.org/doc/json.html#Tilde-Version-Ranges

### Installing a specific version of grunt / grunt plugin 
If you need a specific version of grunt, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need, and npm will install that version of grunt in your project folder, adding it to your `package.json` devDependencies.

Note that a [tilde version range][] will be automatically specified in `package.json`. This is typically good, as new patch releases of the specified version will be installable by npm. If you don't like this behavior, manually edit your `package.json` and remove the ~ (tilde) from the version number. This will lock in the exact version that you have specified.

The same process may be used to install a specific version of a grunt plugin.

### Installing a published development version of grunt / grunt plugin
Periodically, as new functionality is being developed, grunt builds may be published to npm. These builds will _never_ be installable without explicitly specifying a version number, and will typically have a build number or alpha/beta/release candidate designation.

Like installing a specific version of grunt, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need, and npm will install that version of grunt in your project folder, adding it to your `package.json` devDependencies.

Note that regardless of the version you specify, a [tilde version range][] will be specified in `package.json`. **This is very bad**, as new, possibly incompatible, patch releases of the specified development version may be installed by npm, breaking your build.

_In this case it is **very important** that you manually edit your `package.json` and remove the ~ (tilde) from the version number. This will lock in the exact development version that you have specified._

The same process may be used to install a published development version of a grunt plugin.

### Installing an unpublished development version of grunt / grunt plugin
If you want to install a bleeding-edge, unpublished version of grunt or grunt plugin, follow the instructions for specifying a [git URL as a dependency](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies) and be sure to specify an actual commit SHA (not a branch name) as the `commit-ish`. This will guarantee that your project always uses that exact version of grunt.

The specified git URL may be that of the official grunt repo or a fork.

## Installing grunt-cli
As the "Installing the CLI" section of the [[Getting Started]] guide explains, run `npm install -g grunt-cli` and npm will install the latest official version of grunt-cli. This will put the `grunt` command in your system path, allowing it to be run from any directory.

**If you have installed grunt globally in the past, you will need to remove it with `npm uninstall -g grunt` first.**

### Installing grunt-cli locally
You may install grunt-cli locally to a project using `npm install grunt-cli --save-dev` but instead of being able to access the `grunt` command from anywhere, you'll need to specify its explicit local path, which will be something like `./node_modules/.bin/grunt`.

Using grunt-cli in this way is unsupported.