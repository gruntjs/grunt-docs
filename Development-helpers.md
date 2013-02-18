Good to do when publishing everything all-at-once.

```shell
eachdir grunt grunt-{contrib,lib}-* -- 'git pull'
eachdir grunt grunt-{contrib,lib}-* -- 'rm -rf node_modules; linken . --src ..; npm install'

# Make sure symlinks were created, if not there's a version mismatch
eachdir grunt grunt-{contrib,lib}-* -- 'll node_modules | grep grunt'

# Make sure everything passes
eachdir grunt grunt-{contrib,lib}-* -- grunt

# Make sure all versions are final
eachdir grunt grunt-{contrib,lib}-* -- 'git branch; node -pe "require(\"./package.json\").version"'
```