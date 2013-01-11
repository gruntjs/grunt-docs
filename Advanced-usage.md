## Installing grunt

### Installing the latest official grunt
As the "Installing grunt and grunt plugins" section of the [[Getting Started]] guide explains, run `npm install grunt --save-dev` and npm will install the latest official version of grunt in your project folder, adding it to your `package.json` devDependencies. Specifying `grunt` this way is the same as specifying `grunt@latest`.

### Installing a specific official grunt
If you need a specific version of grunt, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need. Note that regardless of the version you specify, a [tilde version range][] will be specified in `package.json`. This is a good thing; as new patch releases of the specified version are published, npm will be able to install them.

[tilde version range]: https://npmjs.org/doc/json.html#Tilde-Version-Ranges

### Installing a published development grunt
Periodically, as new functionality is being developed, grunt builds will be published to npm. These builds will _not_ be published as a `@latest` official release, but will still be available.

Like installing a specific official grunt, run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need. Note that regardless of the version you specify, a [tilde version range][] will be specified in `package.json`. In this case, this is a **very bad thing** as new, possibly incompatible, patch releases of the specified version will be automatically installed by npm, and your build will be broken.

In this case it is **very important** that you manually edit `package.json` and **remove the ~ (tilde) from the version number.** This locks in the in-development version that you have specified.

### Installing an unpublished development grunt
If you want to install a bleeding-edge, unpublished version of grunt, follow the instructions for specifying a [git URL as a dependency](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies) and be sure to specify an actual commit SHA (not a branch name) as the `commit-ish`. This will guarantee that your project always uses that exact version of grunt.


Finally, it is preferable to specify grunt as a [devDependency](https://npmjs.org/doc/json.html#devDependencies) in your project's [package.json](https://npmjs.org/doc/json.html) and instruct users to do `npm install` than to have them install grunt explicitly with `npm install grunt`. This makes the task of installing grunt (and any other dev dependencies) much easier and less error-prone.


## Installing grunt-cli locally


## Shell auto-completion


## Using grunt as a lib

