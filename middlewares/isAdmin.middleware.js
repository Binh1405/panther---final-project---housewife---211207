const isAdmin = (req, res, next) => {
    try {
            if (req.currentUser.role!=="admin") throw new Error("You are not allowed to do this action.")
            next()
            }catch(error){
                next(error)
    }
}

module.exports = isAdmin