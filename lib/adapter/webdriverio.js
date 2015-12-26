'use strict'

var wdio = require('webdriverio')
var co = require('bluebird').coroutine

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
      this[contextKey] = selector => context.selector + ' ' + selector
    } else {
      this[optsKey] = opts
      this[contextKey] = selector => selector
    }
  }

  /**
  return an "absolute" selector, where
  the context selector of the adapter "prefixed"
  @param {string} selector
  @return {string}
  */
  context (selector) {
    return this[contextKey](selector)
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
  @param {Element} e
  @return {Promise<Object>}
  */
  find (e) {
    return co(function * (context) {
      var es = yield context.findAll(e)
      if (e.index === -1) {
        return es[es.length - 1]
      } else {
        return es[e.index]
      }
    })(this)
  }

  /**
  @param {Element} e
  @return {Promise<Object>}
  */
  findAll (e) {
    return this.driver.waitUntil(() => {
      return this.driver.elements(this.context(e.selector))
        .then(e => e.value)
    }, 3000)
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
    return this.findAll(e).then(e => e.length)
  }
}

module.exports = WebDriverIOAdapter
