'use strict'

var Promise = require('bluebird')
var adapterKey = Symbol()
var pages = Symbol()

/**
@class
@classDesc Browser is the initial interface. Browser has "Page"s ...
*/
class Browser {
  /**
  visit a given url
  */
  visit (url) {
    return this[adapterKey].open(url)
      .then(() => {
        return Promise.resolve(this)
      })
  }

  set adapter (adapter) {
    this[adapterKey] = adapter
  }

  get driver () {
    return this[adapterKey].driver
  }

  set pages (map) {
    this[pages] = map.map(p => {
      var pattern = p.uri
      if (typeof pattern === 'string') {
        if (/^\/(:?[^\/]+)?$/.test(pattern)) {
          pattern = '^https?://[^/]+' + pattern
        }
        pattern = new RegExp(pattern)
      }

      return {
        class: p.page,
        pattern: pattern
      }
    })
  }

  get url () {
    return this[adapterKey].url
  }

  get page () {
    return this.url.then(url => {
      var page = this[pages].find((curr, index, arr) => {
        return !!curr.pattern.test(url)
      })

      if (!page) {
        throw new Error('No page object found for the url "' + url + '"')
      }

      var PageClass = page.class
      return new PageClass(this[adapterKey], url)
    })
  }
}

module.exports = Browser
