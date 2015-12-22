var test = require('ava')
var sinon = require('sinon')
var src = require('sequire')
var proxy = require('proxyquire').noCallThru()
var Element = src('index').Element

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

test('get exposable methods', t => {
  t.same(t.context.adapter.methods, ['find', 'findAll'])
})

test('find single element matching selector ', t => {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var element = {some: 'element'}

  driver.element = sinon.stub().returns(Promise.resolve())
  driver.waitUntil.returns(Promise.resolve(element))

  return adapter.find(new Element('.element'))
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

  return adapter.findAll(new Element('.elements'))
    .then(e => {
      t.same(driver.elements.lastCall.args, ['.elements'])
      t.same(e, elements)
    })
})

test('clone and contextulise adapter (find)', t => {
  var adapter = t.context.adapter.contextulise(new Element('.root'))
  var driver = t.context.driver
  var element = {some: 'element'}

  driver.element = sinon.stub().returns(Promise.resolve())
  driver.waitUntil.returns(Promise.resolve(element))

  return adapter.find(new Element('.element'))
    .then(e => {
      t.same(driver.element.lastCall.args, ['.root .element'])
      t.same(e, element)
    })
})

test('clone and contextulise adapter (findAll)', t => {
  var adapter = t.context.adapter.contextulise(new Element('.root'))
  var driver = t.context.driver
  var elements = [{some: 'element'}, {some: 'element'}, {some: 'element'}]

  driver.elements = sinon.stub().returns(Promise.resolve())
  driver.waitUntil.returns(Promise.resolve(elements))

  return adapter.findAll(new Element('.elements'))
    .then(e => {
      t.same(driver.elements.lastCall.args, ['.root .elements'])
      t.same(e, elements)
    })
})
