'use strict'

var contextKey = Symbol()

class Adapter {
  /**
  @param {Element} e
  */
  constructor (e) {
    this[contextKey] = e ? e.selector : []
  }

  /**
  get an "absolute" selector, where
  the context selector of the adapter "prefixed"
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
