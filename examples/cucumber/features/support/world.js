// var WdioAdapter = require('cavalier/lib/adapter/webdriverio')
var WdioAdapter = require('../../../../lib/adapter/webdriverio')
var HomePage = require('../../page/home')

function World () {
  this.adapter = new WdioAdapter({ desiredCapabilities: { browserName: 'firefox' } })
}

module.exports = function () {
  this.World = World
}
