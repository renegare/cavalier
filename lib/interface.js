'use strict'

var adapterKey = Symbol()
var Element = require('./element')
var Elements = require('./elements')

/**
represents a whole or sub interface of "elements :?"
*/
class Interface {
  /**
  @param {Object} adapter
  */
  constructor (adapter) {
    this[adapterKey] = adapter
  }

  /**
  @returns {Object}
  */
  get adapter () {
    return this[adapterKey]
  }

  /**
  @param {string} name
  @param {string} selector
  @returns {Element}
  */
  element (name, selector) {
    Object.defineProperty(this, name, {
      get: () => {
        return new Element(selector, this.adapter)
      },
      enumerable: true
    })
  }

  /**
  @param {string} name
  @param {string} selector
  @returns {Element[]}
  */
  elements (name, selector) {
    Object.defineProperty(this, name, {
      get: () => {
        return new Elements(selector, this.adapter)
      },
      enumerable: true
    })
  }

  /**
  @param {Interface} SubInterface
  @param {string} name
  @param {string} selector
  @returns {Interface}
  */
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
