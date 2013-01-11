## Installing grunt
It is preferable to specify grunt and grunt plugins as [devDependencies](https://npmjs.org/doc/json.html#devDependencies) in your project's [package.json](https://npmjs.org/doc/json.html) and instruct users to do `npm install` than to have users install grunt and grunt plugins manually. Utilizing `package.json` makes the task of installing grunt (and any other dev dependencies) much easier and less error-prone.

### Installing the latest release of grunt
As the "Installing grunt and grunt plugins" section of the [[Getting Started]] guide explains, run `npm install grunt --save-dev` and npm will install the latest official version of grunt in your project folder, adding it to your `package.json` devDependencies. You can specify either `grunt` or `grunt@latest` as `latest` is just an npm tag for the last-published release version.

### Installing a specific version of grunt
If you need a specific version of grunt, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need. Note that regardless of the version you specify, a [tilde version range][] will be specified in `package.json`. This is a good thing as new patch releases of the specified version will be installable by npm.

[tilde version range]: https://npmjs.org/doc/json.html#Tilde-Version-Ranges

### Installing a published development version of grunt
Periodically, as new functionality is being developed, grunt builds will be published to npm. These builds will _not_ be published as a `@latest` official release, but will still be available.

Like installing a specific version of grunt, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need. Note that regardless of the version you specify, a [tilde version range][] will be specified in `package.json`. This is a **very bad thing** as new, possibly incompatible, patch releases of the specified version will be automatically installed by npm, and your build will be broken.

_In this case it is **very important** that you manually edit `package.json` and remove the ~ (tilde) from the version number. This locks in the in-development version that you have specified. You will need to manually change the version in `package.json` if you want a different version of grunt to be installed._

### Installing an unpublished development version of grunt
If you want to install a bleeding-edge, unpublished version of grunt, follow the instructions for specifying a [git URL as a dependency](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies) and be sure to specify an actual commit SHA (not a branch name) as the `commit-ish`. This will guarantee that your project always uses that exact version of grunt. The git URL need not be the official grunt, but can also be a fork.


## Installing grunt-cli locally


## Shell auto-completion


## Using grunt as a lib

