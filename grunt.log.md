Mensagens de saída para o console.

Veja na biblioteca a [fonte do log](https://github.com/gruntjs/grunt/blob/master/lib/grunt/log.js) para mais informações.

## A API log
A saída do Grunt deve ser consistente, e talvez até bonita. Como tal, há uma infinidade de métodos de registro, em alguns patterns úteis. Todos os métodos que atualmente registram alguma coisa são encadeáveis.

_Observação: todos os métodos disponíveis através do `grunt.verbose` agem da mesma forma que os métodos `grunt.log`, mas somente log, se a opção da linha de comando `--verbose` foi especificada._

### grunt.log.write / grunt.verbose.write
Registra a string `msg` especificada, sem adicionar uma nova linha.

```javascript
grunt.log.write(msg)
```

### grunt.log.writeln / grunt.verbose.writeln
Registra a string `msg` especificada, adicionando uma nova linha.

```javascript
grunt.log.writeln([msg])
```

### grunt.log.error / grunt.verbose.error
Se a string `msg` é omitida, é registrado `ERROR` em vermelho, caso contrário registra `>> msg`, com uma nova linha.

```javascript
grunt.log.error([msg])
```

### grunt.log.errorlns / grunt.verbose.errorlns
Registra um erro com `grunt.log.error`, adicionando o texto para 80 colunas usando `grunt.log.wraptext`.

```javascript
grunt.log.errorlns(msg)
```

### grunt.log.ok / grunt.verbose.ok
Se a string `msg` é omitida, registra `OK` em verde, caso contrário registra `>> msg`, com uma nova linha.

```javascript
grunt.log.ok([msg])
```

### grunt.log.oklns / grunt.verbose.oklns
Registra uma mensagem de sucesso com `grunt.log.ok`, adicionando o texto para 80 colunas usando `grunt.log.wraptext`.

```javascript
grunt.log.oklns(msg)
```

### grunt.log.subhead / grunt.verbose.subhead
Registra a string `msg` especificada em **negrito**, com a adição de uma nova linha.

```javascript
grunt.log.subhead(msg)
```

### grunt.log.writeflags / grunt.verbose.writeflags
Registra uma lista de propriedades `obj` (bom para depuração de flags)

```javascript
grunt.log.writeflags(obj, prefix)
```

### grunt.log.debug / grunt.verbose.debug
Registra uma mensagem de depuração (debug), mas somente se a opção da linha de comando `-debug` foi especificada.

```javascript
grunt.log.debug(msg)
```

## _Verbose_ e _Não verbose_
Todos os métodos de registros disponíveis através do `grunt.verbose` funciona exatamente como o homólogo `grunt.log`, mas somente registra se a opção da linha de comando `--verbose` foi especificada. Também há um homônimo "não verbose" disponível em ambos `grunt.log.notverbose` e `grunt.log.verbose.or`. Na verdade, a propriedade `.or` pode ser usada em ambos `verbose` e `não verbose` para alternar efetivamente entre os dois.

### grunt.verbose / grunt.log.verbose
Este objeto contém todos os métodos de `grunt.log` mas somente registra se a opção da linha de comando `--verbose` foi especificada.

```javascript
grunt.verbose
```

### grunt.verbose.or / grunt.log.notverbose
Este objeto contém todos os métodos de `grunt.log` mas somente registra se a opção da linha de comando `--verbose` _não_ foi especificada.

```javascript
grunt.verbose.or
```

## Utility Methods
Estes métodos não registram atualmente, somente retornam algumas string que podem ser usadas em outros métodos.

### grunt.log.wordlist
Retorna uma lista separada por vírgula dos itens do array `arr`,

```javascript
grunt.log.wordlist(arr [, options])
```

O objeto `options` tem estas possíveis propriedades, e valores padrões:

```javascript
var options = {
  // A string separadora. (Pode ser colorida).
  separator: ', ',
  // O item do array "color" (especifique falso para não colorir).
  color: 'cyan',
};
```

### grunt.log.uncolor
Remove todas as informações de cores de uma string, fazendo-a adequada para testar `.length` ou talvez o registro de um arquivo.

```javascript
grunt.log.uncolor(str)
```

### grunt.log.wraptext
Adiciona a string `text` para os caractedes `width` com `\n`, assegurando que as palavras não são divididas no meio a menos que seja absolutamente necessário.

```javascript
grunt.log.wraptext(width, text)
```

### grunt.log.table
Adiciona o array de strings `texts` para as colunas de caracteres `width`. Um invólucro para o método `grunt.log.wraptext` que pode ser usado para gerar a saída em colunas.

```javascript
grunt.log.table(widths, texts)
```

## Um exemplo

Um pattern comum é somente registrar (log) quando a opção `--verbose` OU se um ocorrer um erro, como esse:

```javascript
grunt.registerTask('something', 'Do something interesting.', function(arg) {
  var msg = 'Doing something...';
  grunt.verbose.write(msg);
  try {
    doSomethingThatThrowsAnExceptionOnError(arg);
    // Successo!
    grunt.verbose.ok();
  } catch(e) {
    // Alguma coisa deu errado.
    grunt.verbose.or.write(msg).error().error(e.message);
    grunt.fail.warn('Alguma coisa deu errado.');
  }
});
```

Uma explicação do código acima:

1. `grunt.verbose.write(msg);` registra a mensagem (sem uma nova linha), mas somente no mode `--verbose`.
2. `grunt.verbose.ok();` registra OK em verde, com uma nova linha.
3. `grunt.verbose.or.write(msg).error().error(e.message);` faz algumas coisas:
  1. `grunt.verbose.or.write(msg)` registra a mensagem (sem novas linhas) se não estiver no modo `--verbose`, e retorna o objeto `notverbose`.
  2. `.error()` registra "ERROR" em vermelho, com uma nova linha, e retorna o objeto `notverbose`.
  3. `.error(e.message);` registra a atual mensagem de erro (e retorna o objeto `notverbose`).
4. `grunt.fail.warn('Alguma coisa deu errado.');` registra um aviso em amarelo claro, terminando o Grunt com o código de erro 1, a menos que a opção da linha de comando `--force` foi especificada.

Dê uma olhada no [código fonte das tarefas grunt-contrib-*](https://github.com/gruntjs) para mais exemplos.
