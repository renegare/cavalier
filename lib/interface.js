'use strict'

var Element = require('./element')
var Elements = require('./elements')
var Interfaces = require('./interfaces')

var adapterKey = Symbol()
var indexKey = Symbol()

/**
represents a whole or sub interface of "elements :?"
*/
class Interface {
  /**
  @param {Object} adapter
  @param {number} [index]
  */
  constructor (adapter, index) {
    this[adapterKey] = adapter
    this[indexKey] = index
  }

  /**
  @returns {int}
  */
  get index () {
    return this[indexKey]
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
    var adapter = this.adapter.contextulise(new Element(selector, this.adapter))
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

  /**
  @param {Interface} SubInterface
  @param {string} name
  @param {string} selector
  @returns {Interfaces}
  */
  sections (SubInterface, name, selector) {
    var adapter = this.adapter.contextulise(new Element(selector, this.adapter))
    var obj

    Object.defineProperty(this, name, {
      get: () => {
        if (!obj) {
          obj = new Interfaces(SubInterface, adapter)
        }
        return obj
      },
      enumerable: true
    })
  }
}

module.exports = Interface
