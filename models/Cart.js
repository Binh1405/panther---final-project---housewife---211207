const mongoose = require('mongoose')
const {Schema} = mongoose

const cartSchema = Schema({
    owner: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    status: {type: String, enum:["active", "paid"], default: "active"},
    products: [{productId: {type: Schema.Types.ObjectId, required: true, ref: "Product"}, quantity: {type: Number, required: true}}]
})

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart

