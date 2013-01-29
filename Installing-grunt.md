This document explains how to install development versions of grunt and grunt plugins.  If you haven't read the [[Getting Started]] guide, you should check that out first.

## Installing grunt / grunt plugins
Grunt and grunt plugins should be defined as [devDependencies](https://npmjs.org/doc/json.html#devDependencies) in your project's [package.json](https://npmjs.org/doc/json.html).  Using a `package.json` file will allow you to install all of your project's dependencies with a single command: `npm install`.
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