const express = require('express');
const { createCart, addProductToCart } = require('../controllers/cart.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/:productId', authenticationMiddleware, createCart);
router.put('/add-product-to-cart', authenticationMiddleware, addProductToCart)
module.exports = router
