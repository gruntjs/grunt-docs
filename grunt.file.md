There are many provided methods for reading and writing files, traversing the filesystem and finding files by matching globbing patterns. Many of these methods are wrappers around built-in Node.js file functionality, but with additional error handling, logging and character encoding normalization.

_Note: all file paths are relative to the `Gruntfile` unless the current working directory is changed with `grunt.file.setBase` or the `--base` command-line option._

## Character encoding

### grunt.file.defaultEncoding
Set this property to change the default encoding used by all `grunt.file` methods. Defaults to `'utf8'`. If you do have to change this value, it's recommended that you change it as early as possible inside your Gruntfile.

```js
grunt.file.defaultEncoding = 'utf8';
```


### grunt.file.preserveBOM
*Added in 0.4.2*

Whether to preserve the Byte Order Mark (BOM) on `file.read` rather than strip it.
```js
grunt.file.preserveBOM = false;
```

## Reading and writing

### grunt.file.read
Read and return a file's contents. Returns a string, unless `options.encoding` is `null` in which case it returns a [Buffer](http://nodejs.org/docs/latest/api/buffer.html).

```js
grunt.file.read(filepath [, options])
```

The `options` object has these possible properties:

```js
var options = {
  // If an encoding is not specified, default to grunt.file.defaultEncoding.
  // If specified as null, returns a non-decoded Buffer instead of a string.
  encoding: encodingName
};
```

### grunt.file.readJSON
Read a file's contents, parsing the data as JSON and returning the result. See `grunt.file.read` for a list of supported options.

```js
grunt.file.readJSON(filepath [, options])
```

### grunt.file.readYAML
Read a file's contents, parsing the data as YAML and returning the result. See `grunt.file.read` for a list of supported options.

```js
grunt.file.readYAML(filepath [, options])
```

### grunt.file.write
Write the specified contents to a file, creating intermediate directories if necessary. Strings will be encoded using the specified character encoding, [Buffers](http://nodejs.org/docs/latest/api/buffer.html) will be written to disk as-specified.

_If the `--no-write` command-line option is specified, the file won't actually be written._

```js
grunt.file.write(filepath, contents [, options])
```

The `options` object has these possible properties:

```js
var options = {
  // If an encoding is not specified, default to grunt.file.defaultEncoding.
  // If `contents` is a Buffer, encoding is ignored.
  encoding: encodingName
};
```

### grunt.file.copy
Copy a source file to a destination path, creating intermediate directories if necessary.

_If the `--no-write` command-line option is specified, the file won't actually be written._

```js
grunt.file.copy(srcpath, destpath [, options])
```

The `options` object has these possible properties:

```js
var options = {
  // If an encoding is not specified, default to grunt.file.defaultEncoding.
  // If null, the `process` function will receive a Buffer instead of String.
  encoding: encodingName,
  // The source file contents and file path are passed into this function,
  // whose return value will be used as the destination file's contents. If
  // this function returns `false`, the file copy will be aborted.
  process: processFunction,
  // These optional globbing patterns will be matched against the filepath
  // (not the filename) using grunt.file.isMatch. If any specified globbing
  // pattern matches, the file won't be processed via the `process` function.
  // If `true` is specified, processing will be prevented.
  noProcess: globbingPatterns
};
```

### grunt.file.delete
Delete the specified filepath. Will delete files and folders recursively.

_Will not delete the current working directory or files outside the current working directory unless the `--force` command-line option is specified._

_If the `--no-write` command-line option is specified, the filepath won't actually be deleted._

```js
grunt.file.delete(filepath [, options])
```

The `options` object has one possible property:

```js
var options = {
  // Enable deleting outside the current working directory. This option may
  // be overridden by the --force command-line option.
  force: true
};
```

## Directories

### grunt.file.mkdir
Works like `mkdir -p`. Create a directory along with any intermediate directories. If `mode` isn't specified, it defaults to `0777 & (~process.umask())`.

_If the `--no-write` command-line option is specified, directories won't actually be created._

```js
grunt.file.mkdir(dirpath [, mode])
```

### grunt.file.recurse
Recurse into a directory, executing `callback` for each file.

```js
grunt.file.recurse(rootdir, callback)
```

The callback function receives the following arguments:

```js
function callback(abspath, rootdir, subdir, filename) {
  // The full path to the current file, which is nothing more than
  // the rootdir + subdir + filename arguments, joined.
  abspath
  // The root director, as originally specified.
  rootdir
  // The current file's directory, relative to rootdir.
  subdir
  // The filename of the current file, without any directory parts.
  filename
}
```

## Globbing patterns
It is often impractical to specify all source filepaths individually, so Grunt supports filename expansion (also know as globbing) via the built-in [node-glob](https://github.com/isaacs/node-glob) library.

See the "Globbing patterns" section of the [[Configuring tasks]] guide for globbing pattern examples.


### grunt.file.expand
Return a unique array of all file or directory paths that match the given globbing pattern(s). This method accepts either comma separated globbing patterns or an array of globbing patterns. Paths matching patterns that begin with `!` will be excluded from the returned array. Patterns are processed in order, so inclusion and exclusion order is significant.

```js
grunt.file.expand([options, ] patterns)
```

File paths are relative to the `Gruntfile` unless the current working directory is changed with `grunt.file.setBase` or the `--base` command-line option.

The `options` object supports all [minimatch library](https://github.com/isaacs/minimatch) options, and a few others. For example:

* `filter` Either a valid [fs.Stats method name](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) or a function that is passed the matched `src` filepath and returns `true` or `false`.
* `nonull` Retain `src` patterns even if they fail to match files. Combined with grunt's `--verbose` flag, this option can help debug file path issues.
* `matchBase` Patterns without slashes will match just the basename part. Eg. this makes `*.js` work like `**/*.js`.
* `cwd` Patterns will be matched relative to this path, and all returned filepaths will also be relative to this path.

### grunt.file.expandMapping
Returns an array of src-dest file mapping objects. For each source file matched by a specified pattern, join that file path to the specified `dest`. This file path may be flattened or renamed, depending on the options specified. See the `grunt.file.expand` method documentation for an explanation of how the `patterns` and `options` arguments may be specified.

```js
grunt.file.expandMapping(patterns, dest [, options])
```

_Note that while this method may be used to programmatically generate a `files` array for a multi task, the declarative syntax for doing this described in the "Building the files object dynamically" section of the [[Configuring tasks]] guide is preferred._

In addition to those the `grunt.file.expand` method supports, the `options` object also supports these properties:

```js
var options = {
  // The directory from which patterns are matched. Any string specified as
  // cwd is effectively stripped from the beginning of all matched paths.
  cwd: String,
  // Remove the path component from all matched src files. The src file path
  // is still joined to the specified dest.
  flatten: Boolean,
  // Remove anything after (and including) the first "." in the destination
  // path, then append this value.
  ext: String,
  // If specified, this function will be responsible for returning the final
  // dest filepath. By default, it joins dest and matchedSrcPath like so:
  rename: function(dest, matchedSrcPath, options) {
    return path.join(dest, matchedSrcPath);
  }
};
```

### grunt.file.match
Match one or more globbing patterns against one or more file paths. Returns a uniqued array of all file paths that match any of the specified globbing patterns. Both the `patterns` and `filepaths` argument can be a single string or array of strings. Paths matching patterns that begin with `!` will be excluded from the returned array. Patterns are processed in order, so inclusion and exclusion order is significant.

```js
grunt.file.match([options, ] patterns, filepaths)
```

The `options` object supports all [minimatch library](https://github.com/isaacs/minimatch) options. For example, if `options.matchBase` is true, patterns without slashes will match against the basename of the path even if it contains slashes, eg. pattern `*.js` will match filepath `path/to/file.js`.

### grunt.file.isMatch
This method contains the same signature and logic as the `grunt.file.match` method, but simply returns `true` if any files were matched, otherwise `false`.

## File types

### grunt.file.exists
Does the given path exist? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.exists(path1 [, path2 [, ...]])
```

### grunt.file.isLink
Is the given path a symbolic link? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isLink(path1 [, path2 [, ...]])
```

Returns false if the path doesn't exist.

### grunt.file.isDir
Is the given path a directory? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isDir(path1 [, path2 [, ...]])
```

Returns false if the path doesn't exist.

### grunt.file.isFile
Is the given path a file? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isFile(path1 [, path2 [, ...]])
```

Returns false if the path doesn't exist.

## Paths

### grunt.file.isPathAbsolute
Is a given file path absolute? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isPathAbsolute(path1 [, path2 [, ...]])
```

### grunt.file.arePathsEquivalent
Do all the specified paths refer to the same path? Returns a boolean.

```js
grunt.file.arePathsEquivalent(path1 [, path2 [, ...]])
```

### grunt.file.doesPathContain
Are all descendant path(s) contained within the specified ancestor path? Returns a boolean.

_Note: does not check to see if paths actually exist._

```js
grunt.file.doesPathContain(ancestorPath, descendantPath1 [, descendantPath2 [, ...]])
```

### grunt.file.isPathCwd
Is a given file path the CWD? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isPathCwd(path1 [, path2 [, ...]])
```

### grunt.file.isPathInCwd
Is a given file path inside the CWD? Note: CWD is not _inside_ CWD. Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isPathInCwd(path1 [, path2 [, ...]])
```

### grunt.file.setBase
Change grunt's current working directory (CWD). By default, all file paths are relative to the `Gruntfile`. This works just like the `--base` command-line option.

```js
grunt.file.setBase(path1 [, path2 [, ...]])
```

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

## External libraries
*Deprecated*

__All external libraries that are listed below are now deprecated.__

Please use __npm__ to manage these external libraries in your project's dependencies.

For example if you want use [Lo-Dash](https://npmjs.org/package/lodash), install it first `npm install lodash`, then
use it in your `Gruntfile`: `var _ = require('lodash');`

### grunt.file.glob
*Deprecated*

[glob](https://github.com/isaacs/node-glob) - File globbing utility.

### grunt.file.minimatch
*Deprecated*

[minimatch](https://github.com/isaacs/minimatch) - File pattern matching utility.

### grunt.file.findup
*Deprecated*

[findup-sync](https://github.com/cowboy/node-findup-sync) - Search upwards for matching file patterns.
