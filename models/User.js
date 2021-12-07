const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = Schema(
    {
        name: {type: String, required: true}, 
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["guest", "member", "admin"], default: "guest"},
        cart: _id,
        isDeleted: {type: Boolean, default: false}, 
    }, 
    {
        timeStamps: true,
    }
)

const cartSchema = Schema(
    {
        _id,
        owner: userId, 
        products: []
    },
    {
        timeStamps: true,
    } 
)

userSchema.methods.generateToken = async function(){
    const accessToken = await jwt.sign({_id: this._id}, "+2", {expiresIn: "1d"})
}

const User = mongoose.model("User", userSchema)
module.exports=User