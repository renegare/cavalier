'use strict'

var co = require('bluebird').coroutine
var expect = require('chai').expect

var WebdriverIOAdapter = require('../../lib/adapter/webdriverio')

class Adapter extends WebdriverIOAdapter {
  visible (e) {
    return this.driver.waitForVisible(e.selector, 3000)
  }

  fill (e) {
    return co(function * (e) {
      var es = yield this.findAll(e)
      var e = es[es.index || 0]
      yield this.driver.elementIdValue(e.ELEMENT, 'mudi was here')
      var res = yield this.driver.elementIdAttribute(e.ELEMENT, 'value')
      expect(res.value).to.eql('mudi was here')
      return true
    }.bind(this))(e)
  }

  click (e) {
    return this.driver.click(e.selector)
  }
}

module.exports = Adapter
