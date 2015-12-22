'use strict'

var Promise = require('bluebird')
var Element = require('./element')
var adapterKey = Symbol()
var selectorKey = Symbol()

/**
 * represents a collection of Elements
 */
class Elements {
  constructor(adapter, selector) {
    this[adapterKey] = adapter
    this[selectorKey] = selector
  }

  /**
   *
   * promises to return the length of elements in the collection
   * @return {Promise<int>}
   */
  get length () {
    return Promise.resolve(this[adapterKey].findAll(this[selectorKey]))
      .then(e => {
        return e.length
      })
  }

  /**
   * returns an element representing the nth element in collection
   * @return {Element}
   */
  at (nth) {
    return new Element(this[adapterKey], this[selectorKey], nth)
  }

  /**
   * returns and element representing the first element in collection
   * @return {Element}
   */
  get first () {
    return this.at(0)
  }

  /**
   *
   * promises to return an element representing the last element in collection
   * @return {Promise<Element>}
   */
  get last () {
    return this.length
      .then(l => {
        return this.at(l - 1)
      })
  }
}

module.exports = Elements
