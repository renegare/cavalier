var expect = require('chai').expect
var HomePage = require('../../page/home')
var co = require('bluebird').coroutine

module.exports = function () {
  this.Given(/^I visit the (.+)$/, function (page) {
    return this.adapter.driver.url(page)
  })

  this.Then(/^I should see the home page$/, co(function * () {
    var p = new HomePage(this.adapter)
    expect(yield p.visible).to.be.true
    this.page = p
  }))

  this.When(/^I fill in the field$/, function () {
    return this.page.field.fill()
  });

  this.When(/^I click submit on the page$/, function () {
    return this.page.submit.click()
  });

  this.Then(/^I should see "([^"]*)"$/, function(text) {
    return co(function * () {
      var src = yield this.adapter.driver.source()
      expect(src.value).to.contain(text)
    }.bind(this))()
  })
  this.Then(/^there should be four list items$/, co(function * () {
    var length = yield this.page.listItems.length
    expect(length).to.equal(4)
  }))

  this.Then(/^the last item should display the text "([^"]*)"$/, function (text) {
    return this.page.listItems.last.text()
      .then((txt) => {
        expect(txt).to.equal(text)
      })
  })
}
