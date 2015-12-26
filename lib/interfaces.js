'use strict'

var Element = require('./element')
var interfaceKey = Symbol()
var adapterKey = Symbol()

/**
 represents a collection of Interfaces
 */
class Interfaces {
  /**
  @param {Inteface} SubInterface class
  @param {Object} adapter
  */
  constructor (SubInterface, adapter) {
    this[interfaceKey] = SubInterface
    this[adapterKey] = adapter
  }

  /**
  @returns {Object}
  */
  get adapter () {
    return this[adapterKey]
  }

  /**
  promises to return the length of interfaces in the collection
  @return {Promise<int>}
  */
  get length () {
    return this[adapterKey].length(new Element())
  }

  /**
  returns an object that represents the nth inteface in collection
  @param {number}
  @return {Element}
  */
  at (nth) {
    var SubInterface = this[interfaceKey]
    return new SubInterface(this[adapterKey], nth)
  }

  /**
  returns an object that represents the first inteface in collection
  @return {Element}
  */
  get first () {
    return this.at(0)
  }

  /**
  returns an object that represents the last inteface in the collection
  @return {Element}
  */
  get last () {
    return this.at(-1)
  }
}

module.exports = Interfaces
