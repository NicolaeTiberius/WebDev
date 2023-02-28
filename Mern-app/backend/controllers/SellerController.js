const Sellers = require('../models/sellerModel');
const mongoose = require('mongoose');

//get all sellers
const getSellers = async (req,res) => {
    const sellers = await Sellers.find({}).sort({createdAt: -1});

    res.status(200).json(sellers);
}


//get a single seller
const getSeller = async (req,res) => {
    const {id} = req.params;
    //check if its valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'});
    }
    const seller = await Sellers.findById(id);

    if(!seller){
        return res.status(404).json({error: 'No such product'});
    }

    res.status(200).json(seller);
}

//create a new seller

const createSeller = async (req,res) =>{
    const {title, price, quantity, image } = req.body;
    

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(!quantity){
        emptyFields.push('quantity')
    }
    
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill in all the fields',emptyFields})
    }

    //ADD document to DB
    try{
        const seller = await Sellers.create({title,price,quantity, image});
        res.status(200).json(seller);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

//delete a seller/product
const deleteSeller = async (req,res) => {
    const {id} = req.params;

    //check if its valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'});
    }

    const seller = await Sellers.findOneAndDelete({_id: id})

    if(!seller){
        return res.status(404).json({error: 'No such product'});
    }

    res.status(200).json(seller);
}

//update a seller/product

const updateSeller = async (req,res) => {
    const {id} = req.params;

    //check if its valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'});
    }

    const seller = await Sellers.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!seller){
        return res.status(404).json({error: 'No such product'});
    }

    res.status(200).json(seller);
}

module.exports = {
    createSeller,
    getSellers,
    getSeller,
    deleteSeller,
    updateSeller
}