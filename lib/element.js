'use strict'

var adapterKey = Symbol()
var selectorKey = Symbol()
var indexKey = Symbol()

class Element {
  constructor(selector, adapter, index) {
    this[selectorKey] = selector
    this[adapterKey] = adapter
    this[indexKey] = index
    if(adapter) {
      adapter.methods.forEach((m) => {
        this[m] = function () {
          var args = Array.prototype.slice.call(arguments)
          return adapter[m].apply(adapter, [this].concat(args))
        }
      })
    }
  }

  get selector () {
    return this[selectorKey]
  }

  get index () {
    return this[indexKey]
  }
}

module.exports = Element
