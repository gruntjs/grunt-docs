## grunt
* bump version to 0.4.0
* npm publish BUT NOT AS "latest" initially: `npm publish --tag beta`
* update gruntplugin devDependencies (after gruntplugins are published)

## grunt-cli
* npm publish (already done)

## grunt-init
* update templates
* update grunt dependency to ~0.4.0
* update gruntplugin devDependencies (after gruntplugins are published)

## former core tasks which are now contrib plugins
* update CHANGELOG to say "Extracted from grunt, compatible with grunt 0.4.0."
* update package.json "main" to point to Gruntfile.js
* update gruntplugin devDependencies
* update docs to point to task configuration docs (remove duplicate docs from tasks)

## all other contrib plugins
* Document which major version number still works with 0.3 in docs/overview.
* bump major version (update CHANGELOG to say "Now compatible with grunt 0.4.0.)
* update docs to point to task configuration docs (remove duplicate docs from tasks)

## grunt-contrib
* update grunt-contrib to include latest plugins
* automate generation of entire repo (TODO in the future).

## ecosystem
* post a message on every gruntplugin repo with a link and short explanation about how to upgrade their task.
* blog about 0.4 release (bocoup guest post explaining how we broke grunt up, where we are headed etc).

## wiki
* import API docs to wiki
* finish docs

## website
* update!