// Express app setup
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.listen(port, () => console.log(`API listening on port ${port}`))
app.use(bodyParser.json())

// Since there was no mention of using a database I saw no other way 
// to implement a limit on the amount of POST requests than using an
// incrementing count variable. I hope this is what you had in mind
let count = 0

// Endpoint for POST requests, limited to 5
app.post('/messages', (req, res, next) => {
  const text = req.body.text
  if (count < 5) {
    if (!text) { 
      next(res.status(400))
    } else {
      count++
      console.log('text: ', text)
      res.json({text: `${text}`})
    }
  } else {
    next(res.status(500).send({message: 'Message limit reached'}))
  }
})