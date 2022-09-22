const express = require('express') // import express
const app = express()
app.use(express.json()) // allowing work with json files
const mongoose = require('mongoose') // import mongoose

const db_connected = "mongodb+srv://ranyanay:161196@cars.mddnvbz.mongodb.net/?retryWrites=true&w=majority"

// app.set('view engine', 'ejs')

const userRoutes = require('./routes/user') //import router
app.use('/', userRoutes) //use this router with the '/' prefix

//checking if the connection is ok

// app.get('/' ,(req, res)=>{
//     res.json({hi: ["hi"]})
// })
//check if need to change <---------------------

const checkIfError = (error) => {
    if (error){
        return console.log(error.message)
    }
    
    console.log("Connected!")
}

//chang to promise <------
mongoose.connect(db_connected, {dbName: "BookMarks"}, checkIfError)
app.listen('5000', checkIfError)