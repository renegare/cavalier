var Adapter = require('../../adapter')

function World () {
  this.adapter = new Adapter({ desiredCapabilities: { browserName: 'chrome' } })
}

module.exports = function () {
  this.World = World
}
