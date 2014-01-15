Este guia explica como configurar tarefas para seu projeto usando um arquivo `Gruntfile`. Se você não sabe o que o `Gruntfile` é, por favor leia o guia de [[Introdução]](Getting-started.md) e veja um [[Gruntfile modelo]](Sample-Gruntfile.md)

## Configuração do Grunt
A configuração de uma tarefa é especificada no seu `Gruntfile` através do método `grunt.initConfig`. Esta configuração será principalmente em propriedades com o nome da tarefa, mas poderão conter qualquer dados arbitrários. Contando que as propriedades não criem conflitos com propriedades que suas tarefas precisam, elas serão de alguma forma ignorada.

Também, por que é JavaScript, você não é limitado ao JSON; você pode usar qualquer JavaScript válido aqui. Você pode até gerar configurações programadas, se necessário.

```js
grunt.initConfig({
  concat: {
    // a tarefa concat vai aqui.
  },
  uglify: {
    // a tarefa uglify vai aqui.
  },
  // Propriedades arbitrárias de não tarefas.
  my_property: 'whatever',
  my_src_files: ['foo/*.js', 'bar/*.js'],
});
```

## Configurações de tarefas e targets
Quando uma tarefa é executada, o Grunt procura por uma configuração de uma propriedade de mesmo nome. Múltiplas tarefas podem ter múltiplas configurações, definidas usando arbitráriamente chamadas "targets". No exemplo abaixo, a tarefa `concat`, tem os targets `foo` e `bar`, enquanto a tarefa `uglify` tem somente o target `bar`.

```js
grunt.initConfig({
  concat: {
    foo: {
      // as opções e arquivos do target "foo" da tarefa concat
    },
    bar: {
      // as opções e arquivos do target "bar" da tarefa concat
    },
  },
  uglify: {
    bar: {
      // as opções e arquivos do target "bar" da tarefa uglify
    },
  },
});
```
Especificando ambas tarefas e targets como `grunt concat:foo` ou `grunt concat:bar` vai processar somente a configuração da target especificada, enquanto executando `grunt concat` vai iterar sobre _todos_ os targets, processando cada um em turno. Note que se uma tarefa foi renomeada com [grunt.task.renameTask](grunt.task.md#grunttaskrenametask-), o Grunt vai procurar por uma propriedade que o _novo_ nome da tarefa no objeto da configuração.

## Opções
Dentro da configuração de uma tarefa, uma propriedade `options` pode ser especificada para sobrescrever os padrões. Adicionando, cada target pode ter uma propriedade `options` que é específica para cada target. Opções no nível dos targets, vão sobrescrever as opções no nível da tarefa.

O objeto `options` é opcional e pode ser omitido, caso não necessário.

```js
grunt.initConfig({
  concat: {
    options: {
      // As opções no nível das tarefas virão aqui, sobrescrevendo as opções padrão.
    },
    foo: {
      options: {
        // as opções do target 'foo' virão aqui, sobrescrevendo as opções acima especificadas.
      },
    },
    bar: {
      // Nenhuma opção especificada; Este target vai usar as opções no nível da tarefa.
    },
  },
});
```

## Arquivos
Porque a maioria das tarefas realizam operações em arquivos, o Grunt tem poderosas abstrações para declarar nos arquivos que a tarefa deve operar. Existem alguns jeitos de definir o **src-dest** (destino de saída) dos arquivos mapeados, oferecendo varios tipos de aviso e controle. Qualquer multi task vai entender que todos os seguintes formatos, então escolha qual o melhor formato que você precisa.

Todos dos formatos suportam `src` e `desy` mas os formatos "Compact" e "File Array" suportam algumas propriedades adicionais:

* `filter` Tanto um [nome de método válido fs.Stats](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) ou uma função que for passada que corresponda à pasta `src` e retorna `true` ou `false`.
* `nonull` Quando uma combinação não é encontrada, retorna uma lista de patterns. Caso contrário, uma lista vazia é retornada se não houver combinações. Combinada com a flag do Grunt `--verbose`, esta opção pode ajudar a debugar problemas nos caminhos das pastas.
* `dot` Permite que patterns combinem com nomes de arquivo com um período, mesmo se o pattern não explicite ter um periodo neste local.
* `matchBase` Se setado, o pattern sem barras vai ser comparado com o basename do caminho se este tiver barras. Por exemplo, o pattern `a?b` poderá combinar com o caminho `/xyz/123/acb`, porém não `/xyz/acb/123`.
* `expand` Processa um mapeamento dinâmico no destino, veja ["Construindo objetos do arquivo dinamicamente"](configuring-tasks.md#building-the-files-object-dynamically) para mais informações.
* Outras propriedades serão passadas para as lib subjacentes como opções de correspodência. Veja a documentação do [node-glob][] e [minimatch][] para mais opções.

### Formato compacto
Esta forma permite um único mapeamento do **src-dest** (destino) por target. Isto é mais comumente usado para tarefas somente-leitura, como a tarega [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint), onde uma única propriedade é necessária, e nenhuma chave `dest` é relevante. Este formato também suporta propriedades adicionais por mapeamento de arquivos no destino e na fonte (src-dest).

```js
grunt.initConfig({
  jshint: {
    foo: {
      src: ['src/aa.js', 'src/aaa.js']
    },
  },
  concat: {
    bar: {
      src: ['src/bb.js', 'src/bbb.js'],
      dest: 'dest/b.js',
    },
  },
});
```

### Objeto de formato de arquivo
Esta forma suporta múltiplos mapeamentos de destino e fonte (src-dest) por target, onde o nome da propriedade é o nome do(s) arquivo(s) de destino. Qualquer número de mapeamentos de destino e fonte pode ser especificado dessa maneira, mas propriedades adicionais podem não ser especificadas no mapeamento.

```js
grunt.initConfig({
  concat: {
    foo: {
      files: {
        'dest/a.js': ['src/aa.js', 'src/aaa.js'],
        'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
      },
    },
    bar: {
      files: {
        'dest/b.js': ['src/bb.js', 'src/bbb.js'],
        'dest/b1.js': ['src/bb1.js', 'src/bbb1.js'],
      },
    },
  },
});
```

### Arquivos no formato de Array
Esta forma suporta múltiplos mapeamentos de destinos e fontes por target, enquanto também permite propriedades adicionais por mapeamento.

```js
grunt.initConfig({
  concat: {
    foo: {
      files: [
        {src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
        {src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'},
      ],
    },
    bar: {
      files: [
        {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
        {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'},
      ],
    },
  },
});
```

### Formatos antigos
O formato de arquivo **dest-as-target** (destino como target) é um resquício de multi-tarefas e targets antes existentes, onde o caminho de destino é atualmente o nome do target. Infelizmente, pelos nomes dos targets serem caminhos de arquivo, executando `grunt task:target` pode ser inadequado. Também, você não precisa especificar opções no nível de tarefa ou propriedades adicionais por mapeamentos de arquivos destino e fonte.

Considere este formato obsoleto, e evite-o quando possível.

```js
grunt.initConfig({
  concat: {
    'dest/a.js': ['src/aa.js', 'src/aaa.js'],
    'dest/b.js': ['src/bb.js', 'src/bbb.js'],
  },
});
```

### Funções de filtro customizadas
A propriedade `filter` pode ajudar seus arquivos do target com um melhor nível de detalhes. Simplesmente use um [fs.Stats válido nome de método](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats). O código seguinte vai executar a tarefa `clean` no target `foo` somente nos arquivos que combinam com o pattern.

```js
grunt.initConfig({
  clean: {
    foo: {
      src: ['tmp/**/*'],
      filter: 'isFile',
    },
  },
});
```

Ou crie sua própria função `filter` e retorne `true` ou `false` se o arquivo combina com o pattern. O seguinte exemplo vai ser executado somente nas pastas que estão vazias.

```js
grunt.initConfig({
  clean: {
    foo: {
      src: ['tmp/**/*'],
      filter: function(filepath) {
        return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
      },
    },
  },
});
```

### Patterns de englobamento
É impraticável especificar todos os cominhos de cada arquivo individualmente, então o Grunt suporta a expansão do nome do arquivo (também conhecido como englobamento) através das bibliotecas [node-glob][] e [minimatch][].

[node-glob]: https://github.com/isaacs/node-glob
[minimatch]: https://github.com/isaacs/minimatch

Como isto não é um tutorial compreensivo de patterns de englobamento, saiba disso em um caminho:

* `*` corresponde com qualquer caractere, exceto `/`
* `?` corresponde a um único caractere, exceto `/`
* `**` combina com qualquer caractere, incluindo `/`, contanto que é única coisa na parte de um caminho
* `{}` permite uma lista de expressões separadas por vírgula
* `!` no início do pattern, vai fazer com que não corresponda com o pattern dado

A maioria das pessoas precisam saber que `foo/*.js` corresponde com todos os arquivos que terminan com `.js` no subdiretório `foo/`, e que `foo/**/*.js` corresponde a todos os arquivos que terminan com `.js` no subdiretório `foo/` _e todos os seus subdiretórios_.
O conjunto de resultados é unico.

Por exemplo:

```js
// Você pode especificar arquivos únicos:
{src: 'foo/this.js', dest: ...}
// Ou um Array com arquivos:
{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: ...}
// Or you can generalize with a glob pattern:
{src: 'foo/th*.js', dest: ...}

// Esse único pattern node-glob:
{src: 'foo/{a,b}*.js', dest: ...}
// Que também pode ser escrito dessa forma:
{src: ['foo/a*.js', 'foo/b*.js'], dest: ...}

// Todos os arquivos .js, em foo/, em ordem alfabética:
{src: ['foo/*.js'], dest: ...}
// Aqui, bar.js é o primeiro, seguido pelos arquivos restantes, em ordem alfabética:
{src: ['foo/bar.js', 'foo/*.js'], dest: ...}

// Todos os arquivos exceto bar.js, em ordem alfabética:
{src: ['foo/*.js', '!foo/bar.js'], dest: ...}
// Todos os arquivos em ordem alfabética, mas bar.js vai por último.
{src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: ...}

// Templates podem ser usados em caminhos ou patterns:
{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
// Mas podem referenciar lista de arquivos definidas em outro lugar na configuração:
{src: ['foo/*.js', '<%= jshint.all.src %>'], dest: ...}
```

Para saber mais sobre englobamento de patterns, veja a documentação do [node-glob][] e [minimatch][].

### Construindo o objeto dos arquivos dinamicamente
Quando você quer processar vários arquivos individuais, algumas propriedades adicionais podem ser usadas para fazer uma lista de arquivos dinamicamente. Estas propriedades podem ser especificadas em ambos formatos de mapeamento "Compact" e "Files Array".

`expand` Sete `true` para habilitar as sequintes opções:

* `cwd` Todos os correspondentes à `src` são relativos a (mas não incluem) este diretório.
* `src` Corresponder pattern(s), relativos à `cwd`.
* `dest` Prefixo do diretório de destino.
* `ext` Substitui qualquer extensão existente com o valor gerado nos diretórios `dest`.
* `flatten` Exclui todos as partes dos diretórios geradas pelo `dest`.
* `rename` Esta função é chamada para cada arquivo que corresponde em `src`, (depois de renomear e diminuir a extensão). O `dest` e os `src` correspondentes são passados, e esta função deve retornar um novo valor para `dest`. Se o mesmo `dest` é retornado mais  de uma vez, cada `src` que é usado vai ser adicionado a um Array de fontes.

No seguinte exemplo, o tarefa `uglify` vai ter a mesma lista de mapeamentos de destinos e fontes para ambos targets `static_mappings` e `dynamic_mappings`, porque o Grunt vai automaticamente expandir os objetos dos arquivos com `dynamic_mappings` para 4 individuais arquivo do mapeamento na fonte e destino (src-dest), assumingo que 4 arquivos serão encontrados quando a tarefa for executada.

Qualquer combinação de fontes-destino estática mapeamentos dinâmicos podem ser especificados.

```js
grunt.initConfig({
  uglify: {
    static_mappings: {
      // Pelo mapeamento da fonte e destino estarem manualmente especificadas, cada
      // vez que um novo arquivo é adicionado ou removido, o arquivo Gruntfile tem de ser atualizado.
      files: [
        {src: 'lib/a.js', dest: 'build/a.min.js'},
        {src: 'lib/b.js', dest: 'build/b.min.js'},
        {src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
        {src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'},
      ],
    },
    dynamic_mappings: {
      // O Grunt vai pesquisar por "**/*.js" dentro de "lib/" quando a tarefa uglify
      // é executada e é contruída com o mapeamento da fonte e destino, então você
      // não precisa atualizar o arquivo Gruntfile quando arquivos são adicionados ou removidos.
      files: [
        {
          expand: true,     // Habilita a extensão dinâmica.
          cwd: 'lib/',      // Os arquivos de fonte são relativos a essa pasta.
          src: ['**/*.js'], // Pattern a ser combinado.
          dest: 'build/',   // Prefixo do diretório de destino.
          ext: '.min.js',   // Os nomes dos arquivos de destino terão esta extensão.
        },
      ],
    },
  },
});
```

## Templates
Templates especificados com os delimitadores `<% %>` serão automaticamente expandidos quando tarefas a leêm no objeto de configuração. Templates são expandidos recursivamente até não haver mais nenhum.

O objeto da configuração inteiro é o contexto em que as propriedades são interpretadas. Ainda, `grunt` e seus métodos são disponíveis em templates, ex.: `<%= grunt.template.today('yyyy-mm-dd') %>`.

* `<%= prop.subprop %>` Expande ao valor da `prop.subprop` na configuração, independente do tipo. Templates como este podem ser referenciados não somente em valores strinf, mas também arrays de outros objetos.
* `<% %>` Executa arbitrariamente código JavaScript inline. Isto é útil com controle de fluxo ou looping.

Dado o exemplo da configuração da tarefa `concat` abaixo, executando `grunt concat:sample` vai gerar um arquivo chamando `build/abcde.js` concatenando o banner `/* abcde */` com todos os arquivos que correspodem aos patterns `foo/*.js` + `bar/*.js` + `baz/*.js`.

```js
grunt.initConfig({
  concat: {
    sample: {
      options: {
        banner: '/* <%= baz %> */\n',   // '/* abcde */\n'
      },
      src: ['<%= qux %>', 'baz/*.js'],  // [['foo/*.js', 'bar/*.js'], 'baz/*.js']
      dest: 'build/<%= baz %>.js',      // 'build/abcde.js'
    },
  },
  // Propriedades arbitrárias usadas na configuração de templates de tarefas.
  foo: 'c',
  bar: 'b<%= foo %>d', // 'bcd'
  baz: 'a<%= bar %>e', // 'abcde'
  qux: ['foo/*.js', 'bar/*.js'],
});
```

## Importando Dados Externos
No seguinte arquivo Gruntfile, os metadados do projeto são importados  à configuração do Grunt do arquivo `package.json`, e o [plugin grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify) na tarefa `uglify` é configurada para minificar um arquivo fonte e gerar um comentário no banner dinamicamente com os  metadados.

O Grunt tem os métodos `grunt.file.readJSON` e `grunt.file.readYAML` para importação de dados JSON e YAML.

```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    dist: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'dist/<%= pkg.name %>.min.js'
    }
  }
});
```
