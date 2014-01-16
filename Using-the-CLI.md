A interface para linha de comando `grunt` vem com uma série de opções. Use `grunt -h` no seu terminal para mostrar estas opções.

### --help, -h
Mostra o texto de ajuda.

### --base, -b
Especifica um caminho base alternativo. Por padrão, todos os caminhos de arquivos são relativos ao `Gruntfile`.

Alternativa para `grunt.file.setBase(...)`

### --no-color
Desabilita a saída de texto colorida.

### --gruntfile
Especifica um `Gruntfile` alternativo.

Por padrão, o grunt procura no diretório atual ou nos diretórios parentes pelo arquivo `Gruntfile.js` ou `Gruntfile.coffee` mais próximo.

### --debug, -d
Ativa o modo de inspeção para as tarefas que o suportam.

### --stack
Renderiza um *stack trace* quando acusado um aviso ou erro fatal.

### --force, -f
Uma forma para forçar a passagem por avisos.

Gostaria de uma sugestão? Não utilize esta opção, corrija o seu código.

### --tasks
Caminhos de diretórios adicionais a serem escaneados por tarefas e arquivos "extras".

Alternativa para `grunt.loadTasks(...)`

### --npm
Plugins do Grunt instalados via NPM a serem escaneados por tarefas e arquivos "extras".

Alternativa para `grunt.loadNpmTasks(...)`

### --no-write
Desabilitar escrita em arquivos (execução enxuta)

### --verbose, -v

Modo verboso. Muito mais informações para visualização.

### --version, -V
Imprime a versão do Grunt. Combine com --verbose para mais informações.

### --completion
Renderiza as regras para auto-complemento do shell. Veja a documentação do grunt-cli para mais informações.
