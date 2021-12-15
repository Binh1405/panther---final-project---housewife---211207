const express = require('express');
const { createCart, addProductToCart, removeProductFromCart, getSingleCart, payCart, deleteCart, getAll, getAllOwn } = require('../controllers/cart.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware')
const router = express.Router();

router.post('/:productId', authenticationMiddleware, createCart);
router.put('/add-product-to-cart', authenticationMiddleware, addProductToCart)
router.delete('/remove-product/:cartId', authenticationMiddleware, removeProductFromCart)
router.get('/single-cart', authenticationMiddleware, getSingleCart)
router.put('/payment/:cartId', authenticationMiddleware, payCart)
router.delete('/:cartId', authenticationMiddleware, deleteCart)
router.get('/', authenticationMiddleware, isAdmin, getAll)
router.get('/me', authenticationMiddleware, isAdmin, getAllOwn)
module.exports = router
