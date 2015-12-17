'use strict'

var Component = require('./component')

class Page extends Component {
  constructor (adapter) {
    super()
    this.adapter = adapter
  }
}

module.exports = Page
