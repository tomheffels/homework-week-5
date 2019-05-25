const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', {define: { timestamps: false }})


const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const Movie = sequelize.define('movies', {
  title: {
    type: Sequelize.STRING
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    field: 'year_of_release'
  },
  synopsis: {
    type: Sequelize.STRING
  }
})

Movie.sync()

app.use(bodyParser.json())

app.get('/', (req, res) => res.redirect('/movies'))

app.post('/movies', (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.json(movie))
})

app.get('/movies', (req, res, next) => {
  const limit = req.query.limit || 10
  const offset = req.query.offset || 0
  Movie.findAll({
      limit, offset
    })
  .then(movies => res.json(movies))
  .catch(err => next(err))
})

app.get('/movies/:id', (req, res, next) => {
  const id = req.params.id
  Movie.findOne(req.body.id)
  .then(movie => res.json(movie))
  .catch(err => next(err))
})

app.put('/movies/:id', (req, res, next) => {
  const id = req.params.id
  const {title, yearOfRelease, synopsis} = req.body
  Movie.update({
    title: title,
    yearOfRelease: yearOfRelease,
    synopsis: synopsis,
  }, {
    where: {
      id: id
    }
  })
  .then(res.json(`Updated movie with id ${id}`))
  .catch(err => next(error))
})

app.delete('/movies/:id', (req, res, next) => {
  const id = req.params.id
  Movie.destroy({where: {
    id: id
  }})
  .then(res.json(`Deleted movie with id ${id}`))
  .catch(err => next(err))
})



app.listen (port, () => console.log(`API listening on port ${port}`))