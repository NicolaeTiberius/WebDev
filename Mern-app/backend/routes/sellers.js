const express = require('express');


const
 {createSeller,
  getSellers,
  getSeller,
  deleteSeller,
  updateSeller
} = require('../controllers/SellerController')


const router = express.Router();

//GET all sellers
router.get('/', getSellers);

//GET a single seller
router.get('/:id', getSeller);

//POST a new seller
router.post('/', createSeller)

//DELETE a seller
router.delete('/:id',deleteSeller);

//UPDATE a seller

router.patch('/:id',updateSeller);

module.exports = router;