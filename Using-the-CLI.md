## Installing the CLI

Run `sudo npm install -g grunt-cli` (Windows users should omit "sudo ", and may need to run the command-line with elevated privileges).

The `grunt` command-line interface comes with a series of options. Use `grunt -h` from your terminal to show these options.

### --help, -h

Display help text

### --base, -b

Specify an alternate base path. By default, all file paths are relative to the `Gruntfile`.

Alternative to `grunt.file.setBase(...)`

### --no-color

Disable colored output.

### --gruntfile

Specify an alternate `Gruntfile`.

By default, grunt looks in the current or parent directories for the nearest `Gruntfile.js` or `Gruntfile.[ext]` file.

### --debug, -d

Enable debugging mode for tasks that support it.

### --stack

Print a stack trace when exiting with a warning or fatal error.

### --force, -f

A way to force your way past warnings.

Want a suggestion? Don't use this option, fix your code.

### --tasks

Additional directory paths to scan for task and "extra" files.

Alternative to `grunt.loadTasks(...)`

### --npm

Npm-installed grunt plugins to scan for task and "extra" files.

Alternative to `grunt.loadNpmTasks(...)`

### --no-write

Disable writing files (dry run).

### --verbose, -v

Verbose mode. A lot more information output.

### --version, -V

Print the grunt version. Combine with --verbose for more info.

### --completion

Output shell auto-completion rules. See the grunt-cli documentation for more information.

### --preload

Specify a language interpreter to require first if you are writing your Gruntfile in a language Grunt doesn't support by default.

### --require (Grunt 1.3.0 and below)

Specify a language interpreter to require first if you are writing your Gruntfile in a language Grunt doesn't support by default.