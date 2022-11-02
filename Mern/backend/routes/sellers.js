const express = require('express');
const Sellers = require('../models/sellerModel')
const router = express.Router();

//GET all sellers
router.get('/',(req,res)=>{
    res.json({mssg: 'GET all sellers'});
});

//GET a single seller
router.get('/:id',(req,res)=>{
    res.json({mssg: 'GET single seller'});
});

//POST a new seller
router.post('/', async (req,res)=>{
    const {title, price, quantity } = req.body;

    try{
        const seller = await Sellers.create({title,price,quantity});
        res.status(200).json(seller);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }

    // res.json({mssg: 'POST a new seller'});
});

//DELETE a seller
router.delete('/:id',(req,res)=>{
    res.json({mssg: 'DELETE a seller'});
});

//UPDATE a seller

router.patch('/:id',(req,res)=>{
    res.json({mssg: 'UPDATE a seller'});
});

module.exports = router;