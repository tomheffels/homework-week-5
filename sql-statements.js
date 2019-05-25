const {Pool} = require('pg')
const pool = new Pool({connectionString: process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres'})

const createTable = "CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))"
const insertRow = "INSERT INTO person (first_name, last_name, eye_color) VALUES ($1, $2, $3)"
const updateEyeColor = "UPDATE person SET eye_color=($1) WHERE eye_color=($2)"
const selectByFirstName = "SELECT * FROM person WHERE first_name = ($1)"

pool.connect()
  .then(() => pool.query(createTable))
  .then(() => pool.query(insertRow, ['James', 'Smith', 'brown']))
  .then(() => pool.query(insertRow, ['Frank', 'Jones', 'brown']))
  .then(() => pool.query(insertRow, ['Rebecca', 'Andrews', 'blue']))
  .then(() => pool.query(updateEyeColor, ['blue', 'brown']))
  .then(() => pool.query(selectByFirstName, ['James']))
  .then(res => console.log(res.rows))
  .catch(err => console.error(err))

