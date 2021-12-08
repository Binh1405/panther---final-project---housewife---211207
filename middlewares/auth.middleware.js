const jwt = require("jsonwebtoken")
const JWT_MY_SECRET = process.env.JWT_MY_SECRET

const authenticationMiddleware = (req, res, next) => {
    try {
        const headerToken = req.headers.authorization
        const token = headerToken.replace("Bearer ", "")
        jwt.verify(token, JWT_MY_SECRET, (err, payload) => {
            if(err) throw new Error(err.message)
            req.userId = payload._id
        })
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authenticationMiddleware