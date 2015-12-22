'use strict'

var adapterKey = Symbol()
var selectorKey = Symbol()
var adapterMethodsKey = Symbol()

class Element {
  constructor(adapter, selector) {
    this[adapterKey] = adapter
    this[selectorKey] = selector
    Object.getOwnPropertyNames(Object.getPrototypeOf(adapter))
        .filter(m => m !== 'constructor' && typeof adapter[m] === 'function')
        .forEach((m) => {
          this[m] = function () {
            var args = Array.prototype.slice.call(arguments)
            return adapter[m].apply(adapter, [selector].concat(args))
          }
        })
  }
}

module.exports = Element
