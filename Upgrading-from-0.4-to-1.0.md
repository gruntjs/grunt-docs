> Old versions, such as 1.5 and older are no longer maintained. Find out more and see additional support options [here](/support).

This guide is here to help you update your projects and plugins from Grunt 0.4.x to Grunt 1.0.

**Be advised Grunt 1.0.0 no longer supports Node.js v0.8.**

## For Projects that use Grunt

### Peer Dependencies

You might receive `peerDependencies` errors when you install a project with Grunt 1.0.
We ask you to send pull requests to your favourite plugins and ask them to update the peerDependencies section of their package.json.
See below for details about plugin updates.

## For Plugins and Plugin developers

<h3><a class="anchor" href="#peer-dependencies-dev" id="peer-dependencies-dev"></a>Peer Dependencies</h3>

If you have a Grunt plugin that includes grunt in the peerDependencies section of your package.json,
we recommend tagging with "grunt": ">=0.4.0". Otherwise when grunt@1.0.0 is released, npm@2 users will
receive a hard error when trying to install your plugin and npm@3 users will get a warning.

Be aware, peer dependencies are no longer installed for users as of npm@3.
Users of Grunt plugins are expected to npm install grunt --save-dev alongside any Grunt plugin install.

We ask you to update your plugin with `"grunt": ">=0.4.0"` in it and publish that on npm.

### Changes in 1.0.0

- Prevent async callback from being called multiple times. Pull #1464.
- Update copyright to jQuery Foundation and remove redundant headers. Fixes #1478.
- Update glob to 7.0.x. Fixes #1467.
- Removing duplicate BOM strip code. Pull #1482.
- Updated to latest cli ~1.2.0
- Ensure a grunt bin gets created upon install.

### Changes in Grunt 1.0 RC1:

Be aware, some APIs have changed warranting a major version update:

- `coffee-script` is upgraded to `~1.10.0` which could incur breaking changes
  when using the language with plugins and Gruntfiles.
- `nopt` is upgraded to `~3.0.6` which has fixed many issues, including passing
  multiple arguments and dealing with numbers as options. Be aware previously
  `--foo bar` used to pass the value `'bar'` to the option `foo`. It will now
  set the option `foo` to `true` and run the task `bar`.
- `glob` is upgraded to `~6.0.4` and `minimatch` is upgraded to `~3.0.0`. Results
  are now sorted by default with `grunt.file.expandMapping()`. Pass the
  `nosort: true` option if you don't want the results to be sorted.
- `lodash` was upgraded to `~4.3.0`. Many changes have occurred. Some of which
  that directly effect Grunt are `grunt.util._.template()` returns a compile
  function and `grunt.util._.flatten` no longer flattens deeply.
  `grunt.util._` is deprecated and we highly encourage you to
  `npm install lodash` and `var _ = require('lodash')` to use `lodash`.
  Please see the lodash changelog for a full list of changes: <https://github.com/lodash/lodash/wiki/Changelog>
- `iconv-lite` is upgraded to `~0.4.13` and strips the BOM by default.
- `js-yaml` is upgraded to `~3.5.2` and may affect `grunt.file.readYAML`.
  We encourage you to please `npm install js-yaml` and use
  `var YAML = require('js-yaml')` directly in case of future deprecations.
- A file `mode` option can be passed into
  [grunt.file.write()](https://gruntjs.com/api/grunt.file#grunt.file.write).
- `Done, without errors.` was changed to `Done.` to avoid failing by mistake on the word `errors`.
