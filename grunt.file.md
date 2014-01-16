Existem muitos métodos previstos para a leitura e gravação de arquivos, percorrendo o sistema de arquivos e encontrando arquivos pela ocorrência de padrões de englobamento. Muitos destes métodos são wrappers sobre as funcionalidades de arquivo do Node.js , mas com um tratamento de erro adicional, registro e codificação de caracteres de normalização.

_Nota: todo endereço de arquivo é relativo ao `Gruntfile`, a não ser que o diretório de trabalho atual (CWD) seja mudado com `grunt.file.setBase` ou a opção de linha de comando `--base`._

## A codificação de caracteres (encoding)

### grunt.file.defaultEncoding
Defina esta propriedade para mudar o padrão de caracteres (encoding) utilizados em todos os métodos do `grunt.file`. O padrão é `'utf8'`. Se você tiver que alterar este valor, é recomendado que faça isso o mais cedo possível dentro do seu Gruntfile.

```js
grunt.file.defaultEncoding = 'utf8';
```


### grunt.file.preserveBOM
*Adicionado na 0.4.2*

Se é para preservar a Marca de ordem do Byte (Byte Order Mark - BOM) no `file.read` ao invés de tira-la.

```js
grunt.file.preserveBOM = false;
```

## Leitura e escrita

### grunt.file.read
Lê e retorna o conteúdo do arquivo. Retorna uma string, a não ser que `options.encoding` seja `null`, neste caso, será retornado um [Buffer](http://nodejs.org/docs/latest/api/buffer.html).

```js
grunt.file.read(filepath [, options])
```

O objeto `options` possui as possíveis propriedades:

```js
var options = {
  // Se uma codificação de caracteres não estiver especificada, padrão para  grunt.file.defaultEncoding.
  // Se especificada como null, devolve um Buffer não descodificado  em vez de uma string.
  encoding: encodingName
};
```

### grunt.file.readJSON
Lê o conteúdo do arquivo, analisando os dados como JSON e retornando o resultado. Veja `grunt.file.read` para a lista de opções suportadas.

```js
grunt.file.readJSON(filepath [, options])
```

### grunt.file.readYAML
Lê o conteúdo do arquivo, analisando os dados como YAML e retornando o resultado. Veja `grunt.file.read` para a lista de opções suportadas.

```js
grunt.file.readYAML(filepath [, options])
```

### grunt.file.write
Escreve o conteúdo especificado no arquivo, criando diretórios intermediarios se necessário. Strings serão codificadas usando a codificação de caracteres especificada, [Buffers](http://nodejs.org/docs/latest/api/buffer.html) serão escritos no disco como especificados.

_Se a opção de linha de comando `--no-write` for especificada, o arquivo não será realmente escrito._

```js
grunt.file.write(filepath, contents [, options])
```

O objeto `options` possui as possíveis propriedades:

```js
var options = {
  // Se uma codificação de caracteres não estiver especificada, padrão para  grunt.file.defaultEncoding.
  // se `contents` for um Buffer, a codificação é ignorada.
  encoding: encodingName
};
```

### grunt.file.copy
Copia o arquivo de origem para o caminho de destino, criando diretórios intermediarios se necessário.

_Se a opção de linha de comando `--no-write` for especificada, o arquivo não será realmente escrito._

```js
grunt.file.copy(srcpath, destpath [, options])
```

O objeto `options` possui as possíveis propriedades:

```js
var options = {
  // Se uma codificação de caracteres não estiver especificada, padrão para grunt.file.defaultEncoding.
  // Se especificada como null, a função `process` receberá um Buffer em vez de uma String.
  encoding: encodingName,
  // O conteúdo do arquivo de origem e o caminho de destino são passados para esta função,
  // cujo valor de retorno vai ser utilizado como o destino para o conteúdo do arquivo.
  // Se esta função retornar `false`, a copia do arquivo será abortada.
  process: processFunction,
  // Este padrão de englobamento opcional será comparado novamente com o caminho de destino do arquivo
  // (não o nome do arquivo) usando grunt.file.isMatch. Se nenhum padrão de
  //  englobamento corresponder, o arquivo não será processado através da função `process`.
  // Se `true` for especificado,o processamento será impedido.
  noProcess: globbingPatterns
};
```

### grunt.file.delete
Exclui o caminho de arquivo especificado. Irá apagar arquivos e pastas recursivamente.

_Não irá deletar o diretório de trabalho atual ou arquivos fora do diretório de trabalho atual, a menos que a opção de linha de comando `--force` seja especificada._

_Se a opção de linha de comando `--no-write` for especificada, o caminho de arquivo não será realmente deletado._

```js
grunt.file.delete(filepath [, options])
```

O objeto `options` possui uma possível propriedade:

```js
var options = {
  // Habilita a exclusão fora do diretório de trabalho atual. Esta opção pode
  // ser sobreposta pela opção de linha de comando --force.
  force: true
};
```

## Diretórios

### grunt.file.mkdir
Funciona como o comando `mkdir -p`. Cria um diretório junto com qualquer diretório intermediario. Se `mode` não for especificado, o padrão é `0777 & (~process.umask())`.

_Se a opção de linha de comando `--no-write` for especificada, o diretório não será realmente criado._

```js
grunt.file.mkdir(dirpath [, mode])
```

### grunt.file.recurse
Recursivamente no diretório, executa `callback` para cada arquivo.

```js
grunt.file.recurse(rootdir, callback)
```

A função de callback recebe os seguintes argumentos:

```js
function callback(abspath, rootdir, subdir, filename) {
  // O caminho absoluto do arquivo atual, que nada mais é do que 
  // os argumentos rootdir + subdir + filename, juntos.
  abspath
  // O diretório raiz, como originalmente especificado.
  rootdir
  // O diretório do arquivo atual, relativo a rootdir.
  subdir
  // O nome do arquivo atual, sem nenhuma parte do diretório.
  filename
}
```

## Padrões de Englobamento
Muitas vezes, é impraticável especificar todos os caminhos de arquivos individualmente, deste modo o Grunt suporta a expansão de nome de arquivo (também conhecido como englobamento) através da biblioteca embutida [node-glob](https://github.com/isaacs/node-glob).

Veja a seção "Padrões de Englobamento" do guia [[Configurando tarefas]] para mais exemplos.


### grunt.file.expand
Retorna uma vetor único de todos os caminhos de arquivos ou diretórios que correspondem ao padrão (ou padrões) de englobamento fornecido. Este método aceita tanto padrões de englobamento separados por vírgula ou um vetor de padrões de englobamento. Caminhos correspondendo a padrões que começam com `!` serão excluídos do vetor de retorno. Padrões são processados em ordem, então a ordem de inclusão e exclusão é significante.

```js
grunt.file.expand([options, ] patterns)
```

O caminho do arquivo é relativo ao `Gruntfile` a menos que o diretório de trabalho atual seja mudado com `grunt.file.setBase` ou a opção de linha de comando `--base`.

O objeto `options` suporta todas as opções da [biblioteca minimatch](https://github.com/isaacs/minimatch), entre outras. Por exemplo:

* `filter` ou um [nome de método fs.Stats](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) válido ou uma função que é correspondete ao caminho de arquivo `src` e retorna `true` ou `false`.
* `nonull` mantem o padrão `src` mesmo se ele falhar em combinar os arquivos. Combinado com a flag `--verbose` do grunt, esta opção pode ajudar na depuração de problemas relacionados a caminho de arquivo.
* Padrões `matchBase` sem barras serão comparados apenas à parte do nome. Por exemplo, `*.js` funciona como `**/*.js`.
* Padrões `cwd` serão comparados em relação a este caminho, e todos os caminhos de arquivos retornados também serão em relação a esse caminho.

### grunt.file.expandMapping
Retorna um vetor de objetos mapeados de arquivos src-dest. Para cada arquivo de origem combinado por um padrão especificado, une-se aquele arquivo ao caminho `dest` especificado. Este caminho de arquivo pode ser achatado ou renomeado, dependendo das opções especificadas. Veja a documentação do método `grunt.file.expand` para uma explicação de como os argumentos `patterns` e `options` podem ser especificados.

```js
grunt.file.expandMapping(patterns, dest [, options])
```

_Observe que, embora este método possa ser usado para de forma programática gerar um vetor 'files' para uma multi-tarefa, a sintaxe declarativa para se fazer isso, descrita na seção "Criando os arquivos de objeto dinamicamente" do guia [[Configurando tarefas]] é recomendada._

Além das opções que o método `grunt.file.expand` suporta, o objeto `options` também suporta estas propriedades:

```js
var options = {
  // O diretório a partir do qual os padrões são comparados. Qualquer string
  // especificada como cwd é efetivamente retirado do início de todos os caminhos
  // correspondentes.
  cwd: String,
  // Remove o componente do caminho de todos os arquivos src comparados.
  // O caminho do arquivo src continuará ligado ao dest especificado.
  flatten: Boolean,
  // Remove qualquer coisa após (incluindo) o primeiro "." no caminho de destino,
  // em seguida, acrescenta este valor.
  ext: String,
  // Se for especificado, esta função será responsável por retornar o caminho do
  // arquivo dest final. Por padrão, ele une dest e matchedSrcPath, desta forma:
  rename: function(dest, matchedSrcPath, options) {
    return path.join(dest, matchedSrcPath);
  }
};
```

### grunt.file.match
Compara a um ou mais padrões de englobamento a um ou mais caminhos de arquivo. Retorna um vetor único de todos os caminhos de arquivos que correspondem a qualquer um dos padrões de englobamento especificados. Tanto o argumento `patterns` e `filepaths` podem ser uma string simples ou um vetor de strings. Caminhos correspondendo a padrões que começam com  `!` serão excluidos do vetor de retorno. Padrões são processados em ordem, então a ordem de inclusão e exclusão é significante.

```js
grunt.file.match([options, ] patterns, filepaths)
```

O objeto `options` suporta todas as opções da [biblioteca minimatch](https://github.com/isaacs/minimatch), entre outras. Por exemplo, se `options.matchBase` for verdadeiro, padrões sem barras corresponderão ao nome base do caminho mesmo que contenha barras, Ex.: o padrão `*.js` corresponderá ao caminho de arquivo `path/to/file.js`.

### grunt.file.isMatch
Este método contem a mesma assinatura de arquivo e lógica do método `grunt.file.match`, mas simplesmente retorna `true` se corresponder a algum arquivo, caso contrário, retorna `false`.

## Tipos de arquivo

### grunt.file.exists
O caminho fornecido existe? Retorna um boolean.

Como o método [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) do Node.js, este método juntará todos os argumentos e normalizará o caminho resultante.

```js
grunt.file.exists(path1 [, path2 [, ...]])
```

### grunt.file.isLink
O caminho fornecido é uma referência simbólica? Retorna um boolean.

Como o método [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) do Node.js, este método juntará todos os argumentos e normalizará o caminho resultante.

```js
grunt.file.isLink(path1 [, path2 [, ...]])
```

Retorna falso se o caminho não existir.

### grunt.file.isDir
O caminho fornecido é um diretório? Retorna um boolean.

Como o método [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) do Node.js, este método juntará todos os argumentos e normalizará o caminho resultante.

```js
grunt.file.isDir(path1 [, path2 [, ...]])
```

Retorna falso se o caminho não existir.

### grunt.file.isFile
O caminho fornecido é um arquivo? Retorna um boolean.

Como o método [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) do Node.js, este método juntará todos os argumentos e normalizará o caminho resultante.

```js
grunt.file.isFile(path1 [, path2 [, ...]])
```

Retorna falso se o caminho não existir.

## Paths

### grunt.file.isPathAbsolute
O caminho fornecido é um caminho absoluto de arquivo? Retorna um boolean.

Como o método [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) do Node.js, este método juntará todos os argumentos e normalizará o caminho resultante.

```js
grunt.file.isPathAbsolute(path1 [, path2 [, ...]])
```

### grunt.file.arePathsEquivalent
Todos os caminhos especificados referem-se para o mesmo caminho? Retorna um boolean.

```js
grunt.file.arePathsEquivalent(path1 [, path2 [, ...]])
```

### grunt.file.doesPathContain
Todo caminho (ou caminhos) descendente está no interior do caminho ancestral especificado? Retorna um boolean.

_Nota: Não verifica se o caminho atual existe._

```js
grunt.file.doesPathContain(ancestorPath, descendantPath1 [, descendantPath2 [, ...]])
```

### grunt.file.isPathCwd
O caminho fornecido é um CWD? Retorna um boolean.

Como o método [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) do Node.js, este método juntará todos os argumentos e normalizará o caminho resultante.

```js
grunt.file.isPathCwd(path1 [, path2 [, ...]])
```

### grunt.file.isPathInCwd
O caminho fornecido é um arquivo dentro do CWD? Note: CWD não está _dentro_ do CWD. Retorna um boolean.

Como o método [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) do Node.js, este método juntará todos os argumentos e normalizará o caminho resultante.

```js
grunt.file.isPathInCwd(path1 [, path2 [, ...]])
```

### grunt.file.setBase
Muda o diretório de trabalho atual do grunt (CWD). Por padrão, todos os caminhos de arquivos são relativos ao `Gruntfile`. Isto funciona como a opção de linha de comando `--base`.

```js
grunt.file.setBase(path1 [, path2 [, ...]])
```

Como o método [path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2) do Node.js, 
este método juntará todos os argumentos e normalizará o caminho resultante.

## Bibliotecas externas
*Obsoleto*

__Todas as bibliotecas externas que estão listadas abaixo estão obsoletas.__

Por favor, use o __npm__ para gerenciar estas bibliotecas externas nas dependências do seu projeto.

Por exemplo, se você quiser usar a biblioteca [Lo-Dash](https://npmjs.org/package/lodash), instale-a primeiro `npm install lodash`, 
então use no seu `Gruntfile`: `var _ = require('lodash');`

### grunt.file.glob
*Obsoleto*

[glob](https://github.com/isaacs/node-glob) - Utilitário para englobamento de arquivo.

### grunt.file.minimatch
*Obsoleto*

[minimatch](https://github.com/isaacs/minimatch) - Utilitário para combinar padrões de Arquivos.

### grunt.file.findup
*Obsoleto*

[findup-sync](https://github.com/cowboy/node-findup-sync) - Procura ascendentes para a combinação de padrões de arquivos.
