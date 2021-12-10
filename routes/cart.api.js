const express = require('express');
const createCart = require('../controllers/cart.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/:productId', authenticationMiddleware, createCart);
module.exports = router
