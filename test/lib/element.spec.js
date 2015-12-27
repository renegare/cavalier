var test = require('ava')
var sinon = require('sinon')
var src = require('sequire')
var Element = src('index').Element
var co = require('bluebird').coroutine

class MockAdapter {
  constructor () {
    this.findStub = sinon.stub()
    this.findAllStub = sinon.stub()
    this.methodsStub = sinon.stub()
    this.contextStub = sinon.stub()
  }

  get methods () {
    return this.methodsStub.apply(null, arguments)
  }

  context () {
    return this.contextStub.apply(null, arguments)
  }

  find () {
    return this.findStub.apply(null, arguments)
  }

  findAll () {
    return this.findAllStub.apply(null, arguments)
  }
}

test('exposes and proxies adapter methods', co(function * (t) {
  var element = {some: 'object'}
  var adapter = new MockAdapter()
  var findStub = adapter.findStub.returns(Promise.resolve(element))
  var contextStub = adapter.contextStub.returns('some selector')

  adapter.methodsStub.returns(['find'])

  var e = new Element('button.red', adapter)
  t.same(e.index, undefined)
  t.same(e.findAll, undefined)
  t.same(e.context, undefined)

  t.same(e.selector, 'some selector')
  t.ok(contextStub.calledOnce)
  t.same(contextStub.lastCall.args, ['button.red', undefined])

  t.same(yield e.find(), element)
  t.ok(findStub.calledOnce)
  t.same(findStub.lastCall.args, [e])
}))

test('correctly passes on additional arguments', co(function * (t) {
  var elements = [{some: 'object'}, {some: 'object'}, {some: 'object'}]
  var adapter = new MockAdapter()
  var findAllStub = adapter.findAllStub.returns(Promise.resolve(elements))
  adapter.methodsStub.returns(['findAll'])

  var e = new Element('button.red', adapter, 1)
  t.same(e.index, 1)
  t.same(e.find, undefined)
  t.same(yield e.findAll('additional', 'args'), elements)
  t.ok(findAllStub.calledOnce)
  t.same(findAllStub.lastCall.args, [e, 'additional', 'args'])
}))

test('exposes all methods (when no method param is available)', t => {
  var adapter = new MockAdapter()
  delete adapter.methods

  var e = new Element('button.red', adapter)
  t.same(Object.keys(e), ['context', 'find', 'findAll'])
})

test('selector when no adapter is provided', t => {
  var e = new Element('button.red')
  t.same(e.selector, 'button.red')
})
