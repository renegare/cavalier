'use strict'

var Promise = require('bluebird')
var adapterKey = Symbol()
var adapterMethodsKey = Symbol()
var Element = require('./element')
var Elements = require('./elements')

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

  element (name, selector) {
    Object.defineProperty(this, name, {
      get: () => {
        return new Element(selector, this.adapter)
      },
      enumerable: true
    })
  }

  elements (name, selector) {
    Object.defineProperty(this, name, {
      get: () => {
        return new Elements(selector, this.adapter)
      },
      enumerable: true
    })
  }

  section (SubInterface, name, selector) {
    var adapter = this[adapterKey].contextulise.apply(this[adapterKey], [new Element(selector)])
    var obj

    Object.defineProperty(this, name, {
      get: () => {
        if(!obj) {
          obj =  new SubInterface(adapter)
        }
        return obj
      },
      enumerable: true
    })
  }
}

module.exports = Interface
