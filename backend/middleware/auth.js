const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.authenticator = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const decodedToken = jwt.verify(token, "magical-key-for-userAuthentication");
        User.findByPk(decodedToken.userId)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err.message });
            });
    } catch (err) {
        console.log(err);
        res.status(401).json({ success: false, message: "Authentication failed" });
    }
};
