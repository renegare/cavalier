var test = require('ava')
var sinon = require('sinon')
var src = require('sequire')
var Elements = src('index').Elements

class MockAdapter {
  constructor() {
    this.findAllStub = sinon.stub()
  }

  findAll () {
    return this.findAllStub.apply(null, arguments)
  }
}

test('exposes length getter promise', async t => {
  var elements = [{some: 'object0'}, {some: 'object1'}, {some: 'object2'}]
  var adapter = new MockAdapter()
  var findAllStub = adapter.findAllStub.returns(Promise.resolve(elements))

  var e = new Elements(adapter, 'nav li')
  t.same(await e.length, elements.length)
  t.ok(findAllStub.calledOnce)
  t.same(findAllStub.lastCall.args, ['nav li'])
})
