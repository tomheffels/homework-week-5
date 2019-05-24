const {Pool} = require('pg')
const pool = new Pool({connectionString: process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres'})

pool.connect()
  .then(() => console.log('Connected to Postgres!'))
  .then(() => pool.query("CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))"))
  .then(() => {
    const insertPerson = "INSERT INTO person (first_name, last_name, eye_color) VALUES ($1, $2, $3)"
    pool.query(insertPerson, ['James', 'Smith', 'brown'])
    pool.query(insertPerson, ['Frank', 'Jones', 'brown'])
    pool.query(insertPerson, ['Rebecca', 'Andrews', 'blue'])
    console.log('Inserted 3 people')
  })
  .catch(err => console.error(err))

