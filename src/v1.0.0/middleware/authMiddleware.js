const jwt = require('jsonwebtoken');
const secret_key = "secret";

function authToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401).json ({message: "No token"})

    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.sendStatus(403).json ({message: "Invalid token"})
        req.user = user
        next()
    })
}

function authRole (...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.User_Role)) {
            return res.sendStatus(403)
        }
        next()
    };
}

module.exports = {authToken, authRole}