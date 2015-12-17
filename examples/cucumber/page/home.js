'use strict'

var Page = require('../../../lib/page')

class HomePage extends Page {

  constructor (adapter) {
    super(adapter)

    this.element('search_box', 'input[name=q]')
    this.element('search_button', 'input[name=btnK]')
  }

  set_search_box (value) {
    return this.search_box.then(e => {
      return this.adapter.driver.elementIdValue(e.value.ELEMENT, 'mudi was here')
        .debug()
    })
  }
}

module.exports = HomePage
