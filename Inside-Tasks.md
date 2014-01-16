Quando uma tarefa está rodando, o Grunt expõe dentro da função da tarefa muitos métodos e propriedades específicas através do objeto `this`. Este mesmo objeto também é exposto como `grunt.task.current` para uso nos [templates](grunt.template), Ex.: A propriedade `this.name` também está disponível como `grunt.task.current.name`.

## Por dentro de todas tarefas

### this.async
Se a tarefa for assíncrona, este método pode ser chamado para instruir o Grunt a esperar. Isto retorna um handle para que a função "done" seja chamada quando a tarefa for concluída. Tanto `false` ou um objeto `Error` pode ser passado para a função done para avisar ao Grunt que a tarefa falhou.

Se o método `this.async` não for chamado, a tarefa será executada de forma síncrona.

```javascript
// Diga ao Grunt que esta tarefa é assíncrona.
var done = this.async();
// Seu código assíncrono.
setTimeout(function() {
  // Vamos simular um erro, aleatoriamente.
  var success = Math.random() > 0.5;
  // Pronto!
  done(success);
}, 1000);
```

### this.requires
Se uma tarefa depender da conclusão bem sucedida de outra tarefa (ou tarefas), este método pode ser usado para forçar o Grunt a abortar se outra tarefa não tiver sido executada, ou se outra tarefa falhar. Como argumento, a lista de tarefas pode ser um array ou um nome individual.

Note que isto não vai realmente rodar a(s) tarefa(s) especificada(s), irá apenas falhar se a tarefa atual ainda não a tiver executado de forma bem sucedida.

```javascript
this.requires(tasksList)
```

### this.requiresConfig
Falha a tarefa atual se uma ou mais propriedades [config](grunt.config) necessárias estiverem faltando. Uma ou mais propriedades de configuração do tipo string ou array pode ser especificada.

```javascript
this.requiresConfig(prop [, prop [, ...]])
```

Veja a [documentação do grunt.config](grunt.config) para mais informações sobre propriedades de configuração.

_Este método é um pseudônimo para o método [grunt.config.requires](grunt.config#grunt.config.requires)._

### this.name
O nome da tarefa, definida em `grunt.registerTask`. Por exemplo, se a tarefa "sample" for rodada como `grunt sample` ou `grunt sample:foo`, dentro da função da tarefa, `this.name` seria `"sample"`.

_Note que se a tarefa tiver sido renomeada com [grunt.task.renameTask](grunt.task#grunt.task.renameTask) esta propriedade refletirá o novo nome._


### this.nameArgs
O nome da tarefa, incluindo qualquer argumento separado por dois pontos ou flags especificadas na linha de comando. Por exemplo, se a tarefa "sample" for rodada como `grunt sample:foo`, dentro da função da tarefa, `this.nameArgs` seria `"sample:foo"`.

_Note que se a tarefa tiver sido renomeada com [grunt.task.renameTask](grunt.task#grunt.task.renameTask) esta propriedade refletirá o novo nome._

### this.args
Um array de argumentos passado à tarefa. Por exemplo, se a tarefa "sample" for rodada como `grunt sample:foo:bar`, dentro da função da tarefa, `this.args` seria `["foo", "bar"]`.

_Note que em multitarefas, o target atual é omitido do array `this.args`._

### this.flags
Um objeto gerado dos argumentos passados à função. Por exemplo, se a tarefa "sample" for rodada como `grunt sample:foo:bar`, dentro da função da tarefa, `this.flags` seria `{foo: true, bar: true}`.

_Note que em multitarefas, o target atual **não** é colocado como uma flag._

### this.errorCount
O número de chamadas [grunt.log.error](grunt.log#grunt.log.error) que ocorreram durante a tarefa. Pode ser usado para falhar a tarefa se erros forem registrados durante a tarefa.

### this.options
Retorna um objeto de opções. Propriedades do argumento opcional `defaultsObj` serão sobrescritas pelas propriedades do objeto de opções de qualquer nível de tarefa, que será ainda sobrescrito nas multitarefas em qualquer nível alvo por qualquer propriedade do objeto de opções.

```js
this.options([defaultsObj])
```

Este exemplo mostra como uma tarefa pode usar o método `this.options`:

```js
var options = this.options({
  enabled: false,
});

doSomething(options.enabled);
```

O guia [Configurando tarefas](configuring-tasks#options) mostra um exemplo de como as opções podem ser especificadas do ponto de vista do usuário.

## Por dentro das multitarefas

### this.target
Em uma multitarefa, esta propriedade contém o nome do target sendo atualmente iterado. Por exemplo, se a multitarefa "sample" for rodada como `grunt sample:foo` com os dados de configuração `{sample: {foo: "bar"}}`, dentro da função da tarefa, `this.target` seria `"foo"`.

### this.files
Em uma multitarefa, todos os arquivos especificados usando quaisquer [formatos de arquivos e opções](configuring-tasks#files), [padrões de englobamento](configuring-tasks#globbing-patterns) ou [mapeamentos dinâmicos](configuring-tasks#building-the-files-object-dynamically) suportados pelo Grunt serão automaticamente normalizados em um formato simples: o [formato de arquivo do array de Arquivos](configuring-tasks#files-array-format).

O que significa que as tarefas não precisam de uma tonelada de boilerplates para explicitar formatos de arquivos personalizados, padrões de englobamento, mapeamento de arquivos de origem para arquivos de destino ou filtros fora de arquivos ou diretórios. _Um usuário da tarefa pode apenas especificar os arquivos pelo guia [Configurando tarefas](configuring-tasks#files), e o **Grunt lidará com todos os detalhes.**_

Sua tarefa deve interagir com o array `this.files`, utilizando as propriedades `src` e `dest` para cada objeto no array. A propriedade `this.files` será sempre um array. A propriedade `src` também será sempre um array, no caso de sua tarefa se importar com múltiplos arquivos de origem por arquivo de destino.

_Note que é possível que arquivos não-existentes sejam incluídos nos valores de `src`, então convêm testar explicitamente que os arquivos existam antes de usá-los._

Este exemplo mostra como uma simples tarefa do tipo "concat" pode usar a propriedade `this.files`:

```js
this.files.forEach(function(file) {
  var contents = file.src.filter(function(filepath) {
    // Remova os arquivos não existentes (cabe a você filtrar ou avisar aqui).
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  }).map(function(filepath) {
    // Lê e retorna a origem do arquivo.
    return grunt.file.read(filepath);
  }).join('\n');
  // Escreve o conteúdo unificado no caminho de destino.
  grunt.file.write(file.dest, contents);
  // Imprime uma mensagem de sucesso.
  grunt.log.writeln('File "' + file.dest + '" created.');
});
```

_Se você precisar do objeto de propriedades do arquivo original, ele estará disponível em cada objeto de arquivo individual na propriedade `orig`, mas não há nenhum caso de uso conhecido para acessar as propriedades originais._

### this.filesSrc
Em uma multitarefa, todo arquivo `src` especificado por qualquer [formato de arquivo](configuring-tasks#files) é reduzido a um simples array. Se sua tarefa for do tipo "read only" e não se importar sobre o caminho de destino, utilize esse array ao invés do `this.files`.

Este exemplo mostra como uma simples tarefa do tipo "lint" pode utilizar a propriedade `this.filesSrc`:

```js
// Arquivos específicos do Lint.
var files = this.filesSrc;
var errorCount = 0;
files.forEach(function(filepath) {
  if (!lint(grunt.file.read(filepath))) {
    errorCount++;
  }
});

// Falha a tarefa se erros forem registrados.
if (errorCount > 0) { return false; }

// Caso contrário, imprime uma mensagem de sucesso.
grunt.log.ok('Files lint free: ' + files.length);
```

### this.data
Em uma multitarefa, estes são os dados reais armazenados no objeto de configuração do Grunt para o destino especificado.
Por exemplo, se uma multitarefa "sample" for rodada como `grunt sample:foo` com os dados de configuração `{sample: {foo: "bar"}}`, dentro da função da tarefa, `this.data` seria `"bar"`.

_É recomendado que `this.options`, `this.files` e `this.filesSrc` sejam usados no lugar de `this.data`, devido a seus valores estarem normalizados._
