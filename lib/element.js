'use strict'

var adapterKey = Symbol()
var selectorKey = Symbol()
var indexKey = Symbol()

class Element {
  constructor(adapter, selector, index) {
    this[adapterKey] = adapter
    this[selectorKey] = selector
    this[indexKey] = index
    adapter.methods.forEach((m) => {
      this[m] = function () {
        var args = Array.prototype.slice.call(arguments)
        return adapter[m].apply(adapter, [this].concat(args))
      }
    })
  }

  get selector () {
    return this[selectorKey]
  }

  get index () {
    return this[indexKey]
  }
}

module.exports = Element
