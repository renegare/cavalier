'use strict'

var test = require('ava')
var sinon = require('sinon')
var Promise = require('bluebird')
var src = require('sequire')
var Interface = src('index').Interface

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
  var findElementStub = sinon.stub().returns(Promise.resolve(element))
  var adapter = {
    find: findElementStub
  }

  var p = new Interface(adapter)
  p.element('save', 'button')
  return p.save.then(e => {
    t.same(e, element)
    t.ok(adapter.find.calledOnce)
    t.same(adapter.find.lastCall.args, ['button'])
  })
})

test('define and access collection of elements', t => {
  var elements = [{some: 'object3'}, {some: 'object2'}]
  var findAllElementsStub = sinon.stub().returns(Promise.resolve(elements))
  var adapter = {
    findAll: findAllElementsStub
  }

  var p = new Interface(adapter)
  p.elements('Interfaces', 'li')
  return p.Interfaces.then(e => {
    t.same(e, elements)
    t.ok(adapter.findAll.calledOnce)
    t.same(adapter.findAll.lastCall.args, ['li'])
  })
})

test('define and access a sub interface', t => {
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
