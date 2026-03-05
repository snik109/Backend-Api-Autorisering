const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET;

function authToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

function authRole (...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.sendStatus(403)
        }
        next()
    };
}

module.exports = {authToken, authRole}