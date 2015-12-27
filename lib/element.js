'use strict'

var adapterKey = Symbol()
var selectorKey = Symbol()
var indexKey = Symbol()

function getFunctions (adapter) {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(adapter))
    .filter(m => typeof adapter[m] === 'function')
}

/**
 represents a single Element
 */
class Element {
  /**
  @param {string} [selector='']
  @param {Object} [adapter=undefined]
  @param {number} [index]
  */
  constructor (selector, adapter, index) {
    this[selectorKey] = selector || ''
    this[adapterKey] = adapter
    this[indexKey] = index
    if (adapter) {
      (adapter.methods || getFunctions(adapter))
        .filter(m => ['constructor', 'selector', 'index'].indexOf(m) === -1)
        .forEach((m) => {
          this[m] = function () {
            var args = Array.prototype.slice.call(arguments)
            return adapter[m].apply(adapter, [this].concat(args))
          }
        })
    }
  }

  /**
  @return {string}
  */
  get selector () {
    if (this[adapterKey]) {
      return this[adapterKey].context(this[selectorKey], this.index)
    } else {
      return this[selectorKey]
    }
  }

  /**
  @return {number}
  */
  get index () {
    return this[indexKey]
  }
}

module.exports = Element
