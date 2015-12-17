var Browser = require('../../../../lib/browser')
var WdioAdapter = require('../../../../lib/adapter/webdriverio')
var HomePage = require('../../page/home')

function World () {
  var browser = new Browser()
  browser.adapter = new WdioAdapter({ desiredCapabilities: { browserName: 'firefox' } })
  browser.pages = [
    { uri: /localhost:\d+/, page: HomePage }
  ]

  this.browser = browser
}

module.exports = function () {
  this.World = World
}
