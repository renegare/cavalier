'use strict'

var co = require('bluebird').coroutine
var expect = require('chai').expect
var faker = require('faker')

var WebdriverIOAdapter = require('../../lib/adapter/webdriverio')

class Adapter extends WebdriverIOAdapter {
  visible (e) {
    return this.driver.waitForVisible(e.selector, 3000)
  }

  fill (e) {
    this.driver.setValue(e.selector, faker.lorem.sentence())
  }

  click (e) {
    return this.driver.click(e.selector)
  }

  text (e) {
    return this.driver.getText(e.selector)
  }
}

module.exports = Adapter
