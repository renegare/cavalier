var expect = require('chai').expect
var HomePage = require('../../page/home')
var Promise = require('bluebird')

module.exports = function () {
  this.Given(/^I visit the (.+)$/, function (page) {
    return this.adapter.open(page)
  })

  this.Then(/^I should see the home page$/, Promise.coroutine(function* () {
    var p = new HomePage(this.adapter)
    expect(yield p.visible).to.be.true
  }))
}
