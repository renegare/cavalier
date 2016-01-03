'use strict'

var contextKey = Symbol()

/**
 abstract object. Should be extended when used and not
 directly used as it is missing "length" method
 */
class Adapter {
  /**
  @param {Element} e
  */
  constructor (e) {
    this[contextKey] = e ? e.selector : []
  }

  /**
  get an "absolute" selector, where
  the context of the adapter "prefixed" on to the elements selector
  @param {Object} [Element]
  @return {Array<string|number>}
  */
  context (e) {
    var selector = this[contextKey]
    if (e) {
      selector = selector.concat(e.selector)
      if (typeof e.index === 'number') {
        selector = selector.concat([e.index])
      }
    }
    return selector
  }

  /**
  @param {Element} e
  @return {Object}
  */
  contextulise (e) {
    var Adapter = this.constructor
    return new Adapter(e)
  }
}

module.exports = Adapter
