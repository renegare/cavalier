var test = require('ava')
var sinon = require('sinon')
var src = require('sequire')
var Interfaces = src('index').Interfaces
var Interface = src('index').Interface
var Element = src('index').Element
var co = require('bluebird').coroutine

class MockAdapter {
  constructor () {
    this.lengthStub = sinon.stub()
    this.findAllStub = sinon.stub()
    this.contextStub = sinon.stub()
  }

  get methods () {
    return []
  }

  context (selector) {
    return this.contextStub.apply(this, arguments)
  }

  length () {
    return this.lengthStub.apply(this, arguments)
  }
}

test('length of matching elements', co(function * (t) {
  var adapter = new MockAdapter()
  var lengthStub = adapter.lengthStub.returns(Promise.resolve(3))
  var contextStub = adapter.contextStub.returns('.root')

  var es = new Interfaces(Interface, adapter)
  t.same(yield es.length, 3)
  t.ok(lengthStub.calledOnce)
  t.same(lengthStub.lastCall.args.length, 1)
  var e = lengthStub.lastCall.args[0]
  t.same(e.constructor, Element)
  t.same(e.selector, '.root')
  t.same(e.index, 0)

  t.ok(contextStub.calledOnce)
  t.same(contextStub.lastCall.args, [''])
}))

test('first element', co(function * (t) {
  var adapter = new MockAdapter()

  var es = new Interfaces(Interface, adapter)
  var e = es.first
  t.same(e.constructor, Interface)
  t.same(e.adapter, adapter)
  t.same(e.index, 0)
}))

test('nth element', co(function * (t) {
  var adapter = new MockAdapter()

  var es = new Interfaces(Interface, adapter)
  var e = es.at(123)
  t.same(e.constructor, Interface)
  t.same(e.adapter, adapter)
  t.same(e.index, 123)
}))

test('last element', co(function * (t) {
  var adapter = new MockAdapter()

  var es = new Interfaces(Interface, adapter)
  var e = es.last
  t.same(e.constructor, Interface)
  t.same(e.adapter, adapter)
  t.same(e.index, -1)
}))
