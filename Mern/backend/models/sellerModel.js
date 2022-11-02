const mongoose = require('mongoose');

//defines the structure of a particular document or type inside a database
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
}, {timestamps: true});


//apply that schema to a particular model
// and that can be used to apply to server 
//model can use methods to communicate with server.
module.exports = mongoose.model('Seller', SellerSchema);



