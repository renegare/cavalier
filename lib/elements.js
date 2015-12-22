'use strict'

var Promise = require('bluebird')
var adapterKey = Symbol()
var selectorKey = Symbol()

class Elements {
  constructor(adapter, selector) {
    this[adapterKey] = adapter
    this[selectorKey] = selector
  }

  get length () {
    return Promise.resolve(this[adapterKey].findAll(this[selectorKey]))
      .then(e => {
        return e.length
      })
  }
}

module.exports = Elements
