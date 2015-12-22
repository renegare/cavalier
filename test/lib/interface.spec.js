'use strict'

var test = require('ava')
var sinon = require('sinon')
var Promise = require('bluebird')
var src = require('sequire')
var Interface = src('index').Interface
var Element = src('index').Element
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
  var constructorStub = sinon.stub()
  var adapter = {some: 'adapter'}

  class Element {
    constructor (adapter, selector) {
      constructorStub(adapter, selector)
    }
  }

  var Interface = proxy(src('lib/interface', true), {
    './element': Element
  })

  var p = new Interface(adapter)
  p.element('save', 'button')
  t.same(p.save.constructor, Element)
  t.same(constructorStub.lastCall.args, [adapter, 'button'])
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

test('define and access a sub interface', t => {
  var secondContextedAdapter = {}
  var contextedAdapter = {
    contextulise: sinon.stub().returns(secondContextedAdapter)
  }
  var adapter = {
    contextulise: sinon.stub().returns(contextedAdapter)
  }

  var p = new Interface(adapter)

  p.section(Interface, 'main_menu', 'nav')
  t.ok(p.main_menu.constructor === Interface)
  t.same(p.main_menu.adapter, contextedAdapter)

  t.ok(adapter.contextulise.calledOnce)
  t.same(adapter.contextulise.lastCall.args.length, 1)
  var e = adapter.contextulise.lastCall.args[0]
  t.same(e.constructor, Element)
  t.same(e.selector, 'nav')
  t.same(e.index, undefined)

  p.main_menu.section(Interface, 'option', 'li')
  t.ok(p.main_menu.option.constructor === Interface)
  t.same(p.main_menu.option.adapter, secondContextedAdapter)
  t.ok(contextedAdapter.contextulise.calledOnce)
  t.same(contextedAdapter.contextulise.lastCall.args.length, 1)
  var e = contextedAdapter.contextulise.lastCall.args[0]
  t.same(e.constructor, Element)
  t.same(e.selector, 'li')
  t.same(e.index, undefined)
})
