There are a number of Grunt projects.

* [grunt](https://github.com/gruntjs/grunt) - the main Grunt project
* [grunt-init](https://github.com/gruntjs/grunt-init) - the standalone grunt-init project scaffolding tool
* [gruntjs.com](https://github.com/gruntjs/gruntjs.com) - the gruntjs.com website
* [grunt-contrib collection](https://github.com/gruntjs/grunt-contrib) - a collection of all Grunt "contrib" plugins

In addition, each individual grunt-contrib plugin is a separate repository listed on the [gruntjs org homepage](https://github.com/gruntjs). Each repository has its own maintainers, you can easily find the maintainers 
by looking at recent commits and pushes. Just create an issue in the repository that interests you and `@mention` one of the maintainers to get started. 

##  Contributors License Agreement

Most forms of contribution aside from providing support to other users requires that you **[sign and submit](http://dojofoundation.org/about/cla)** a Contributors License Agreement (or "CLA" for short) with the Dojo Foundation.


In summary, the CLA asserts that when you donate fixes or documentation, you both own the code that you're submitting and that the Dojo Foundation can in turn license that code to other people.

Sending in a CLA is a one-time thing, and once it's done, you're in the clear to start contributing to all Dojo Foundation projects! To be effective, though, you need to know a little bit about how contributors and Committers coordinate their work, so getting involved and asking questions should be your first step.

For more on CLAs, read [Alex Russell's Why Do I Need to Sign This?](http://alex.dojotoolkit.org/2008/06/why-do-i-need-to-sign-this/).

## Want to contribute?

If you want to contribute, but don't know where to get started, this is for you.
Issues that are linked below were marked as __needs PR__, this means they need a pull request to be fixed.
Choose any of these issues and make sure to comment if you are working on them.

* grunt-init - [Contribution guidelines should go into contributing.md](https://github.com/gruntjs/grunt-init/issues/5)
* grunt-contrib-jade - [Add support for basedir option](https://github.com/gruntjs/grunt-contrib-jade/issues/64)
* grunt-init-gruntfile - [Doesn't generate a package.json](https://github.com/gruntjs/grunt-init-gruntfile/issues/6)
* grunt-contrib-coffee - [Support the process option](https://github.com/gruntjs/grunt-contrib-coffee/issues/61)
* grunt - [--gruntfile parameter broken with parent directories](https://github.com/gruntjs/grunt/issues/950)
* grunt-contrib-compress - [Add bzip2 support](https://github.com/gruntjs/grunt-contrib-compress/issues/47)
* grunt-contrib-jasmine - [Enhance logging](https://github.com/gruntjs/grunt-contrib-jasmine/issues/80)
* grunt-contrib-less [Sourcemaps with multiple src files](https://github.com/gruntjs/grunt-contrib-less/issues/89)

## Publishing a new version

To publish a new version of a `grunt-contrib-*` plugin follow these steps:

* check the plugin GitHub page to make sure it is passing Travis CI.
* `cd` into the plugin directory.
* `git pull` the latest changes from the `master` branch.
* `rm -rf node_modules` remove stale or old node modules.
* `npm install` to get the latest version of the node modules.
* run `npm test` and make sure all tests pass locally.
* bump the version in `package.json`
* update CHANGELOG.md
* run `grunt` in the plugin directory. This should generate the new README.
* commit the changelog, `package.json` and README changes.
* create a new git tag for the new version. use this format for the tag: `vX.Y.Z`. (such as `v0.1.13`)
* push changes to `master`, push tag to the plugin repo.
* Publish to npm: `npm publish .`. If you do not have access to `npm publish` ask one of the core contributors to publish for you. 

# Non-code contributions

If you don't feel like writing code you can still contribute to the project!

* You may submit updates and improvements to the [documentation](https://github.com/gruntjs/grunt-docs).
* Submit articles and guides which are also part of the [documentation](https://github.com/gruntjs/grunt-docs).
* Help Grunt user by answering questions on [StackOverflow](http://stackoverflow.com/questions/tagged/gruntjs), [IRC](http://gruntjs.com/help-resources#irc) and [GitHub](https://github.com/search?q=user%3Agruntjs&state=open&type=Issues&utf8=%E2%9C%93).

## Filing issues
If something isn't working like you think it should, please read [the documentation](https://github.com/gruntjs/grunt/wiki), especially the [[Getting Started]] guide. If you'd like to chat with someone, [[pop into IRC|contributing#discussing-grunt]] discussing-grunt and ask your question there.

If you have a question not covered in the documentation or want to report a bug, the best way to ensure it gets addressed is to file it in the appropriate issues tracker.

* **If there's an issue with grunt, grunt-init, a grunt-lib-??? module, or a specific grunt-contrib-??? plugin**
  * Please file an issue on that project's issues tracker.
* **If you'd like to contribute a new plugin**
  * Please file an issue on the [grunt-contrib collection issues tracker](https://github.com/gruntjs/grunt-contrib/issues). We don't accept all plugins, but we'll certainly consider yours.
* **If there's an issue with the [website](http://gruntjs.com/)**
  * Please file an issue on the [gruntjs.com website issues tracker](https://github.com/gruntjs/gruntjs.com/issues).
* **If there's an issue that isn't specific to any of the above**
  * Please file an issue on the [grunt issues tracker](https://github.com/gruntjs/grunt/issues) and let us know why you're filing it there.

### Simplify the issue
Try to [reduce your code](http://www.webkit.org/quality/reduction.html) to the bare minimum required to reproduce the issue. This makes it much easier (and much faster) to isolate and fix the issue.

### Explain the issue
If we can't reproduce the issue, we can't fix it. Please list the exact steps required to reproduce the issue. Include versions of your OS, Node.js, grunt, etc. Include relevant logs or sample code.

## Discussing grunt
Join the [freenode](http://freenode.net/): IRC #grunt channel for general discussion or #grunt-dev for core and plugin development discussion. We've got a bot and everything.

_No private messages, please._

## Modifying grunt
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

1. Ensure grunt-cli is installed (see the [[Getting started]] guide for more information)
1. Fork and clone the repo.
1. Check out the master branch (most grunt/grunt-contrib development happens there).
1. Run `npm install` to install all Grunt dependencies.
1. Run `npm uninstall grunt` this will remove the extra Grunt in your `node_modules`, see [npm issue 3958](https://github.com/npm/npm/issues/3958)
1. Run `grunt` to Grunt grunt.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing has broken.

### Submitting pull requests

1. Create a new branch, please don't work in `master` directly.
1. Add failing tests for the change you want to make. Run `grunt` to see the tests fail.
1. Fix stuff.
1. Run `grunt` to see if the tests pass. Repeat steps 2-4 until done.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.

### Syntax

* Two space indents. Don't use tabs anywhere. Use `\t` if you need a tab character in a string.
* No trailing whitespace, except in markdown files where a linebreak must be forced.
* Don't go overboard with the whitespace.
* No more than [one assignment](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) per `var` statement.
* Delimit strings with single-quotes `'`, not double-quotes `"`.
* Prefer `if` and `else` to ["clever"](http://programmers.stackexchange.com/a/25281) uses of `? :` conditional or `||`, `&&` logical operators.
* Comments are great. Just put them _before_ the line of code, _not_ at the _end_ of the line.
* **When in doubt, follow the conventions you see used in the source already.**

### READMEs
All of the grunt-contrib-* plugins use [grunt-contrib-internal](https://github.com/gruntjs/grunt-contrib-internal) to construct the `README.md` and `CONTRIBUTING.md` files. The source files are located in the corresponding `docs/` folder. The change logs in the READMEs are generated from the `CHANGELOG` file.

When submitting changes to the README files please just edit the source files rather than the README directly.
