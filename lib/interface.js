'use strict'

var adapterKey = Symbol()
var Element = require('./element')
var Elements = require('./elements')

/**
represents a whole or sub interface of "elements :?"
*/
class Interface {
  constructor (adapter) {
    this[adapterKey] = adapter
  }

  /**
  @returns {Object}
  */
  get adapter () {
    return this[adapterKey]
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
    var adapter = this[adapterKey].contextulise(new Element(selector))
    var obj

    Object.defineProperty(this, name, {
      get: () => {
        if (!obj) {
          obj = new SubInterface(adapter)
        }
        return obj
      },
      enumerable: true
    })
  }
}

module.exports = Interface
