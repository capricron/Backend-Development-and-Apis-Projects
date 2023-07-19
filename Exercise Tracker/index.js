const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const db = require("./database/db");

db.connect();

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors());
app.use(express.json());

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const {
  createUser,
  allUsers
} = require('./controllers/user.controller')

const { createExercise,logExercise } = require('./controllers/exercise.controller')

app.post('/api/users', createUser)
app.get('/api/users', allUsers)
app.post('/api/users/:id/exercises', createExercise)
app.get('/api/users/:id/logs', logExercise)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
