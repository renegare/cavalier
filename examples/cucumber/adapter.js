'use strict'

var WebdriverIOAdapter = require('../../lib/adapter/webdriverio')

class Adapter extends WebdriverIOAdapter {
  get methods () {
    return super.methods.concat(['visible'])
  }

  visible (e) {
    return this.driver.waitForVisible(e.selector, 3000)
  }
}

module.exports = Adapter
