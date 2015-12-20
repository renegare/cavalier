'use strict'

var Interface = require('../../../lib/interface')
var Promise = require('bluebird')

class HomePage extends Interface {

  constructor (adapter) {
    super(adapter)

    this.element('search_box', 'input[name=q]')
    this.element('search_button', 'input[name=btnK]')
  }

  get visible () {
    return Promise.join(this.search_box.visible(), this.search_button.visible())
      .then(function(visibles) {
        return !visibles.some(v => v !== true)
      })
  }

  set_search_box (value) {
    return this.search_box.then(e => {
      return this.adapter.driver.elementIdValue(e.value.ELEMENT, 'mudi was here')
    })
  }
}

module.exports = HomePage
