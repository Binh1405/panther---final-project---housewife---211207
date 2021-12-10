const jwt = require("jsonwebtoken")
const User = require("../models/User")
const JWT_MY_SECRET = process.env.JWT_MY_SECRET

const authenticationMiddleware =async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization
        if(!headerToken) throw new Error("missing accessToken in req header")
        const token = headerToken.split(" ")[1]
        // console.log("token", token)
        const decrypted = jwt.verify(token, JWT_MY_SECRET)
        const user = await User.findById(decrypted)
        req.currentUser = user
        console.log("currentUser", req.currentUser)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authenticationMiddleware