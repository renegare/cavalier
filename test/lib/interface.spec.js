'use strict'

var test = require('ava')
var sinon = require('sinon')
var Promise = require('bluebird')
var src = require('sequire')
var Interface = src('index').Interface
var proxy = require('proxyquire').noCallThru()

test('get adapter', t => {
  var adapter = {}
  var p = new Interface(adapter)
  t.same(adapter, p.adapter)
})

test('get driver', t => {
  var driver = {}
  var adapter = {
    get driver () {
      return driver
    }
  }
  var p = new Interface(adapter)
  t.same(driver, p.driver)
})

test('define and access single element', t => {
  var element = {some: 'object'}
  var findStub = sinon.stub().returns(Promise.resolve(element))
  class MockAdapter {
    find () {
      return findStub.apply(null, arguments)
    }
  }
  var adapter = new MockAdapter()

  var p = new Interface(adapter)
  p.element('save', 'red', 'button')
  return p.save.find('additional', 'args')
    .then(e => {
      t.same(e, element)
      t.ok(findStub.calledOnce)
      t.same(findStub.lastCall.args, ['red', 'button', 'additional', 'args'])
    })
})

test('define and access collection of elements', t => {
  var constructorStub = sinon.stub()
  var adapter = {some: 'adapter'}

  class Elements {
    constructor (adapter, selector) {
      constructorStub(adapter, selector)
    }
  }

  var Interface = proxy(src('lib/interface', true), {
    './elements': Elements
  })

  var p = new Interface(adapter)
  p.elements('options', 'nav li a')
  t.same(p.options.constructor, Elements)
  t.same(constructorStub.lastCall.args, [adapter, 'nav li a'])
})

test.skip('define and access a sub interface', t => {
  var contextedAdapter = {}
  var adapter = {
    contextulise: sinon.stub().returns(contextedAdapter)
  }
  var p = new Interface(adapter)
  p.section(Interface, 'main_menu', 'nav')

  return p.main_menu.then(s => {
    t.ok(s.constructor === Interface)
    t.ok(adapter.contextulise.calledOnce)
    t.ok(adapter.contextulise.lastCall.args, ['nav'])
    t.same(s.adapter, contextedAdapter)
  })
})
