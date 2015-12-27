var express = require('express')

// Constants
var PORT = 3000

// App
var app = express()
app.get('/', (req, res) => {
  res.send(
    '<html><body>' +
      '<div id="welcome">Hello World</div>' +
      '<input name="q" placeholder="Enter some text here">' +
      '<input type="submit" name="btnK" value="Submit">' +
      '<ul>' +
        '<li></li>' +
        '<li></li>' +
        '<li></li>' +
        '<li>Fourth Item</li>' +
      '</ul>' +
    '</body></html>'
  )
})

app.listen(PORT)
console.log('Running on http://localhost:' + PORT)
