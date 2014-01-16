1. Instale o [grunt-init](https://github.com/gruntjs/grunt-init) executando `npm install -g grunt-init`
2. Instale o template gruntplugin com `git clone git://github.com/gruntjs/grunt-init-gruntplugin.git ~/.grunt-init/gruntplugin`
3. Execute `grunt-init gruntplugin` em um diretório vazio.
4. Execute `npm install` para preparar o ambiente de desenvolvimento.
5. Escreva seu plugin.
6. Execute `npm publish` para publicar seu plugin no npm!

## Notas

### Dando nome à task

O namespace "grunt-contrib" é reservado para tasks mantidas pelo time do Grunt, por favor, nomeie sua task com algo apropriado que evite esse esquema de nomenclatura.

### Debugando

O Grunt oculta os stack traces dos erros por padrão, mas eles podem ser habilitados com a opção `--stack`, para fácil depuramento. Se você quer que o Grunt sempre mostre os stack traces, crie um alias no seu shell. Exemplificando, no bash você pode fazer `alias grunt='grunt --stack'`.

### Armazenando os arquivos da task

Somente armazene arquivos de dados em um diretório .grunt/[npm-nome-do-modulo]/ na raiz do projeto e limpe depois que for apropriado. Isto não é solução para arquivos temporários, use um dos módulos comuns do npm (ex.: [temporary](https://npmjs.org/package/temporary) e [tmp](https://npmjs.org/package/tmp)) que tiram proveito do nível dos diretórios temporários.

### Evite Mudar o Diretório Atual
Por padrão, o atual diretório de desenvolvimento, é definido para ser o diretório que vai conter o arquivo Gruntfile. O usuário pode mudá-lo usando `grunt.file.setBase()` em seu arquivo Gruntfile, porém os plugins devem ter cuidado para não mudar isto.

`path.resolve('foo')` pode ser usado para obter o caminho absoluto do caminho do arquivo 'foo' relativo ao arquivo Gruntfile.
