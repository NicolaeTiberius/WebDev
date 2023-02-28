require('dotenv').config();
const express = require('express');
const sellerRoutes = require('./routes/sellers');
const mongoose= require('mongoose');

const path = require('path');

//express app is stored here 
const start_app = express();

//file upload
const multer = require ('multer')
//middleware for uploads

//cors
const cors = require('cors')

start_app.use(cors());

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads')
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + '---' + file.originalname)
    }
});

const upload = multer({storage:fileStorageEngine})

start_app.post('/single',upload.single('image'),(req,res) => {
    console.log(req.file);
    res.send('Single file upload success');
});

start_app.post('/multiple',upload.array('images',3),(req,res) => {
    console.log(req.files);
    res.send('Multiple files upload success');
});



//middleware for sending requests and logging them on console.
start_app.use(express.json()); // check if any request has any body and shows it. 
start_app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
});




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

