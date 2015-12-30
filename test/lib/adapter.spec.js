var test = require('ava')
var src = require('sequire')
var Adapter = src('index').Adapter
var Element = src('index').Element
var Interface = src('index').Interface

test.only('get context and context resolution', t => {
  var adapter = new Adapter()
  t.same(adapter.context(), [])

  var adapterWithContext = adapter.contextulise(new Element('.root'))
  t.same(adapterWithContext.context(new Element('.element')), ['.root', '.element'])

  var e = new Element('.test', adapterWithContext)
  t.same(e.selector, ['.root', '.test'])

  var i = new Interface(adapterWithContext)

  i.element('save', 'button')
  t.same(i.save.selector, ['.root', 'button'])

  i.elements('fields', 'input')
  t.same(i.fields.first.index, 0)
  t.same(i.fields.first.selector, ['.root', 'input', 0])

  i.section(Interface, 'main_menu', 'nav')
  t.same(i.main_menu.adapter.context(), ['.root', 'nav'])

  i.main_menu.elements('options', 'li')
  t.same(i.main_menu.options.last.index, -1)
  t.same(i.main_menu.options.last.selector, ['.root', 'nav', 'li', -1])

  i.sections(Interface, 'social_links', '.social-links')
  t.same(i.social_links.at(123).adapter.context(), ['.root', '.social-links', 123])
})
