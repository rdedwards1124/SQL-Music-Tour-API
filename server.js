// DEPENDENCIES
const express = require('express')
// const {Sequelize} = require('sequelize')
const app = express()

//Controllers
const bandsController = require('./controllers/band_controller')
const eventsController = require('./controllers/events_controller')
const stagesController = require('./controllers/stages_controller')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Controller Setup
app.use('/bands', bandsController)
app.use('/events', eventsController)
app.use('/stages', stagesController)

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})

// const sequelize = new Sequelize(process.env.PG_URI)

// try {
//   sequelize.authenticate();
//   console.log(`Connected to database at ${process.env.PG_URI}`);
// } catch(e) {
//   console.log('unable to connect to database', e);
// }