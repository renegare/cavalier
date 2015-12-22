'use strict'

var wdio = require('webdriverio')

var optsKey = Symbol()
var driverKey = Symbol()
var contextKey = Symbol()

class WebDriverIOAdapter {
  constructor (opts, context) {
    if (context) {
      this[driverKey] = opts
      this[contextKey] = selector => context.selector + ' ' + selector
    } else {
      this[optsKey] = opts
      this[contextKey] = selector => selector
    }
  }

  get methods () {
    return ['find', 'findAll']
  }

  get driver () {
    if (!this[driverKey]) {
      this[driverKey] = wdio.remote(this[optsKey]).init()
    }

    return this[driverKey]
  }

  find (e) {
    return this.driver.waitUntil(() => {
      return this.driver.element(this[contextKey](e.selector))
        .then(e => e, () => false)
    }, 3000)
  }

  findAll (e) {
    return this.driver.waitUntil(() => {
      return this.driver.elements(this[contextKey](e.selector))
        .then(e => e, () => false)
    }, 3000)
  }

  contextulise (e) {
    return new WebDriverIOAdapter(this[driverKey], e)
  }
}

module.exports = WebDriverIOAdapter
