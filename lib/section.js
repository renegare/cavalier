'use strict'

var Component = require('./component')

class Section extends Component {
  constructor (name) {
    super()
    this.name = name
  }
}

module.exports = Section
