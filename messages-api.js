const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.post('/messages', (req, res) => {
  !req.body.text ? 
    res.status(400) : (
    console.log('Message: ', req.body.text),
    res.json({message: `${req.body.text}`})
    )
})

app.listen(port, () => console.log(`Express API listening on port ${port}`))
