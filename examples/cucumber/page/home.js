'use strict'

var Interface = require('../../../lib/interface')
var Promise = require('bluebird')

class HomePage extends Interface {
  constructor (adapter) {
    super(adapter)

    this.element('field', 'input[name=q]')
    this.element('submit', 'input[name=btnK]')
    this.elements('listItems', 'ul li')
  }

  get visible () {
    return Promise.join(this.field.waitTillVisible(), this.submit.waitTillVisible())
      .then(function (visibles) {
        return !visibles.some(v => v !== true)
      })
  }
}

module.exports = HomePage
