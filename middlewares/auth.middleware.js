const jwt = require("jsonwebtoken")
const User = require("../models/User")
const JWT_MY_SECRET = process.env.JWT_MY_SECRET

const authenticationMiddleware =async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization
        console.logI("headerToken", headerToken)
        const token = headerToken.split(" ")[1]
        const decrypted = jwt.verify(token, JWT_MY_SECRET)
        const user = await User.findById(decrypted)
        req.currentUser = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authenticationMiddleware