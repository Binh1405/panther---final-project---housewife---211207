const express = require('express');
const { createCart, addProductToCart, removeProductFromCart, getSingleCart, payCart, deleteCart } = require('../controllers/cart.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/:productId', authenticationMiddleware, createCart);
router.put('/add-product-to-cart', authenticationMiddleware, addProductToCart)
router.delete('/remove-product/:cartId', authenticationMiddleware, removeProductFromCart)
router.get('/single-cart', authenticationMiddleware, getSingleCart)
router.put('/payment/:cartId', authenticationMiddleware, payCart)
router.delete('/:cartId', authenticationMiddleware, deleteCart)
module.exports = router
