var test = require('ava')
var sequire = require('sequire')
var Browser = sequire('lib/browser')
var sinon = require('sinon')
var Promise = require('bluebird')

test.beforeEach('setup browser', t => {
  var driverStub = Symbol()

  var getDriverStub = sinon.stub()
  getDriverStub.returns(driverStub)

  var openPageStub = sinon.stub()
  openPageStub.returns(Promise.resolve())

  var urlStub = sinon.stub()

  var adapter = {
    driver: getDriverStub,
    open: openPageStub,
    get url () {
      return urlStub()
    }
  }

  var browser = new Browser()
  browser.adapter = adapter

  t.context.driverStub = driverStub
  t.context.browser = browser
  t.context.adapter = adapter
  t.context.urlStub = urlStub
  t.context.openPageStub = openPageStub
  t.context.getDriverStub = getDriverStub
})

test('get driver', t => {
  t.same(t.context.browser.driver(), t.context.driverStub)
})

test('visit command', t => {
  t.context.browser.visit('/home')
    .then(b => {
      t.same(b, t.context.browser)
      t.ok(t.context.openPageStub.calledOnce)
      t.ok(t.context.openPageStub.lastCall.calledWith('/home'))
    })
})

test('resolve page based on current browser location (via string)', t => {
  t.context.urlStub.returns(Promise.resolve('http://localhost/home'))

  var PageStub = sinon.stub()
  function MockPage () {
    PageStub.apply(null, arguments)
  }

  t.context.browser.pages = [
    { uri: '/home', page: MockPage }
  ]

  var browser = t.context.browser
  var adapter = t.context.adapter

  return browser.visit('/home')
    .then(b => {
      b.page.then(p => {
        t.ok(p.constructor === MockPage)
        t.ok(PageStub.calledOnce)
        t.ok(PageStub.firstCall.calledWithExactly(adapter, 'http://localhost/home'))
      })
    })
})

test('resolve page based on current browser location (via RegExp)', t => {
  t.context.urlStub.returns(Promise.resolve('http://localhost/home?some=var'))

  var PageStub = sinon.stub()
  function MockPage () {
    PageStub.apply(null, arguments)
  }

  t.context.browser.pages = [
    { uri: /^(https?):\/\/([^\/]+)\/home\?some=([^&]+)/, page: MockPage }
  ]

  var browser = t.context.browser
  var adapter = t.context.adapter

  return browser.visit('/home')
    .then(b => {
      b.page.then(p => {
        t.ok(p.constructor === MockPage)
        t.ok(PageStub.calledOnce)
        t.ok(PageStub.firstCall.calledWithExactly(adapter, 'http://localhost/home?some=var'))
      })
    })
})

test.skip('exit', t => {})
