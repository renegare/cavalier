var test = require('ava')
var src = require('sequire')
var sinon = require('sinon')
var Section = src('index').Section

test('get name', t => {
  var section = new Section('navigation')
  t.ok(section.name === 'navigation')
})

test('access element within section', t => {
  var element = {some: 'object'}
  var findElementStub = sinon.stub().returns(Promise.resolve(element))
  var adapter = {
    find: findElementStub
  }

  var s = new Section('navigation')
  s.adapter = adapter
  s.element('save', 'button')
  return s.save.then(e => {
    t.same(e, element)
    t.ok(adapter.find.calledOnce)
    t.same(adapter.find.lastCall.args, ['button'])
  })
})

test('access all elements within section', t => {
  var elements = [{some: 'object3'}, {some: 'object2'}]
  var findAllElementsStub = sinon.stub().returns(Promise.resolve(elements))
  var adapter = {
    findAll: findAllElementsStub
  }

  var s = new Section('navigation')
  s.adapter = adapter
  s.elements('components', 'li')
  return s.components.then(e => {
    t.same(e, elements)
    t.ok(adapter.findAll.calledOnce)
    t.same(adapter.findAll.lastCall.args, ['li'])
  })
})

test('access section within section', t => {
  var contextedAdapter = {}
  var getContextedAdapterStub = sinon.stub().returns(contextedAdapter)
  var adapter = {
    contextulise: getContextedAdapterStub
  }
  var getNameStub = sinon.stub().returns('main_menu')
  var setAdapterStub = sinon.stub()

  class SubSection {
    get name () {
      return getNameStub()
    }
    set adapter (adapter) {
      setAdapterStub.apply(null, arguments)
    }
  }

  var s = new Section(adapter, 'http://localhost/whatever')
  s.adapter = adapter
  s.element(new SubSection('main_menu'), 'nav')

  t.ok(s.main_menu.constructor === SubSection)
  t.ok(setAdapterStub.calledOnce)
  t.same(setAdapterStub.lastCall.args, [contextedAdapter])
  t.ok(getContextedAdapterStub.calledOnce)
  t.ok(getContextedAdapterStub.lastCall.args, ['nav'])

  return s.main_menu.then(e => {
    t.ok(e.constructor === SubSection)
  })
})
