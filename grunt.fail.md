Para quando algo vai horrorosamente errado.

Veja o [código da biblioteca de erros](https://github.com/gruntjs/grunt/blob/master/lib/grunt/fail.js) para mais informações.

## A API de falhas

Se algo explode (ou está prestes a explodir) dentro de uma tarefa, pode forçar o Grunt a abortar. Veja na [documentação de códigos de saída](Exit-Codes) uma lista de todos os códigos de saída embutidos no Grunt.

Note que qualquer método marcado com um ☃ (unicode snowman) está disponível diretamente no objeto `grunt`. Só para você saber. Veja a [Página principal da API](grunt) para mais informações de uso.

### grunt.warn ☃
Mostra um aviso e aborta o Grunt imediatamente. O Grunt continuará processando a tarefa se a opção de linha de comando `--force` for especificada. O argumento `error` pode ser uma mensagem (string) ou um objeto de erro.

```javascript
grunt.fail.warn(error [, errorcode])
```

Se `--debug 9` for especificado na linha de comando e um objeto de erro for especificado, um stack trace será registrado.

_Este método também está disponível como `grunt.warn`._

### grunt.fatal ☃
Mostra um aviso e aborta o Grunt imediatamente. O argumento `error` pode ser uma mensagem (string) ou um objeto de erro.

```javascript
grunt.fail.fatal(error [, errorcode])
```

Se `--debug 9` for especificado na linha de comando e um objeto de erro for especificado, um stack trace será registrado.

Um sinal será emitido no `fatal` a não ser que a opção `--no-color` seja especificada.

_Este método também está disponível como `grunt.fatal`._
