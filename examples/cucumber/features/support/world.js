var Adapter = require('../../adapter')
var HomePage = require('../../page/home')

function World () {
  this.adapter = new Adapter({ desiredCapabilities: { browserName: 'firefox' } })
}

module.exports = function () {
  this.World = World
}
