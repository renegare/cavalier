'use strict'

var test = require('ava')
var sinon = require('sinon')
var Promise = require('bluebird')
var sequire = require('sequire')
var Page = sequire('lib/page')

test('Load a single element from adapter', t => {
  var element = {some: 'object'}
  var findElementStub = sinon.stub().returns(Promise.resolve(element))
  var adapter = {
    find: findElementStub
  }

  var p = new Page(adapter, 'http://localhost/whatever')
  p.element('save', 'button')
  return p.save.then(e => {
    t.same(e, element)
    t.ok(adapter.find.calledOnce)
    t.same(adapter.find.lastCall.args, ['button'])
  })
})

test('load array of elements from adapter', t => {
  var elements = [{some: 'object3'}, {some: 'object2'}]
  var findAllElementsStub = sinon.stub().returns(Promise.resolve(elements))
  var adapter = {
    findAll: findAllElementsStub
  }

  var p = new Page(adapter, 'http://localhost/whatever')
  p.elements('components', 'li')
  return p.components.then(e => {
    t.same(e, elements)
    t.ok(adapter.findAll.calledOnce)
    t.same(adapter.findAll.lastCall.args, ['li'])
  })
})

test('load PageSection', t => {
  var contextedAdapter = {}
  var getContextedAdapterStub = sinon.stub().returns(contextedAdapter)
  var adapter = {
    contextulise: getContextedAdapterStub
  }

  var getNameStub = sinon.stub().returns('main_menu')
  var setAdapterStub = sinon.stub()

  class PageSection {
    get name () {
      return getNameStub()
    }
    set adapter (adapter) {
      setAdapterStub.apply(null, arguments)
    }
  }

  var p = new Page(adapter, 'http://localhost/whatever')
  p.element(new PageSection('main_menu'), 'nav')

  t.ok(p.main_menu.constructor === PageSection)
  t.ok(setAdapterStub.calledOnce)
  t.same(setAdapterStub.lastCall.args, [contextedAdapter])
  t.ok(getContextedAdapterStub.calledOnce)
  t.ok(getContextedAdapterStub.lastCall.args, ['nav'])

  return p.main_menu.then(e => {
    t.ok(e.constructor === PageSection)
  })
})
