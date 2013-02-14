Each javascript file provides a unique namespace and can require any number of other namespaces:

```js
goog.provide('app');

goog.require('app.router');
goog.require('app.controller');
goog.require('app.view');
```