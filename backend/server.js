const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Express App
const app = express()

// Middleware

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for Requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to database & listening on port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

