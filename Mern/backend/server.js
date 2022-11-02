require('dotenv').config();

const express = require('express');
const sellerRoutes = require('./routes/sellers');
const mongoose= require('mongoose');

//express app is stored here 
const start_app = express();

//middleware for sending requests and logging them on console.
start_app.use(express.json()); // check if any request has any body and shows it. 
start_app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

//setup a route handler (server will send a request to the browser
 // and respond with this)

start_app.use('/api/sellers',sellerRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests on port number
        start_app.listen(process.env.PORT,()=>{
        console.log('connected to db and listening on port 4000!!');
});

    })

    .catch((error)=>{
        console.log(error);
    })

