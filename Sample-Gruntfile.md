Abaixo exploramos um exemplo do `Gruntfile`, que usará cinco plugins:

- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

O `Gruntfile` inteiro está no fim da página, mas se você ler tudo, vamos caminhar passo a passo.


Na primeira parte, temos a função "wrapper", que encapsula a configuração do Grunt.

```javascript
module.exports = function(grunt) {
}
```
Dentro dessa função, vamos inicializar o objeto de configuração:

```javascript
grunt.initConfig({
});
```
Depois, podemos ler as configurações do projeto que estão arquivo `package.json`, através da propriedade `pkg`. Isto permite que referenciemos os valores das propriedades dentro do arquivo `package.json`, como veremos em breve.

```javascript
pkg: grunt.file.readJSON('package.json')
```
Isso nos deixa com esse código:

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });
};
```
Agora podemos definir a configuração para cada tarefa que temos. O objeto da configuração (`pkg`) age como uma propriedade na configuração do objeto, que recebe o nome da tarefa. Então a tarefa "concat" vai para a nossa configuração pela chave "concat". Abaixo está o objeto de configuração da tarefa "concat".

```javascript
concat: {
  options: {
    // define uma string para ser colocada entre cada arquivo na saída.
    separator: ';'
  },
  dist: {
    // os arquivos a serem concatenados
    src: ['src/**/*.js'],
    // o local para saída do arquivo JS resultante
    dest: 'dist/<%= pkg.name %>.js'
  }
}
```

Note como é referenciada a propriedade `name`  que está no arquivo JSON. Nós acessamos esta propriedade usando `pkg.name` como anteriormente definimos que a propriedade `pkg` seria o resultado do carregamento do arquivo JSON, que é interpretado para um objeto JavaScript.
O Grunt tem um simples modelo de engine para a saída dos valores da propriedade do objeto da configuração. Aqui digo com a tarefa "concat" para concatenar (o mesmo que juntar) todos os arquivos existentes na pasta `src/` que terminam em `.js`.

Agora vamos configurar a tarefa "uglify", que minifica nosso JavaScript:

```javascript
uglify: {
  options: {
    // o banner é inserido no topo do arquivo de saída
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  },
  dist: {
    files: {
      'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    }
  }
}
```

Isso diz a tarefa "uglify" para criar dentro da pasta `dist/`, que contém o resultado da minificação dos arquivos JS. Aqui uso `<%= concat.dist.dest %>`, que minificará o arquivo de saída da tarefa "concat" vista acima.

O plugin QUnit é realmente simples para configurar. Você só precisar dar o local dos arquivos em que serão feitos testes, que são os arquivos HTML que o QUnit lê.
```javascript
qunit: {
  files: ['test/**/*.html']
},
```

O plugin JSHint também é bem simples de se configurar:

```javascript
jshint: {
  // define os arquivos em que o plugin será executado
  files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
  // configura o JSHint (documentado em http://www.jshint.com/docs/)
  options: {
  	// aqui você coloca mais opções, caso queira sobrescrever as opções padrões
    globals: {
      jQuery: true,
      console: true,
      module: true
    }
  }
}
```

O JSHint simplesmente "pega" um array de arquivos e então um objeto com opções. Isso tudo está [documentado no site do JSHint](http://www.jshint.com/docs/). Se você está satisfeito coms os padrões do JSHint, não há necessidade de redefini-los no arquivo Gruntfile.

Finalmente temos o plugin watch:

```javascript
watch: {
  files: ['<%= jshint.files %>'],
  tasks: ['jshint', 'qunit']
}
```

Isto pode ser executado com o comando `grunt watch`. Quando é detectado pelo plugin, que um dos arquivos especificados foram alterados, (aqui, somente usamos os arquivos que configuramos para o JSHint checar), são executadas as tarefas que você especificou, na ordem em que são dadas.

Finalmente, temos que carregar no Grunt os plugins que vamos usar. Todos estes devem estar devidamente instalados através do npm.

```javascript
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
```

E finalmente configuramos algumas tarefas. O mais importante é a tarefa "default":


```javascript
// isso deve ser executado com o comando 'grunt test'
grunt.registerTask('test', ['jshint', 'qunit']);

// a tarefa 'default' é executada quando você usa o comando 'grunt'
grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
```

E finalmente, aqui está nosso arquivo `Gruntfile.js`:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // opções que substituirão as opções padrão 
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
```

