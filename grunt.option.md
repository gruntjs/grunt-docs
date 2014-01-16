A API Grunt Option permite o compartilhamento de parâmetros entre diferentes tarefas e provê acesso a parâmetros definidos via linha de comando.


Um bom exemplo seria uma flag para definir se o seu build é para uma versão de teste (dev) ou produção (staging). O seguinte exemplo, inserido na linha de comando: `grunt deploy --target=staging` faz com que `grunt.option('target')` retorne `"staging"`.

Um exemplo de `Gruntfile` que utiliza o parâmetro `target` seria:

```javascript
grunt.initConfig({
  compass: {
    dev: {
      options: {
        /* ... */
        outputStyle: 'expanded'
      },
    },
    staging: {
      options: {
        /* ... */
        outputStyle: 'compressed'
      },
    },
  },
});
var target = grunt.option('target') || 'dev';
grunt.registerTask('deploy', ['compass:' + target]);
```

Executando o comando `grunt deploy` seu CSS usa as opções definidas no objeto `dev` como padrão e o resultado utilizaria o formato "expanded". Caso seja executado `grunt deploy --target=staging`, as opções definidas em `staging` seriam utilizadas e o CSS final utilizaria o formato "compressed".

`grunt.option` também pode ser usado dentro de tarefas, por exemplo:

```javascript
grunt.registerTask('upload', 'Upload do código para um target específico.', function(n) {
  var target = grunt.option('target');
  // Faça algo de útil com a variável target aqui
});
grunt.registerTask('deploy', ['validate', 'upload']);
```

_Observação: Opções booleanas podem ser especificadas usando somente sua referência. Por exemplo, executando `grunt deploy --staging` no terminal faz com que `grunt.option('staging')` retorne `true`._


### grunt.option ☃
Retorna ou altera um parâmetro.

```javascript
grunt.option(key[, val])
```

Valores booleanos podem ser invertidos se adicionarmos o prefixo `no-` a referência do parâmetro. Por exemplo:

```javascript
grunt.option('staging', false);
var isDev = grunt.option('no-staging');
// isDev === true
```

### grunt.option.init
Inicializa `grunt.option`. Se `initObject` for omitido o parâmetro será inicializado como um objeto vazio, caso contrário o parâmetro passa a ter o valor de `initObject`.

```javascript
grunt.option.init([initObject])
```

### grunt.option.flags
Retorna um array contendo os parâmetros providos via linha de comando.

```javascript
grunt.option.flags()
```
