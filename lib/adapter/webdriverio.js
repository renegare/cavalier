'use strict'

var wdio = require('webdriverio')
var all = require('bluebird').all
var optsKey = Symbol()
var driverKey = Symbol()
var Adapter = require('../adapter')
var debug = require('debug')('cavalier:adapter')

class WebDriverIOAdapter extends Adapter {
  /**
  @param {WebdriverIOOptions|WebdriverIOClient} driver
  @param {Element} [e]
  */
  constructor (driver, e) {
    super(e)
    if (typeof driver.session === 'function') {
      this[driverKey] = driver
    } else {
      this[optsKey] = driver
    }
    debug('new instance', this.context())
  }

  /**
  @return {Object}
  */
  get driver () {
    debug('get driver')
    if (!this[driverKey]) {
      this[driverKey] = wdio.remote(this[optsKey]).init()
    }

    return this[driverKey]
  }

  /**
  @param {Element} e
  @return {Object}
  */
  contextulise (e) {
    debug('contextulise', e.selector)
    var Adapter = this.constructor
    return new Adapter(this.driver, e)
  }

  /**
  This is a recursive function
  @param {Element} e
  @param {Object} [context] webdriver element
  @return {Promise<Array>}
  */
  findAll (e, context) {
    debug('findAll:', e.selector, context)
    var selectors = e.selector
    selectors = Array.prototype.slice.call(selectors, 0)
    var selector = selectors.shift()
    var prom
    if (context) {
      prom = this.driver.elementIdElements(context.ELEMENT, selector)
    } else {
      prom = this.driver.elements(selector)
    }

    return prom.then(e => {
      e = e.value

      if (typeof selectors[0] === 'number') {
        var index = selectors.shift()
        if (index < 0) {
          index = e.length + index
        }
        e = e.slice(index, index + 1)
      }

      if (e.length > 0 && selectors.length > 0) {
        return all(e.map(e => this.findAll({selector: selectors}, e)))
          .then(e => {
            return Array.prototype.concat.apply([], e)
          })
      }
      return e
    })
  }

  /**
  @param {Element} e
  @return {Promise<number>}
  */
  length (e) {
    debug('length', e.selector)
    return this.findAll(e)
      .then(e => {
        return e.length
      })
  }
}

module.exports = WebDriverIOAdapter
