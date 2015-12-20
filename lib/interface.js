'use strict'

var Promise = require('bluebird')
var adapterKey = Symbol()
var adapterMethodsKey = Symbol()
var Elements = require('./elements')
/**

*/
class Interface {
  constructor (adapter) {
    this[adapterKey] = adapter
    this[adapterMethodsKey] = Object.getOwnPropertyNames(Object.getPrototypeOf(this[adapterKey]))
        .filter(m => m !== 'constructor' && typeof this[adapterKey][m] === 'function')
  }

  get adapter () {
    return this[adapterKey]
  }

  get driver () {
    return this.adapter.driver
  }

  element (name) {
    var selector = Array.prototype.slice.call(arguments, 1)
    var methods
    Object.defineProperty(this, name, {
      get: () => {
        if (!methods) {
          methods = this[adapterMethodsKey].reduce((methods, m) => {
            methods[m] = function () {
              var args = Array.prototype.slice.call(arguments)
              return this[adapterKey][m].apply(this[adapterKey], selector.concat(args))
            }.bind(this)
            return methods
          }, {})
        }
        return methods
      },
      enumerable: true
    })
  }

  section (SubInterface, name) {
    var args = Array.prototype.slice.call(arguments, 2)
    var adapter = this[adapterKey].contextulise.apply(this[adapterKey], args)
    var obj = new SubInterface(adapter)

    Object.defineProperty(this, name, {
      get: () => {
        return Promise.resolve(obj)
      },
      enumerable: true
    })
  }

  elements (name, selector) {
    Object.defineProperty(this, name, {
      get: () => {
        return new Elements(this.adapter, selector)
      },
      enumerable: true
    })
  }
}

module.exports = Interface
