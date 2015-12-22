var Adapter = require('../../adapter')

function World () {
  this.adapter = new Adapter({ desiredCapabilities: { browserName: 'firefox' } })
}

module.exports = function () {
  this.World = World
}
