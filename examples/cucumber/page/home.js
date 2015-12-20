'use strict'

var Interface = require('../../../lib/interface')

class HomePage extends Interface {

  constructor (adapter) {
    super(adapter)

    this.element('search_box', 'input[name=q]')
    this.element('search_button', 'input[name=btnK]')
  }

  get visible () {
    return Promise.resolve(true)
  }

  set_search_box (value) {
    return this.search_box.then(e => {
      return this.adapter.driver.elementIdValue(e.value.ELEMENT, 'mudi was here')
    })
  }
}

module.exports = HomePage
