/**
 * EventEmitter
 */

class EventEmitter {
  constructor () {
    this.events = Object.create(null)
  }

  on (type, callback) {
    this.events[type] = this.events[type] || []
    if (!Array.isArray(callback)) callback = [callback]
    for (let i = 0; i < callback.length; i++) {
      let fn = callback[i]
      if (typeof fn !== 'function') throw new Error('callback must be a function')
      this.events[type].push(fn)
    }
    return this
  }

  once (type, fn) {
    if (typeof fn !== 'function') throw new Error(`'once()' callback must be a function`)
    function on (...args) {
      this.off(type, on)
      fn.call(this, ...args)
    }
    on.fn = fn
    this.on(type, on)
    return this
  }

  off (type, fn) {
    if (this.events[type]) {
      this.events[type].splice(this.events[type].indexOf(fn), 1)
      if (this.events[type].length === 0) {
        delete this.events[type]
      }
    }
    return this
  }

  emit (type, ...args) {
    let arr = this.events[type] || []
    for (let i = 0; i < arr.length; i++) {
      arr[i].call(this, ...args)
    }
    return this
  }

  removeAll () {
    this.events = Object.create(null)
  }
}

if (typeof define === 'function' && define.amd) {
  define (function () { return EventEmitter })
} else if (typeof module === 'object' && module.exports) {
  module.exports = EventEmitter
} else {
  exports.EventEmitter = EventEmitter
}
