const sendResponse = require('../helpers/sendResponse');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product')
const cartController = {}

cartController.createCart = async(req, res, next) => {
    const owner = req.currentUser._id
    const {productId} = req.params
    let {quantity} = req.body
    quantity = parseInt(quantity)
    let test
    let result;
    if(!productId||typeof quantity!=="number"){throw new Error("Missing product info")}
    if(quantity<0) throw new Error("quantity is invalid")
    const activeCart = await Cart.findOne({owner, status: "active"})
    if(activeCart) throw new Error("already have active cart")
    const found = await Product.findById(productId)
    if(!found){throw new Error("Product not found")}
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

cartController.addProductToCart = async(req, res, next) => {
    const owner = req.currentUser._id
    const body = req.body
    let result
    try {
        const cartToUpdate = await Cart.findOne({owner, status: "active"})
        body.map((product) => {
            const quantity = parseInt(product.quantity)
            const productId = product.productId
            cartToUpdate.products.push({productId, quantity})
        })
        result = await Cart.findByIdAndUpdate(cartToUpdate._id, cartToUpdate, {new: true})
    } catch (error) {
        return next (error)
    }
    return sendResponse(
        res, 200, true, result, false, "Successfully add products to cart"
    )
}

cartController.removeProductFromCart = async(req, res, next) => {
    let result
    const {cartId} = req.params
    const {productId, quantity} = req.body  
    // console.log("productId", productId)
    // console.log("quantity", quantity)
    try {
    const cartFound = await Cart.findById(cartId)
    // console.log("cartFound", cartFound)
    const newProductsList = cartFound.products.filter((existed)=>{
        if(existed.productId.equals(productId)){
            existed.quantity -= quantity
        }
        return existed.quantity > 0
    })
    // console.log("new ProductList", newProductsList)
    cartFound.products = newProductsList
    result = await Cart.findByIdAndUpdate(cartId, cartFound, {new: true})
    }catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, result, false, "Successfully remove products from cart"
    )
}

cartController.getSingleCart = async(req, res, next) => {
    let result
    const {cartId} = req.query
    const owner = req.currentUser._id
    try {
        // console.log("owner", owner, "cartId", cartId)
        result = await Cart.findOne({owner, _id: cartId}).populate("products.productId")
    } catch (error) {
        return next(error)
    }
    return sendResponse(res, 200, true, result, false, "Successfully get single cart")
}

cartController.payCart = async(req, res, next) => {
    let result = {}
    const {cartId} = req.params
    const {currentBalance, _id} = req.currentUser
    try {
        const found = await Cart.findById(cartId).populate("products.productId")
        const total = found.products.reduce((acc, cur) => acc + cur.quantity*cur.productId.price,0)
        if(found.status==="paid") throw new Error("cart already paid")
        if(total>currentBalance) throw new Error("not enough money")
        const newBalance = currentBalance - total
        result = await Cart.findByIdAndUpdate(
            cartId, 
            {status: "paid"}, 
            {new: true}
        )
        result.currentBalance = await User.findByIdAndUpdate(
            _id, 
            {currentBalance: newBalance},
            {new: true}
        );
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, result, false, "Successfully paid for shopping cart"
    )
}

cartController.deleteCart = async(req, res, next) => {
    let result 
    const {cartId} = req.params
    const owner = req.currentUser._id
    console.log("owner", owner)
    try {
        result = await Cart.findByIdAndUpdate(
            {_id: cartId, owner},
            {isDeleted: true}, 
            {new: true}
        )
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, null, false, "Successfully delete cart"
    )
}

cartController.getAll = async(req, res, next) => {
    let result = {}
    try {
        result.carts = await Cart.find({}).populate(["owner", "products.productId"])
        result.count = result.carts.length
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, result, false, "Successfully get all carts"
    )
}

cartController.getAllOwn = async(req, res, next) => {
    let result ={}
    let owner = req.currentUser._id
    try {
        result.carts = await Cart.find({owner}).populate("products.productId")
        result.count = result.carts.length
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, result, false, "Successfully get your cart"
    )
}
module.exports = cartController
