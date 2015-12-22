var test = require('ava')
var sinon = require('sinon')
var proxy = require('proxyquire').noCallThru()
var src = require('sequire')
var Elements = src('index').Elements
var Element = src('index').Element

class MockAdapter {
  constructor() {
    this.findAllStub = sinon.stub()
  }

  get methods () {
    return []
  }

  findAll () {
    return this.findAllStub.apply(null, arguments)
  }
}

test.only('expose length (deps on findAll adapter method)', async t => {
  var elements = [{some: 'object0'}, {some: 'object1'}, {some: 'object2'}]
  var adapter = new MockAdapter()
  var findAllStub = adapter.findAllStub.returns(Promise.resolve(elements))

  var e = new Elements(adapter, 'nav li')
  t.same(await e.length, elements.length)
  t.ok(findAllStub.calledOnce)
  t.same(findAllStub.lastCall.args.length, 1)
  var arg = findAllStub.lastCall.args[0]
  t.same(arg.constructor, Element)
  t.same(arg.selector, 'nav li')
  t.same(arg.index, undefined)
})

function assertNthElement (position) {
  return async t => {
    var elements = [{element: 0}, {element: 1}, {element: 2}]
    var adapter = new MockAdapter()
    var findAllStub = adapter.findAllStub.returns(Promise.resolve(elements))
    var constructorStub = sinon.stub()
    var handle
    var index

    switch(position) {
      case 'first':
        index = 0
        handle = (e => e.first)
        break
      case 'last':
        index = 2
        handle = (e => e.last)
        break
      default:
        index = position
        handle = (e => e.at(position))
        break
    }

    class Element {
      constructor() {
        constructorStub.apply(null, arguments)
      }

      find () {
        return Promise.resolve(elements[index])
      }
    }

    var Elements = proxy(src('lib/elements', true), {
      './element': Element
    })

    var es = new Elements(adapter, 'nav li')
    var e = await handle(es)
    t.same(e.constructor, Element)
    t.same(await e.find(), {element: index})
    t.same(constructorStub.lastCall.args, [adapter, 'nav li', index])

    if(position === 'last') {
      t.ok(findAllStub.calledOnce)
      t.same(findAllStub.lastCall.args, ['nav li'])
    } else {
      t.ok(!findAllStub.calledOnce)
    }
  }
}

test('expose first element', assertNthElement('first'))
test('expose nth element', assertNthElement(1))
test('expose last element', assertNthElement('last'))
