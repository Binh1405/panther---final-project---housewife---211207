const express = require('express');
const { createCart, addProductToCart, removeProductFromCart } = require('../controllers/cart.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/:productId', authenticationMiddleware, createCart);
router.put('/add-product-to-cart', authenticationMiddleware, addProductToCart)
router.delete('/remove-product/:cartId', authenticationMiddleware, removeProductFromCart)
module.exports = router
