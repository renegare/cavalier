'use strict'

var Interface = require('./interface')
var nameKey = Symbol()

class NamedInterface extends Interface {
  constructor (name, adapter) {
    super(adapter)
    this[nameKey] = name
  }

  get name() {
    return this[nameKey]
  }
}

module.exports = NamedInterface
