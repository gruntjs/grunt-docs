## grunt
* get sindresorhus's files object generator in grunt itself.
* bump version to 0.4.0
* npm publish BUT NOT AS "latest" initially
* branch master -> 0.3-stable
* merge devel -> master
* (resulting in master = 0.4, 0.3-stable = 0.3)

## grunt-cli
* bump version if necessary
* npm publish

## grunt-init
* update "searchpaths" code / directories
* npm publish first
* update templates!

## all contrib plugins
* ensure version numbers are proper release numbers. 0.1.0a -> 0.1.0.
* if a version number DOESN'T end in a, bump it. 0.1.1 -> 0.1.2
* update CHANGELOG

## original contrib plugins
* branch master -> grunt-0.3-stable
* merge devel -> master
* (resulting in master = 0.4, grunt-0.3-stable = 0.3 compatible)
* Include major version number that works with 0.3 in overview.

## new contrib plugins
* ???

## grunt-contrib
* update grunt-contrib to include latest plugins
* automate generation of entire repo.

## ecosystem
* post a message on every gruntplugin repo with a link and short explanation about how to upgrade their task.
* blog about 0.4 release (bocoup guest post explaining how we broke grunt up, where we are headed etc).

## wiki
* import API docs to wiki
* finish docs

## website
* update!

