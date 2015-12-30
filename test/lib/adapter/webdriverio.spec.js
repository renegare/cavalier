var test = require('ava')
var sinon = require('sinon')
var src = require('sequire')
var proxy = require('proxyquire').noCallThru()
var Element = src('index').Element
var co = require('bluebird').coroutine

test.beforeEach('setup stubs', t => {
  var driver = {session: () => {}}
  driver.init = sinon.stub().returns(driver)
  driver.waitUntil = (cb) => {
    return cb()
  }

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

test('contextulise', t => {
  var adapter = t.context.adapter
  t.same(adapter.context(), [])

  adapter = adapter.contextulise(new Element('.whatever'))
  t.same(adapter.context(), ['.whatever'])
})

test('get length of matching elements', co(function * (t) {
  var adapter = t.context.adapter
  var elements = [{ELEMENT: 0}, {ELEMENT: 1}, {ELEMENT: 2}, {ELEMENT: 3}, {ELEMENT: 4}]
  var e = new Element('.elements')
  adapter.findAll = sinon.stub().returns(Promise.resolve(elements))
  t.same(elements.length, yield adapter.length(e))
  t.ok(adapter.findAll.calledOnce)
  t.same(adapter.findAll.lastCall.args, [e])
}))

test('findAll wt single selector', co(function * (t) {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var elements = [{ELEMENT: 'b0'}, {ELEMENT: 'b1'}, {ELEMENT: 'b2'}, {ELEMENT: 'b3'}, {ELEMENT: 'b4'}]

  driver.elements = sinon.stub().returns(Promise.resolve({value: elements}))
  t.same(elements, yield adapter.findAll({selector: ['.elements']}))
  t.ok(driver.elements.calledOnce)
  t.same(driver.elements.lastCall.args, ['.elements'])
}))

test('findAll wt single selector and index', co(function * (t) {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var elements = [{ELEMENT: 'b0'}, {ELEMENT: 'b1'}, {ELEMENT: 'b2'}, {ELEMENT: 'b3'}, {ELEMENT: 'b4'}]

  driver.elements = sinon.stub().returns(Promise.resolve({value: elements}))
  t.same([elements[0]], yield adapter.findAll({selector: ['.elements', 0]}))
  t.ok(driver.elements.calledOnce)
  t.same(driver.elements.lastCall.args, ['.elements'])
}))

test('findAll wt single selector and negative index', co(function * (t) {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var elements = [{ELEMENT: 'b0'}, {ELEMENT: 'b1'}, {ELEMENT: 'b2'}, {ELEMENT: 'b3'}, {ELEMENT: 'b4'}]

  driver.elements = sinon.stub().returns(Promise.resolve({value: elements}))
  t.same([elements[4]], yield adapter.findAll({selector: ['.elements', -1]}))
  t.ok(driver.elements.calledOnce)
  t.same(driver.elements.lastCall.args, ['.elements'])
}))

test('findAll wt single selector, index and another selector', co(function * (t) {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var elements = [{ELEMENT: 'b0'}, {ELEMENT: 'b1'}, {ELEMENT: 'b2'}, {ELEMENT: 'b3'}, {ELEMENT: 'b4'}]
  var subElements = [{ELEMENT: 's0'}, {ELEMENT: 's1'}, {ELEMENT: 's2'}, {ELEMENT: 's3'}, {ELEMENT: 's4'}]

  driver.elements = sinon.stub().returns(Promise.resolve({value: elements}))
  driver.elementIdElements = sinon.stub()
    .returns(Promise.resolve({value: subElements}))
  t.same(subElements, yield adapter.findAll({selector: ['.elements', 4, '.sub-elements']}))
  t.ok(driver.elements.calledOnce)
  t.same(driver.elements.lastCall.args, ['.elements'])
  t.ok(driver.elementIdElements.calledOnce)
  t.same(driver.elementIdElements.lastCall.args, ['b4', '.sub-elements'])
}))

test('findAll wt single selector and selector', co(function * (t) {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var elements = [{ELEMENT: 'b0'}, {ELEMENT: 'b1'}, {ELEMENT: 'b2'}, {ELEMENT: 'b3'}, {ELEMENT: 'b4'}]
  var subElements = [{ELEMENT: 's0'}, {ELEMENT: 's1'}, {ELEMENT: 's2'}, {ELEMENT: 's3'}, {ELEMENT: 's4'}]
  driver.elements = sinon.stub().returns(Promise.resolve({value: elements}))
  var stub = driver.elementIdElements = sinon.stub()
  stub.onCall(0).returns(Promise.resolve({value: [subElements[2]]}))
  stub.onCall(1).returns(Promise.resolve({value: [subElements[3]]}))
  stub.onCall(2).returns(Promise.resolve({value: []}))
  stub.onCall(3).returns(Promise.resolve({value: [subElements[4]]}))
  stub.onCall(4).returns(Promise.resolve({value: []}))
  t.same([subElements[2], subElements[3], subElements[4]], yield adapter.findAll({selector: ['.elements', '.sub-elements']}))
  t.ok(driver.elements.calledOnce)
  t.same(driver.elements.lastCall.args, ['.elements'])
  t.same(driver.elementIdElements.callCount, elements.length)

  t.same(driver.elementIdElements.firstCall.args, ['b0', '.sub-elements'])
  t.same(driver.elementIdElements.getCall(1).args, ['b1', '.sub-elements'])
  t.same(driver.elementIdElements.getCall(2).args, ['b2', '.sub-elements'])
  t.same(driver.elementIdElements.getCall(3).args, ['b3', '.sub-elements'])
  t.same(driver.elementIdElements.lastCall.args, ['b4', '.sub-elements'])
}))
