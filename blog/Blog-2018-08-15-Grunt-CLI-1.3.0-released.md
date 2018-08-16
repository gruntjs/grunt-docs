The Grunt team is pleased to announce the release Grunt CLI `1.3.0`.

> npm install grunt-cli -g

This release is made possible by [@shama](https://github.com/shama), [@vladikoff](https://github.com/vladikoff), [@Arkni](https://github.com/Arkni), [@phated](https://github.com/phated), and all the [Liftoff contributors](https://github.com/js-cli/js-liftoff/graphs/contributors).

---

This release is significant as it allows you to now write your Gruntfile in your
preferred language. Previously Gruntfiles, by default, could only be wrote in
either JavaScript or CoffeeScript.

With `>= 1.3.0`, if you would like to write your Gruntfile in [TypeScript](https://www.typescriptlang.org/),
rename your Gruntfile to end with the appropriate extension: `Gruntfile.ts`
and install the appropriate interpreter, `npm install typescript`.

Running the command `grunt` will now interpret the Gruntfile accordingly.

Another example, if you would like to write your Gruntfile using [Babel](https://babeljs.io/),
rename your Gruntfile to `Gruntfile.babel.js` and `npm install babel`.

By default, the Grunt CLI can interpret a number of popular file extensions thanks
to [interpret](https://www.npmjs.com/package/interpret), including:

*   `Gruntfile.babel.js` -> `npm install babel`
*   `Gruntfile.buble.js` -> `npm install buble`
*   `Gruntfile.coffee` -> `npm install coffeescript`
*   `Gruntfile.coffee.md` -> `npm install coffeescript`
*   `Gruntfile.csv` -> `npm install require-csv`
*   `Gruntfile.ini` -> `npm install require-ini`
*   `Gruntfile.json`
*   `Gruntfile.ls` -> `npm install livescript`
*   `Gruntfile.ts` -> `npm install typescript`
*   `Gruntfile.yaml` -> `npm install require-yaml`

If the Grunt CLI doesn't support your preferred language, you can add support by
using the `--require` option:

> grunt --require myscript/register

Then Grunt will require your custom module to interpret the Gruntfile.

This is all possible as the Grunt CLI now runs using [Liftoff](https://www.npmjs.com/package/liftoff).

## CoffeeScript

Previously Gruntfiles could be wrote by default in CoffeeScript. That version of
CoffeeScript has been and will be locked to `~1.10.0`.

Relying on your `Gruntfile.coffee` file to be automatically interpreted is now deprecated.

If your Gruntfile is wrote in CoffeeScript, please additionally run
`npm install coffeescript --save-dev`. This will allow you to use your preferred
version of CoffeeScript and not be locked to the version installed with Grunt.
In the next major version release of Grunt, the CoffeeScript dependency will be
removed and it will be required to additionally `npm install coffeescript` to
write your Gruntfiles in CoffeeScript.
