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
  get context Function that will take a selector and return a selector within
  the context of the adapter
  @return {Function}
  */
  get context () {
    return this[contextKey]
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
        return es.value[es.value.length - 1]
      } else {
        return es.value[e.index]
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
        .then(e => e, () => false)
    }, 3000)
  }

  /**
  @param {Element} e
  @return {Object}
  */
  contextulise (e) {
    return new WebDriverIOAdapter(this[driverKey], e)
  }
}

module.exports = WebDriverIOAdapter
