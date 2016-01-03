'use strict'

var faker = require('faker')
var debug = require('debug')('cavalier:example:adapter')

var WebdriverIOAdapter = require('../../lib/adapter/webdriverio')

class Adapter extends WebdriverIOAdapter {
  findOne (e) {
    debug('findOne', e.selector)
    var selector = '{' + e.selector.join('}{') + '}'
    return this.findAll(e)
      .then(e => {
        if (e.length < 1) {
          throw new Error('No element found matching your selection: ', selector)
        }
        return e[0]
      })
  }
  waitTillVisible (e, timeout) {
    debug('waitTillVisible', e.selector)
    return this.findOne(e)
      .then(e => {
        return this.driver.waitUntil(() => {
          return this.driver.elementIdDisplayed(e.ELEMENT)
            .then(e => e.value)
        }, timeout || 3000)
      })
  }

  fill (e, value) {
    debug('fill', e.selector)
    return this.findOne(e)
      .then(e => {
        return this.driver.elementIdValue(e.ELEMENT, value || faker.lorem.sentence())
      })
  }

  click (e) {
    debug('click', e.selector)
    return this.findOne(e)
      .then(e => {
        return this.driver.elementIdClick(e.ELEMENT)
      })
  }

  text (e) {
    debug('text', e.selector)
    return this.findOne(e)
      .then(e => {
        return this.driver.elementIdText(e.ELEMENT)
          .then(r => r.value)
      })
  }
}

module.exports = Adapter
