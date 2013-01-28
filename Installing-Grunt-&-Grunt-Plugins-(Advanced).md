Before reading this, please see the [[Getting Started]] guide.

### Installing specific versions of grunt or grunt-plugins
Run `npm install grunt@VERSION --save-dev` where `VERSION` is the version you need.  This will install the specified version, adding it to your `package.json` devDependencies.

Note that a [tilde version range] will be used in your `package.json` when you add the `--save-dev` flag to `npm install`. This is typically good, as new patch releases of the specified version will automatically be upgraded as development continues, per [semver].

If you don't want this behavior, manually edit your `package.json` and remove the ~ (tilde) from the version number. This will lock in the exact version that you have specified.

[tilde version range]: https://npmjs.org/doc/json.html#Tilde-Version-Ranges
[semver]: http://semver.org

### Installing published development versions of grunt or grunt plugins
Periodically, as new functionality is being developed, alpha/beta/release candidates will be published to npm. **How do people know when this happens?** These builds will _not_ be available as a `@latest` official release. **What is the significance of latest?**

It is **very important** that you manually edit your `package.json` and remove the ~ (tilde) from the version number when using these or subsequent releases may break your build system.

### Installing an unpublished development version of grunt
If you want to install a bleeding-edge, unpublished version of grunt, follow the instructions for specifying a [git URL as a dependency](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies) and be sure to specify an actual commit SHA (not a branch name) as the `commit-ish`. This will guarantee that your project always uses that exact version of grunt.

The specified git URL may be that of the official grunt repo or a fork.

### Installing grunt-cli locally
If you don't have administrator rights, you may need to install grunt-cli locally to your project using `npm install grunt-cli --save-dev`.  Unfortunately, this will not put the `grunt` executable in your PATH.  You'll need to specify its explicit location when executing it, eg: `./node_modules/.bin/grunt`, 

Using grunt-cli in this way is unsupported.