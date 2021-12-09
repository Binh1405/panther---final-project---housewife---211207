const sendResponse = require("../helpers/sendResponse")
const Product = require("../models/Product")

const productController = {}
productController.createProduct = async(req, res, next) => {
    const {name} = req.body
    let {price, stock} = req.body
    let result
    try {
        if(!name || !price) throw new Error("missing product info")
        price = parseInt(price)
        stock = parseInt(stock)
        if(typeof price !== "number" || price < 0 || typeof stock !== "number" || stock < 0) 
        throw new Error("price or stock is invalid")
        const newProduct = {
            name, price, stock
        }
        console.log("newProduct", newProduct)
        const found = await Product.findOne({name})
        if(found) throw new Error("This product is already existed.")
        result = await Product.create(newProduct)
    } catch (error) {
        return next(error)
    }
    return sendResponse(res, 200, true, result, false, "success")
}

productController.getAllProduct = async(req, res, next) => {
    let {limit, page, ...filter} = req.query
    limit = parseInt(req.query.limit) || 10;
    page = parseInt(req.query.page) || 1;
    let count = 0;
    let result
    try { 
        result = await Product.find({...filter, isDeleted: false})
        .sort({createAt: -1})
        .limit(limit)
        .skip(limit*(page-1))
        count = result.length
    }
    catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 
        200, 
        true, 
        {result, count}, 
        false, 
        "Successfully get all products")
}

productController.updateProduct = async(req, res, next) => {
    let result
    const allowOptions = ["name", "stock", "price"]
    const updateObject = {}
    const {productId} = req.params
    try {
        allowOptions.forEach((option) => {
            if(req.body[option]!==undefined){
                updateObject[option] = req.body[option]
            }
        })
        if(!productId) throw new Error("Product not found, or deleted")
        result = await Product.findByIdAndUpdate(productId, updateObject, {
            new: true
        })
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, result, false, "Successfully update product"
    )
}

productController.deleteProduct = async(req, res, next) => {
    let result
    const {productId} = req.params
    try {
        if(!productId) throw new Error("Product not found, or deleted")
        result = await Product.findByIdAndUpdate(
            productId, 
            {isDeleted: true}, 
            {new: true}
        )
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, null, false, "Successfully delete product"
    )
}

productController.getSingleProduct = async(req, res, next) => {
    let result
    const {productId} = req.params
    try {
        if(!productId) throw new Error("Product not found, or deleted")
        result = await Product.findByIdAndUpdate(productId)
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, result, false, "Successfully get single product"
    )
}
module.exports = productController
