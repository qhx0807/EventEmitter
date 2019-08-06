# EventEmitter

JavaScript发布订阅模式 EventEmitter

#### Usage

```js
const EventEmitter = require('EventEmitter')
const ee = new EventEmitter()

ee.on(type, foo)
ee.once(type, foo)
ee.off(type, foo)
ee.removeAll()
```