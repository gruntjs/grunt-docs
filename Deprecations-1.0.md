This guide is here to help you future proof your projects as certain APIs have been
deprecated in Grunt 1.x and will be removed in the next major version release.

## Deprecations

* `grunt.util._` has been deprecated. Please `npm install lodash` and require [lodash](https://www.npmjs.com/package/lodash) directly.
* `grunt.util.async` has been deprecated. Please `npm install async` and require [async](https://www.npmjs.com/package/async) directly.
* `grunt.util.namespace` has been deprecated. Please `npm install getobject` and require [getobject](https://www.npmjs.com/package/getobject) directly.
* `grunt.util.hooker` has been deprecated. Please `npm install hooker` and require [hooker](https://www.npmjs.com/package/hooker) directly.
* `grunt.util.exit` has been deprecated. Please `npm install exit` and require [exit](https://www.npmjs.com/package/exit) directly.
* `grunt.util.toArray` has been deprecated. Please `npm install lodash.toarray` and require [lodash.toarray](https://www.npmjs.com/package/lodash.toarray) directly.
* `grunt.util.repeat` has been deprecated. Please use `new Array(num + 1).join(str || \' \')` or another library.
* `grunt.file.glob` has been deprecated. Please `npm install glob` and require [glob](https://www.npmjs.com/package/glob) directly.
* `grunt.file.minimatch` has been deprecated. Please `npm install minimatch` and require [minimatch](https://www.npmjs.com/package/minimatch) directly.
* `grunt.file.findup` has been deprecated. Please `npm install findup-sync` and require [findup-sync](https://www.npmjs.com/package/findup-sync) directly.
* `grunt.file.readYAML` has been deprecated. Please `npm install js-yaml` and require [js-yaml](https://www.npmjs.com/package/js-yaml) directly.
* `grunt.file.readJSON` has been deprecated. Please use `require("file.json")` directly.
* `grunt.event` has been deprecated. Please `npm install eventemitter2` and require [eventemitter2](https://www.npmjs.com/package/eventemitter2) directly.
