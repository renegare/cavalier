'use strict'

var Promise = require('bluebird')
var adapterKey = Symbol()
var nameKey = Symbol()

class Component {
  set name (name) {
    this[nameKey] = name
  }

  get name () {
    return this[nameKey]
  }

  set adapter (adapter) {
    this[adapterKey] = adapter
  }

  get adapter () {
    return this[adapterKey]
  }

  element (name) {
    var args = Array.prototype.slice.call(arguments, 1)
    if (typeof name === 'string') {
      Object.defineProperty(this, name, {
        get: () => {
          return this[adapterKey].find.apply(this[adapterKey], args)
        },
        enumerable: true
      })
    } else { // @todo check interface (throw error if pre-requisits are not met)
      var obj = name
      name = obj.name
      obj.adapter = this[adapterKey].contextulise.apply(this[adapterKey], args)
      obj.then = (resolve, reject) => {
        return Promise.resolve().then(() => {
          return resolve(obj)
        }, reject)
      }
      Object.defineProperty(this, name, {
        get: () => {
          return obj
        },
        enumerable: true
      })
    }
  }

  elements (name) {
    var args = Array.prototype.slice.call(arguments, 1)
    Object.defineProperty(this, name, {
      get: () => {
        return this[adapterKey].findAll.apply(this[adapterKey], args)
      },
      enumerable: true
    })
  }
}

module.exports = Component
