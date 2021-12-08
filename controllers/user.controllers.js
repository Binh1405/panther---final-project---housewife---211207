const sendResponse = require("../helpers/sendResponse")
const bcrypt = require("bcrypt")
const User = require("../models/User")
// const catchAsync = require("../helpers/catchAsync")
const SALT_ROUND = parseInt(process.env.SALT_ROUND)

const userController = {}

userController.getAll = async(req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const result = await User.find({isDeleted: false}).sort({createdAt: -1}).limit(limit).skip(limit*(page-1))
    return sendResponse(res, 200, true, result, false, "successfully get all users")}

userController.createByEmail = async(req, res, next) => {
    const {name, email} = req.body
    let {password} = req.body
    let result;
    try {
    if(!name||!email||!password) throw new Error("missing input")
    const found = await User.findOne({email})
    if(found) throw new Error ('email already register'); 
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
        const user = await User.findOne({email, isDeleted: false})
        if(!user) throw new Error("User with email is not found.")
        let isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            result = await user.generateToken()
            console.log("result", result)
        }else{
            throw new Error("Password not match")
        }
    } catch (error) {
        return sendResponse(res, 420, false, result, true, error.message)
    }
    return sendResponse(res, 200, true, result, false, "Successfully login user")
}

userController.updateById = async (req, res, next) => {
    let result
    const allowOptions = ["name", "email"]
    const updateObject = {}
    try {
        allowOptions.forEach((option) => {
            if(req.body[option]!==undefined){
                updateObject[option] = req.body[option]
            }
        })
        result = await User.findByIdAndUpdate(req.currentUser._id, updateObject, {
            new: true
        })
    } catch (error) {
        return next(error)
    }
    return sendResponse(
        res, 200, true, result, false, "Successfully update info"
    )
}

userController.deleteById = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.currentUser._id, {isDeleted: true})
    } catch (error) {
        next(error)
    }
    return res.sendResponse(
        res, 200, true, null, false, "Successfully delete info"
    )
}

module.exports = userController