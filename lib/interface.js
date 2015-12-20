'use strict'

var Promise = require('bluebird')
var adapterKey = Symbol()

/**

*/
class Interface {
  constructor (adapter) {
    this[adapterKey] = adapter
  }

  get adapter () {
    return this[adapterKey]
  }

  get driver () {
    return this.adapter.driver
  }

  element (name) {
    var args = Array.prototype.slice.call(arguments, 1)
    Object.defineProperty(this, name, {
      get: () => {
        return this[adapterKey].find.apply(this[adapterKey], args)
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

  elements (name) {
    var args = Array.prototype.slice.call(arguments, 1)
    Object.defineProperty(this, name, {
      get: () => {
        return this[adapterKey].findAll.apply(this[adapterKey], args)
      },
      enumerable: true
    })
  }
}

module.exports = Interface
