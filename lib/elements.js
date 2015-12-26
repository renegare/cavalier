'use strict'

var Element = require('./element')
var adapterKey = Symbol()
var selectorKey = Symbol()

/**
 represents a collection of Elements
 */
class Elements {
  constructor (selector, adapter) {
    this[selectorKey] = selector
    this[adapterKey] = adapter
  }

  /**
   promises to return the length of elements in the collection
   @return {Promise<int>}
   */
  get length () {
    return this[adapterKey].length(new Element(this[selectorKey], this[adapterKey]))
  }

  /**
   returns an object that represents the nth element in collection
   @param {number}
   @return {Element}
   */
  at (nth) {
    return new Element(this[selectorKey], this[adapterKey], nth)
  }

  /**
   returns an object that represents the first element in collection
   @return {Element}
   */
  get first () {
    return this.at(0)
  }

  /**
   returns an object that represents the last element in the collection
   @return {Element}
   */
  get last () {
    return this.at(-1)
  }
}

module.exports = Elements
