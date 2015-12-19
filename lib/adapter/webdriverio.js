'use strict'

var wdio = require('webdriverio')

var optsKey = Symbol()
var driverKey = Symbol()
var contextKey = Symbol()

class WebDriverIOAdapter {

  constructor (opts, context) {
    if (context) {
      this[driverKey] = opts
      this[contextKey] = selector => context + ' ' + selector
    } else {
      this[optsKey] = opts
      this[contextKey] = selector => selector
    }
  }

  get driver () {
    if (!this[driverKey]) {
      this[driverKey] = wdio.remote(this[optsKey]).init()
    }

    return this[driverKey]
  }

  open (url) {
    return this.driver.url(url)
  }

  get url () {
    return this.driver.getUrl()
  }

  find (selector) {
    return this.driver.waitUntil(() => {
      return this.driver.element(this[contextKey](selector))
        .then(e => e, () => false)
    }, 3000)
  }

  findAll (selector) {
    return this.driver.waitUntil(() => {
      return this.driver.elements(this[contextKey](selector))
        .then(e => e, () => false)
    }, 3000)
  }

  contextulise (selector) {
    return new WebDriverIOAdapter(this[driverKey], selector)
  }

  exit () {
    return this.driver.exit()
  }
}

module.exports = WebDriverIOAdapter
