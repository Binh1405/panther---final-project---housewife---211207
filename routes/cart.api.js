const express = require('express');
const sendResponse = require('../helpers/sendResponse');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin.middleware');
const Cart = require('../models/Cart');
const User = require('../models/User');


const createCart = async(req, res, next) => {
    const owner = req.currentUser._id
    const {productId} = req.params
    let {quantity} = req.body
    quantity = parseInt(quantity)
    let test
    let result;
    const productChoice = {productId, quantity}
    const newCart = {
        owner,
        products: [productChoice]
    }
    try {
        result = await Cart.create(newCart)
        test = await User.findById(result.owner)
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, {result, test}, false, "Successfully create shopping cart"
    )
}

router.post('/:productId', authenticationMiddleware, createCart);
