const User = require("../models/User")

const userController = {}

userController.getAll = async(req, res) => {
    const result = await User.find()
    res.send({result})}

userController.createByEmail = async(req, res, next) => {
    const {name, email, password} = req.body
    if(!name||!email||!password){
        const error = new Error("missing input")
        return next(error)
    }
    const found = await User.findOne({email})
    if(found){
        const error = new Error ('email already register');
        return next(error)
    }

    const result = await User.create({name,email, password});
    res.send("create by email")}

userController.updateById = (req, res) => {res.send("find by id and update")}
userController.deleteById = (req, res) => {res.send ("delete by id")}

module.exports = userController