Acesso aos dados das configurações de um projeto específico no arquivo Gruntfile.
 
Note que qualquer método marcado com um ☃ (unicode boneco de neve) também está disponível diretamente no objeto `grunt`, e qualquer método marcado com uma ☆ (estrela branca) também está disponível dentro da tarefa do objeto `this`. Apenas para você saber.

## Inicializando os dados da configuração 
_Observe que o método a seguir também está disponível no objeto `grunt` como `grunt.initConfig`._

### grunt.config.init ☃
Inicializa a configuração de um objeto para o projeto atual. O `configObject` especificado é usado por tarefas e pode ser acessada usando o método `grunt.config`. Quase tudo no `Gruntfile` vai chamar esse método.
 
```js
grunt.config.init(configObject)
```

Observe que qualquer string `<% %>` especificada no template será processada quando os dados da configuração forem recuperados.

Este exemplo contém um modelo de dados de configuração para a tarefa [grunt-contrib-jshint plugin](https://github.com/gruntjs/grunt-contrib-jshint) `jshint`:

```js
grunt.config.init({
  jshint: {
    all: ['lib/*.js', 'test/*.js', 'Gruntfile.js']
  }
});
```

Veja o guia de [Introdução](Getting-started.md) para mais exemplos de configuração.

_Este método também está disponível como `grunt.initConfig`._


## Acessando dados da configuração
Os métodos a seguir permitem acessar os dados de configuração do Grunt tanto por string delimitada por um ponto como `'pkg.author.name'` quanto através de nome de propriedades de array como ['pkg', 'author', 'name’].

Observe que se um nome de propriedade especificado contém um `.` ponto, ele deve ser precedido por uma barra invertida, por exemplo. `'concat.dist/built\\.js'`. Se uma parte do array for especificado, o Grunt manipulará internamente o escape com o método `grunt.config.escape`.

### grunt.config
Obter ou definir um valor para a configuração no projeto do Grunt. Este método serve como um atalho para outros métodos; se são passados dois argumentos, `grunt.config.set` é chamado, se não `grunt.config.get` é chamado.
 
```js
grunt.config([prop [, value]])
```

### grunt.config.get
Obter um valor para a configuração no projeto do Grunt. Se o `prop` é especificado, o valor dessa propriedade é retornado, ou `null` se a propriedade não estiver definida. Se o `prop` não é especificado, uma cópia de todo o objeto de configuração é retornado. Templates de strings serão processados de forma recursiva usando o método `grunt.config.process`.

```js
grunt.config.get([prop])
```

### grunt.config.process
Processa um valor, recursivamente expande o template `<% %>` (através do método `grunt.template.process`) no contexto da configuração do Grunt, da maneira que eles são encontrados. Este método é chamado automaticamente pelo `grunt.config.get` mas _não_ pelo `grunt.config.getRaw`.
 
```js
grunt.config.process(value)
```

Se qualquer valor inteiramente recuperado é um único modelo de string `'<%= foo %>'` ou `'<%= foo.bar %>'`, e se a propriedade especificada `foo` ou `foo.bar` não é uma string com valor (e nem `null` ou `undefined`), ele será expandido para o valor _atual_. Isso, combinado com os arrays minificados no sistema de tarefas automatizados do Grunt, pode ser muito útil.
 
### grunt.config.getRaw
Obtém um valor bruto para a configuração no projeto do Grunt, sem processar o modelo de string `<% %>`. Se `prop` for especificado, o valor desta propriedade é retornado, ou `null` se a propriedade não estiver definida. Se `prop` não for especificado, uma cópia de todo objeto da configuração é retornado.

```js
grunt.config.getRaw([prop])
```

### grunt.config.set
Define um valor para a configuração no projeto do Grunt.

```js
grunt.config.set(prop, value)
```

Note que qualquer modelo de string `<% %>` especificado só será processado quando os dados da configuração são recuperados.

### grunt.config.escape
Escape `.` pontos em um determinado `propString`. Isso deve ser usado para nomes de propriedades que contêm pontos.

```js
grunt.config.escape(propString)
```

## Exigindo dados da configuração
_Note que o método listado abaixo também está disponível dentro dentro das tarefas do objeto `this` como `this.requiresConfig`._

### grunt.config.requires ☆
Falha na tarefa atual se está faltando uma ou mais propriedades necessárias de configuração, `null` ou `undefined`. Um ou mais strings ou arrays das propriedades de configuração podem ser especificados.

```js
grunt.config.requires(prop [, prop [, ...]])
```

_Este método também está disponível dentro das tarefas como `this.requiresConfig`._
