const sendResponse = require('../helpers/sendResponse');
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
        result = await result.populate([{path: "owner", select: ["name", "email"]}, {path: "products.productId", select: "name"}])
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, {result, test}, false, "Successfully create shopping cart"
    )
}

module.exports = createCart
