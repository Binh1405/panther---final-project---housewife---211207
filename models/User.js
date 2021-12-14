const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const JWT_MY_SECRET = process.env.JWT_MY_SECRET

const userSchema = Schema(
    {
        name: {type: String, required: true}, 
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["guest", "member", "admin"], default: "guest"},
        isDeleted: {type: Boolean, default: false}, 
        currentBalance: {type: Number, default: 0}
    }, 
    {
        timestamps: true,
    }
)

userSchema.methods.generateToken = async function(){
    const accessToken = await jwt.sign({_id: this._id}, JWT_MY_SECRET, {expiresIn: "7d"})
    return accessToken
}

const User = mongoose.model("User", userSchema)
module.exports=User