var Browser = require('cavalier').Browser
var WdioAdapter = require('cavalier/lib/adapter/webdriverio')
var HomePage = require('../../page/home')

function World () {
  var adapter = new WdioAdapter({ desiredCapabilities: { browserName: 'firefox' } })
  var browser = new Browser()
  browser.adapter = adapter

  this.browser = browser
  this.wdAdapter = adapter
}

module.exports = function () {
  this.World = World
}
