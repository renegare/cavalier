'use strict'

var wdio = require('webdriverio')
var resolve = require('bluebird').resolve
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
  @return {string[]}
  */
  get methods () {
    return ['find', 'findAll']
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
      return (typeof e.index === 'function' ? e.index() : resolve(e.index || 0))
        .then(i => {
          return context.findAll(e)
            .then(es => es[i])
        })
    })(this)
  }

  /**
  @param {Element} e
  @return {Promise<Object>}
  */
  findAll (e) {
    return this.driver.waitUntil(() => {
      return this.driver.elements(this[contextKey](e.selector))
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
