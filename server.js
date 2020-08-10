const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
     },
    () => console.log('mongoDB Connect !')
)


//Middleware
app.use(express.json())

//Import Routes
const authRoute = require('./routes/auth')


//Route middleware
app.use('/api/user',authRoute)



app.listen(3000,console.log('Server start'))