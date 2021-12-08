const sendResponse = require("../helpers/sendResponse")
const bcrypt = require("bcrypt")
const User = require("../models/User")
// const catchAsync = require("../helpers/catchAsync")
const jwt = require("jsonwebtoken")
const JWT_MY_SECRET = process.env.JWT_MY_SECRET
const SALT_ROUND = process.env.SALT_ROUND

const userController = {}

userController.getAll = async(req, res) => {
    const result = await User.find()
    return sendResponse(res, 200, true, result, false, "successfully get all users")}

userController.createByEmail = async(req, res, next) => {
    const {name, email} = req.body
    let {password} = req.body
    
    let result;
    try {
    if(!name||!email||!password) throw new Error("missing input")
    const found = await User.findOne({email})
    if(found)throw new Error ('email already register'); 
    const salt = await bcrypt.genSalt(SALT_ROUND)
    password = await bcrypt.hash(password, salt)
    result = await User.create({name, email, password});
    } catch (error) {
    return sendResponse(res, 420, false, result, false, error.message)
    }
return sendResponse(res, 200, true, result, false, "successfully register")}

userController.loginWithEmailPassword = async(req, res, next) => {
    const {email, password} = req.body;
    let result;
    try {
        if(!email||!password) throw new Error("Please input email and password.")
        const user = await User.findOne({email})
        if(!user) throw new Error("User with email is not found.")
        let isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            result = await user.generateToken()
        }else{
            throw new Error("Password not match")
        }
    } catch (error) {
        return sendResponse(res, 420, false, result, true, error.message)
    }
    return sendResponse(res, 200, true, result, false, "Successfully login user")
}

userController.updateById = (req, res) => {res.send("find by id and update")}
userController.deleteById = (req, res) => {res.send ("delete by id")}

userController.importantController = async(req, res, next) => {
    
    try{
       
    }catch(error){
        next(error)
    }
    return res.send("Delete everything")
} 

module.exports = userController