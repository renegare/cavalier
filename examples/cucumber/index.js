var express = require('express')

// Constants
var PORT = 3000

// App
var app = express()
app.get('/', (req, res) => {
  res.send(
    '<html><body>' +
      '<div id="welcome">Hello world</div>' +
      '<input name="q" placeholder="Enter some text here">' +
    '</body></html>'
  )
})

app.listen(PORT)
console.log('Running on http://localhost:' + PORT)
