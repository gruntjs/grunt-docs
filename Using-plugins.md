Plugins do Grunt definem tarefas que executam certas etapas de *build* e podem ser reutilizadas em vários projetos. Os exemplos utilizarão o plugin _"grunt-contrib-uglify"_. Verifique o [website do Grunt](http://gruntjs.com/) para uma lista de plugins disponíveis.

## Instalando um plugin do Grunt

O primeiro passo para usar um plugin do Grunt existente é instalando-o. Os plugins do Grunt são empacotados como módulos Node e podem ser instalados usando o [npm](http://npmjs.org) desta forma:

`npm install --save-dev grunt-contrib-uglify`

Isso vai instalar o plugin _"grunt-contrib-uglify"_ para o Grunt localmente dentro da pasta `node_modules` (ref.: [npm folders](https://npmjs.org/doc/folders.html)). Plugins devem ser instalados localmente para evitar conflitos de versões quando utilizados em múltiplos projetos.

Especificando `--save-dev` como opção, vai adicionar automaticamente este plugin á seção _"devDependency"_ no arquivo `package.json`. Este arquivo lista todas as dependências para Node no projeto.

Adicionando o plugin do Grunt, permitirá que outros desenvolvedores trabalhando no projeto simplesmente executem `npm install` para instalar localmente estas dependências necessárias.

## Carregando tarefas de plugin

Agora que o plugin está instalado, é hora de avisar ao Grunt sobre ele e deixá-lo carregar todas as tarefas definidas. Para fazer isso, adicione a seguinte linha ao seu `Gruntfile.js`:

`grunt.loadNpmTasks('grunt-contrib-uglify')`

Esta linha deve ser adicionada dentro do escopo da função de nível superior (não na seção initConfig) onde também `grunt.registerTask()` é chamado.

## Executando tarefas de plugin

Tarefas de plugins podem ser executadas como outras tarefas do grunt, até mesmo quando especificada na linha de comando:

`grunt uglify`

Ou registrando um novo atalho para esta tarefa, que é chamada e executada:

`grunt.registerTask("dist", ["uglify"])`

## Configurando plugins

A configuração do Plugin depende do plugin em específico, então verifique a documentação do plugin para mais informações. Em geral, a configuração está localizado na seção `initConfig` do Gruntfile.

**TODO**: Configuration Targets/options (Merge [Configuring tasks](Configuring tasks)?)
