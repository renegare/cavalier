'use strict'

var wdio = require('webdriverio')
var co = require('bluebird').coroutine
var abs = Math.abs
var optsKey = Symbol()
var driverKey = Symbol()
var contextKey = Symbol()

class WebDriverIOAdapter {
  /**
  @param {Object} opts
  @param {string} [context]
  */
  constructor (opts, context) {
    if (context) {
      this[driverKey] = opts
      this[contextKey] = context.selector + ' '
    } else {
      this[optsKey] = opts
    }
  }

  /**
  @return {Object}
  */
  get driver () {
    if (!this[driverKey]) {
      this[driverKey] = wdio.remote(this[optsKey]).init()
    }

    return this[driverKey]
  }

  /**
  return an "absolute" selector, where
  the context selector of the adapter "prefixed"
  @param {string} [selector]
  @param {number} [index]
  @return {string}
  */
  context (selector, index) {
    selector = ((this[contextKey] || '') + (selector || '')).trim()
    if(index < 0) {
      selector = selector + ':nth-last-child(' + abs(index) + ')'
    } else if (index > -1) {
      selector = selector + ':nth-child(' + (index + 1) + ')'
    }

    return selector
  }

  /**
  @param {Element} e
  @return {Object}
  */
  contextulise (e) {
    var Adapter = this.constructor
    return new Adapter(this[driverKey], e)
  }

  /**
  @param {Element} e
  @return {Promise<number>}
  */
  length (e) {
    return this.driver.elements(e.selector).then(e => e.value.length)
  }
}

module.exports = WebDriverIOAdapter
