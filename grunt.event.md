Mesmo que apenas os métodos mais relevantes estejam listados nesta página, a [API EventEmitter2][ee2] completa está disponível no objeto `grunt.event`. Os namespaces de eventos podem ser especificados com o separador `.` (ponto) se o  namespace genérico estiver habilitado.

*Note que o Grunt ainda não emite qualquer evento, mas ainda pode ser útil nas suas próprias tarefas.*

[ee2]: https://github.com/hij1nx/EventEmitter2

### grunt.event.on
Adiciona um listener ao final do array de listeners do evento especificado.

```js
grunt.event.on(event, listener)
```

### grunt.event.once
Adiciona um listener do tipo **uma vez** ao evento. O listener invoca apenas na primeira vez que o evento é disparado, após isto é removido.

```js
grunt.event.once(event, listener)
```

### grunt.event.many
Adiciona um listener que será executado **n vezes** ao evento antes de ser removido.

```js
grunt.event.many(event, timesToListen, listener)
```

### grunt.event.off
Remove um listener do array de listeners do evento especificado.

```js
grunt.event.off(event, listener)
```

### grunt.event.removeAllListeners
Remove todos os listeners, ou os do evento especificado.

```js
grunt.event.removeAllListeners([event])
```

### grunt.event.emit
Executa cada um dos listeners que podem ser ouvidos por um nome de evento específico na ordem dos argumentos listados.

```js
grunt.event.emit(event, [arg1], [arg2], [...])
```