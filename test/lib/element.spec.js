var test = require('ava')
var sinon = require('sinon')
var src = require('sequire')
var Element = src('index').Element

class MockAdapter {
  constructor() {
    this.findStub = sinon.stub()
    this.findAllStub = sinon.stub()
  }

  find () {
    return this.findStub.apply(null, arguments)
  }

  findAll () {
    return this.findAllStub.apply(null, arguments)
  }
}

test('Element exposes proxy adapter methods', async t => {
  var element = {some: 'object'}
  var adapter = new MockAdapter()
  var findStub = adapter.findStub.returns(Promise.resolve(element))

  var e = new Element(adapter, 'button.red')
  t.same(await e.find(), element)
  t.ok(findStub.calledOnce)
  t.same(findStub.lastCall.args, ['button.red'])
})

test('Element correctly passes on additional arguments', async t => {
  var elements = [{some: 'object'}, {some: 'object'}, {some: 'object'}]
  var adapter = new MockAdapter()
  var findAllStub = adapter.findAllStub.returns(Promise.resolve(elements))

  var e = new Element(adapter, 'button.red')
  t.same(await e.findAll('additional', 'args'), elements)
  t.ok(findAllStub.calledOnce)
  t.same(findAllStub.lastCall.args, ['button.red', 'additional', 'args'])
})
