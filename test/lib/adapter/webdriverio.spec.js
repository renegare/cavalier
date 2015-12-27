var test = require('ava')
var sinon = require('sinon')
var src = require('sequire')
var proxy = require('proxyquire').noCallThru()
var Element = src('index').Element
var Interface = src('index').Interface

test.beforeEach('setup stubs', t => {
  var driver = {}
  driver.init = sinon.stub().returns(driver)
  driver.waitUntil = (cb) => {
    return cb()
  }

  var wdio = { remote: sinon.stub().returns(driver) }
  var Adapter = proxy(src('lib/adapter/webdriverio', true), {
    webdriverio: wdio
  })

  var wdOpts = { desiredCapabilities: { browserName: 'chrome' } }
  var adapter = new Adapter(wdOpts)

  t.context.wdio = wdio
  t.context.driver = driver
  t.context.wdOpts = wdOpts
  t.context.adapter = adapter
})

test('get context and context resolution', t => {
  var adapter = t.context.adapter
  t.same(adapter.context(), '')

  var adapterWithContext = adapter.contextulise(new Element('.root'))
  t.same(adapterWithContext.context(new Element('.element')), '.root .element')

  var e = new Element('.test', adapterWithContext)
  t.same(e.selector, '.root .test')

  var i = new Interface(adapterWithContext)

  i.element('save', 'button')
  t.same(i.save.selector, '.root button')

  i.elements('fields', 'input')
  t.same(i.fields.first.index, 0)
  t.same(i.fields.first.selector, '.root input:nth-child(1)')

  i.section(Interface, 'main_menu', 'nav')
  t.same(i.main_menu.adapter.context(), '.root nav')

  i.main_menu.elements('options', 'li')
  t.same(i.main_menu.options.last.index, -1)
  t.same(i.main_menu.options.last.selector, '.root nav li:nth-last-child(1)')

  i.sections(Interface, 'social_links', '.social-links')
  t.same(i.social_links.at(123).adapter.context(), '.root .social-links:nth-child(124)')
})

test('get length of matching elements', t => {
  var adapter = t.context.adapter
  var driver = t.context.driver
  var elements = [{some: 'element'}, {some: 'element'}, {some: 'element'}, {some: 'element'}]

  driver.elements = sinon.stub().returns(Promise.resolve({value: elements}))

  return adapter.length(new Element('.elements'))
    .then(l => {
      t.same(driver.elements.lastCall.args, ['.elements'])
      t.same(l, 4)
    })
})
