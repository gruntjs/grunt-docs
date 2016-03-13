This document explains how to install specific versions of Grunt and Grunt plugins.  If you haven't read the [[Getting Started]] guide, you should check that out first.

## Overview
Grunt and Grunt plugins should be defined as [devDependencies](https://docs.npmjs.com/files/package.json#devdependencies) in your project's [package.json](https://docs.npmjs.com/files/package.json).  This will allow you to install all of your project's dependencies with a single command: `npm install`.  The current stable and development versions of Grunt are always listed on the wiki's [home page](https://github.com/gruntjs/grunt/wiki/).

## Installing a specific version
If you need a specific version of Grunt or a Grunt plugin, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need.  This will install the specified version, adding it to your package.json devDependencies.

Note that a [tilde version range] will be used in your `package.json` when you add the `--save-dev` flag to `npm install`. This is typically good, as new patch releases of the specified version will automatically be upgraded as development continues, per [semver].

[tilde version range]: https://npmjs.org/doc/misc/semver.html#Ranges
[semver]: http://semver.org

## Installing a published development version
Periodically, as new functionality is being developed, Grunt builds may be published to npm. These builds will _never_ be installable without explicitly specifying a version number, and will typically have a build number or alpha/beta/release candidate designation.

Like installing a specific version of grunt, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need, and npm will install that version of Grunt in your project folder, adding it to your `package.json` devDependencies.

Note that regardless of the version you specify, a [tilde version range][] will be specified in `package.json`. **This is very bad**, as new, possibly incompatible, patch releases of the specified development version may be installed by npm, breaking your build.

_In this case it is **very important** that you manually edit your `package.json` and remove the ~ (tilde) from the version number. This will lock in the exact development version that you have specified._

The same process may be used to install a published development version of a Grunt plugin.

## Installing directly from github
If you want to install a bleeding-edge, unpublished version of Grunt or Grunt plugin, follow the instructions for specifying a [git URL as a dependency](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies) and be sure to specify an actual commit SHA (not a branch name) as the `commit-ish`. This will guarantee that your project always uses that exact version of grunt.

The specified git URL may be that of the official Grunt repo or a fork.
