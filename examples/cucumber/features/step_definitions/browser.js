var expect = require('chai').expect
var HomePage = require('../../page/home')

module.exports = function () {
  this.Given(/^I visit the (.+)$/, function (page) {
    return this.browser.visit(page)
  })

  this.Then(/^I should see the home page$/, function () {
    var browser = this.browser
    return browser.page.then(p => {
      expect(p.constructor).to.eql(HomePage)
      return p.set_search_box('mudi was here')
    })
  })
}
