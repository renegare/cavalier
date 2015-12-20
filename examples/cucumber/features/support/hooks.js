'use strict'

module.exports = function () {
  this.After(function (scenario) {
    return this.adapter.driver.close()
      .then(null, () => console.log('error closing session ...'))
  })
}
