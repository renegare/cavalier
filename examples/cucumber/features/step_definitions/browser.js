var expect = require('chai').expect
var HomePage = require('../../page/home')
var Promise = require('bluebird')

module.exports = function () {
  this.Given(/^I visit the (.+)$/, function (page) {
    return this.browser.visit(page)
  })

  this.Then(/^I should see the home page$/, Promise.coroutine(function* () {
    var p = yield this.browser.page
    expect(p.constructor).to.eql(HomePage)
    yield p.set_search_box('mudi was here')
  }))
}
