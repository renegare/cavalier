var test = require('ava')
var sinon = require('sinon')
var src = require('sequire')
var proxy = require('proxyquire').noCallThru()

test.beforeEach('setup stubs', t => {
  var driver = {}
  driver.init = sinon.stub().returns(driver)
  driver.waitUntil = sinon.stub().callsArg(0)

  var wdio = { remote: sinon.stub().returns(driver) }
  var Adapter = proxy(src('lib/adapter/webdriverio', true), {
    webdriverio: wdio
  })

  var wdOpts = { desiredCapabilities: { browserName: 'chrome' } }
  var adapter = new Adapter(wdOpts)

  t.context.wdio = wdio
  t.context.driver = driver
  t.context.wdOpts = wdOpts
  t.context.adapter = adapter
})

test('get driver', t => {
  var adapter = t.context.adapter
  var wdio = t.context.wdio
  var driver = t.context.driver
  var wdOpts = t.context.wdOpts

  t.same(driver, adapter.driver)
  t.ok(driver.init.calledOnce)
  t.ok(wdio.remote.calledOnce)
  t.same(wdio.remote.lastCall.args, [wdOpts])
})

test('open url', t => {
  var adapter = t.context.adapter
  var driver = t.context.driver

  driver.url = sinon.stub().returns(Promise.resolve())

  return adapter.open('http://localhost/some/where')
    .then(() => {
      t.ok(driver.url.calledOnce)
      t.same(driver.url.lastCall.args, ['http://localhost/some/where'])
    })
})

test('get current browser url', t => {
  var adapter = t.context.adapter
  var driver = t.context.driver

  driver.getUrl = sinon.stub().returns(Promise.resolve('http://localhost/some/where/else'))

  return adapter.url.then(url => {
    t.same(url, 'http://localhost/some/where/else')
  })
})

test('find single element matching selector ', t => {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var element = {some: 'element'}

  driver.element = sinon.stub().returns(Promise.resolve())
  driver.waitUntil.returns(Promise.resolve(element))

  return adapter.find('.element')
    .then(e => {
      t.same(driver.element.lastCall.args, ['.element'])
      t.same(e, element)
    })
})

test('findAll element matching selector', t => {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var elements = [{some: 'element'}, {some: 'element'}, {some: 'element'}]

  driver.elements = sinon.stub().returns(Promise.resolve())
  driver.waitUntil.returns(Promise.resolve(elements))

  return adapter.findAll('.elements')
    .then(e => {
      t.same(driver.elements.lastCall.args, ['.elements'])
      t.same(e, elements)
    })
})

test('clone and contextulise adapter (findAll)', t => {
  var adapter = t.context.adapter.contextulise('.root')
  var driver = t.context.driver
  var elements = [{some: 'element'}, {some: 'element'}, {some: 'element'}]

  driver.elements = sinon.stub().returns(Promise.resolve())
  driver.waitUntil.returns(Promise.resolve(elements))

  return adapter.findAll('.elements')
    .then(e => {
      t.same(driver.elements.lastCall.args, ['.root .elements'])
      t.same(e, elements)
    })
})

test('clone and contextulise adapter (find)', t => {
  var adapter = t.context.adapter.contextulise('.root')
  var driver = t.context.driver
  var element = {some: 'element'}

  driver.element = sinon.stub().returns(Promise.resolve())
  driver.waitUntil.returns(Promise.resolve(element))

  return adapter.find('.element')
    .then(e => {
      t.same(driver.element.lastCall.args, ['.root .element'])
      t.same(e, element)
    })
})
