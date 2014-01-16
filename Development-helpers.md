É bom fazer quando publicar tudo de uma vez.

```shell
eachdir grunt grunt-{contrib,lib}-* -- 'git pull'
eachdir grunt grunt-{contrib,lib}-* -- 'rm -rf node_modules; linken . --src ..; npm install'

# Verifique se os symlinks foram criados, se não, existe uma incompatibilidade de versão
eachdir grunt grunt-{contrib,lib}-* -- 'll node_modules | grep grunt'

# Verifique se tudo funciona
eachdir grunt grunt-{contrib,lib}-* -- grunt

# Verifique se todas as versões são as finais
eachdir grunt grunt-{contrib,lib}-* -- 'git branch; node -pe "require(\"./package.json\").version"'
```