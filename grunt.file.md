There are many provided methods for reading and writing files, traversing the filesystem and finding files by matching wildcard patterns. Many of these methods are wrappers around built-in Node.js file functionality, but with additional error handling, logging and character encoding normalization.

_Note: all file paths are relative to the Gruntfile unless the current working directory is changed with `grunt.file.setBase` or the `--base` command-line option._

## Character encoding

<a name="grunt-file-defaultEncoding"></a>
### grunt.file.defaultEncoding
Set this property to change the default encoding used by all `grunt.file` methods. Defaults to `'utf8'`. If you do have to change this value, it's recommended that you change it as early as possible inside your Gruntfile.

```js
grunt.file.defaultEncoding = 'utf8';
```

## Reading and writing

<a name="grunt-file-read"></a>
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

<a name="grunt-file-readJSON"></a>
### grunt.file.readJSON
Read a file's contents, parsing the data as JSON and returning the result. See `grunt.file.read` for a list of supported options.

```js
grunt.file.readJSON(filepath [, options])
```

<a name="grunt-file-readYAML"></a>
### grunt.file.readYAML
Read a file's contents, parsing the data as YAML and returning the result. See `grunt.file.read` for a list of supported options.

```js
grunt.file.readYAML(filepath [, options])
```

<a name="grunt-file-write"></a>
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

<a name="grunt-file-copy"></a>
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
  // These optional wildcard patterns will be matched against the filepath
  // (not the filename) using grunt.file.isMatch. If any specified wildcard
  // pattern matches, the file won't be processed via the `process` function.
  // If `true` is specified, processing will be prevented.
  noProcess: wildcardPatterns
};
```

<a name="grunt-file-delete"></a>
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

<a name="grunt-file-mkdir"></a>
### grunt.file.mkdir
Works like `mkdir -p`. Create a directory along with any intermediate directories. If `mode` isn't specified, it defaults to `0777 & (~process.umask())`.

_If the `--no-write` command-line option is specified, directories won't actually be created._

```js
grunt.file.mkdir(dirpath [, mode])
```

<a name="grunt-file-recurse"></a>
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

## File Lists and Wildcards
Wildcard patterns are resolved using the [glob library](https://github.com/isaacs/node-glob). See the [minimatch library](https://github.com/isaacs/minimatch) documentation for more details on supported wildcard patterns and matching options.

There are also a number of [task-specific file listing methods](api_task.md) that find files inside grunt plugins and task directories.

<a name="grunt-file-expand"></a>
### grunt.file.expand
Return a unique array of all file or directory paths that match the given wildcard pattern(s). This method accepts either comma separated wildcard patterns or an array of wildcard patterns. Paths matching patterns that begin with `!` will be excluded from the returned array. Patterns are processed in order, so inclusion and exclusion order is significant.

```js
grunt.file.expand([options, ] patterns)
```

File paths are relative to the Gruntfile unless the current working directory is changed with `grunt.file.setBase` or the `--base` command-line option.

The `options` object supports all [minimatch library](https://github.com/isaacs/minimatch) options. Here are a few examples of where these options might be useful:

* If `options.matchBase` is true, patterns without slashes will match against the basename of the path even if it contains slashes, eg. pattern `*.js` will match filepath `path/to/file.js`.
* If `options.nonull` is true, patterns that fail to match anything will be returned in the result set. This allows further testing with `grunt.file.exists` to determine if any of the specified patterns were invalid.
* If `options.cwd` is set, patterns will be matched relative to that path, and all returned filepaths will also be relative to that path.

<a name="grunt-file-expandDirs"></a>
### grunt.file.expandDirs
This method behaves the same as `grunt.file.expand` except it only returns directory paths.

```js
grunt.file.expandDirs([options, ] patterns)
```

<a name="grunt-file-expandFiles"></a>
### grunt.file.expandFiles
This method behaves the same as `grunt.file.expand` except it only returns file paths.

```js
grunt.file.expandFiles([options, ] patterns)
```

This method is used by many built-in tasks to handle wildcard expansion of the specified source files.

<a name="grunt-file-expandFileURLs"></a>
### grunt.file.expandFileURLs
Return a unique array of all `file://` URLs for files that match the given wildcard pattern(s). Any absolute `file://`, `http://` or `https://` URLs specified will be passed through. This method accepts one or more comma separated wildcard patterns (or URLs), as well as an array of wildcard patterns (or URLs).

```js
grunt.file.expandFileURLs(patternsOrURLs)
```

<a name="grunt-file-fileMapping"></a>
### grunt.file.fileMapping
Build a files object suitable for use as a multi task "files" object. For each source file matched by a specified pattern, join that file path to the specified `destBase`. This file path may be flattened or renamed, depending on the options specified.

See the [[Configuring tasks]] guide for more information on configuring multi tasks. Also, see the `grunt.file.expand` method documentation for an explanation of how the `patterns` and `options` arguments may be specified.

```js
grunt.file.fileMapping(patterns, destBase [, options])
```

In addition to those the `grunt.file.expand` method supports, the `options` object also supports these properties:

```js
var options = {
  // The directory from which patterns are matched. Any string specified as
  // cwd is effectively stripped from the beginning of all matched paths.
  cwd: String,
  // Remove the path component from all matched src files. The src file path
  // is still joined to the specified destBase.
  flatten: Boolean,
  // If specified, this function will be responsible for returning the final
  // dest filepath. By default, it joins destBase and destPath:
  rename: function(destBase, destPath, options) {
    return path.join(destBase, destPath);
  }
};
```

<a name="grunt-file-findup"></a>
### grunt.file.findup
Search in the given directory followed by all parent directories for a file matching the given wildcard pattern(s). Returns the first matching filepath found, otherwise returns `null`. This method accepts either comma separated wildcard patterns or an array of wildcard patterns.

```js
grunt.file.findup(rootdir, patterns)
```

<a name="grunt-file-match"></a>
### grunt.file.match
Match one or more wildcard patterns against one or more file paths. Returns a uniqued array of all file paths that match any of the specified wildcard patterns. Both the `patterns` and `filepaths` argument can be a single string or array of strings. Paths matching patterns that begin with `!` will be excluded from the returned array. Patterns are processed in order, so inclusion and exclusion order is significant.

```js
grunt.file.match([options, ] patterns, filepaths)
```

The `options` object supports all [minimatch library](https://github.com/isaacs/minimatch) options. For example, if `options.matchBase` is true, patterns without slashes will match against the basename of the path even if it contains slashes, eg. pattern `*.js` will match filepath `path/to/file.js`.

<a name="grunt-file-isMatch"></a>
### grunt.file.isMatch
This method behaves similarly to `grunt.file.match` except it simply returns `true` if any files were matched, otherwise `false`.

## File types

<a name="grunt-file-exists"></a>
### grunt.file.exists
Does the given path exist? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.exists(path1 [, path2 [, ...]])
```

<a name="grunt-file-isLink"></a>
### grunt.file.isLink
Is the given path a symbolic link? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isLink(path1 [, path2 [, ...]])
```

Returns false if the path doesn't exist.

<a name="grunt-file-isDir"></a>
### grunt.file.isDir
Is the given path a directory? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isDir(path1 [, path2 [, ...]])
```

Returns false if the path doesn't exist.

<a name="grunt-file-isFile"></a>
### grunt.file.isFile
Is the given path a file? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isFile(path1 [, path2 [, ...]])
```

Returns false if the path doesn't exist.

## Paths

<a name="grunt-file-isPathAbsolute"></a>
### grunt.file.isPathAbsolute
Is a given file path absolute? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isPathAbsolute(path1 [, path2 [, ...]])
```

<a name="grunt-file-arePathsEquivalent"></a>
### grunt.file.arePathsEquivalent
Do all the specified paths refer to the same path? Returns a boolean.

```js
grunt.file.arePathsEquivalent(path1 [, path2 [, ...]])
```

<a name="grunt-file-doesPathContain"></a>
### grunt.file.doesPathContain
Are all descendant path(s) contained within the specified ancestor path? Returns a boolean.

_Note: does not check to see if paths actually exist._

```js
grunt.file.doesPathContain(ancestorPath, descendantPath1 [, descendantPath2 [, ...]])
```

<a name="grunt-file-isPathCwd"></a>
### grunt.file.isPathCwd
Is a given file path the CWD? Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isPathCwd(path1 [, path2 [, ...]])
```

<a name="grunt-file-isPathInCwd"></a>
### grunt.file.isPathInCwd
Is a given file path inside the CWD? Note: CWD is not _inside_ CWD. Returns a boolean.

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.

```js
grunt.file.isPathInCwd(path1 [, path2 [, ...]])
```

<a name="grunt-file-userDir"></a>
### grunt.file.userDir
Return a file path relative to the user's `.grunt` directory, which is `%USERPROFILE%\.grunt\` on Windows, and `~/.grunt/` on OS X or Linux. If no file path is specified, the base user `.grunt` directory path will be returned. If the specified path is not found, `null` is returned.

Windows users: `%USERPROFILE%` is generally your `Documents and Settings` directory.

_Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path._

```js
grunt.file.userDir([path1, [, path2 [, ...]]])
```

<a name="grunt-file-setBase"></a>
### grunt.file.setBase
Change grunt's current working directory (CWD). By default, all file paths are relative to the Gruntfile. This works just like the `--base` command-line option.

```js
grunt.file.setBase(path1 [, path2 [, ...]])
```

Like the Node.js [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) method, this method will join all arguments together and normalize the resulting path.


## External libraries

<a name="grunt-file-glob"></a>
### grunt.file.glob
[glob](https://github.com/isaacs/node-glob) - File globbing utility.

<a name="grunt-file-minimatch"></a>
### grunt.file.minimatch
[minimatch](https://github.com/isaacs/minimatch) - File pattern matching utility.