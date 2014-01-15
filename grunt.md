Grunt expõe todos seus métodos e propriedades através do objeto `grunt` que é definido na função `module.exports` declarada no seu arquivo [Gruntfile](Getting-started), plugin Grunt ou em um [arquivo de tarefas](Creating-tasks).

Praticamente todos os métodos seguintes são definidos em outros módulos, mas por conveniência, são acessíveis através do objeto `grunt`. Veja a documentação individual de cada API para mais detalhes e exemplos.

## Configuração

### grunt.initConfig
_Este método é um *alias* do método [grunt.config.init](grunt.config#grunt.config.init)._


## Criando tarefas

### grunt.registerTask
_Este método é um *alias* do método [grunt.task.registerTask](grunt.task#grunt.task.registerTask)._

### grunt.registerMultiTask
_Este método é um *alias* do método [grunt.task.registerMultiTask](grunt.task#grunt.task.registerMultiTask)._

### grunt.renameTask
_Este método é um *alias* do método [grunt.task.renameTask](grunt.task#grunt.task.renameTask)._

## Carregamento de tarefas definidas externamente

### grunt.loadTasks
_Este método é um *alias* do método [grunt.task.loadTasks](grunt.task#grunt.task.loadTasks)._

### grunt.loadNpmTasks
_Este método é um *alias* do método [grunt.task.loadNpmTasks](grunt.task#grunt.task.loadNpmTasks)._


## *Warnings* e erros fatais

### grunt.warn
_Este método é um *alias* do método [grunt.fail.warn](grunt.fail#grunt.fail.warn)._

### grunt.fatal
_Este método é um *alias* do método [grunt.fail.fatal](grunt.fail#grunt.fail.fatal)._


## Parâmetros via linha de comando

### grunt.option
Recupera o valor de um paramêtro definido na linha de comando, por exemplo: `debug`. Note que para cada paramêtro, o inverso pode ser testado: `no-debug`.

```javascript
grunt.option(optionName)
```

## Outros

### grunt.package
Objeto contendo as informações do arquivo `package.json` da atual instalação Grunt.

```javascript
grunt.package
```

### grunt.version
Versão atual do Grunt em formato string. Este é apenas um atalho para a propriedade `grunt.package.version`.

```javascript
grunt.version
```
