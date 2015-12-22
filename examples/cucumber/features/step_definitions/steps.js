var expect = require('chai').expect
var HomePage = require('../../page/home')
var co = require('bluebird').coroutine

module.exports = function () {
  this.Given(/^I visit the (.+)$/, function (page) {
    return this.adapter.driver.url(page)
  })

  this.Then(/^I should see the home page$/, co(function* () {
    var p = new HomePage(this.adapter)
    expect(yield p.visible).to.be.true
  }))
}
