const __ = require('../helpers/Response');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//models
const User = require('../models/users');

class Auth {
    async authMiddleware(req, res, next) {
        try {
            let token = req.headers['authtoken'];
            if (!token || token === 'null') {
                return __.sessionExpired(res);
            }
            let temp = jwt.verify(token, process.env.randomKey);
            let user = await User.findOne({ _id: temp._id, last_seen: temp.lastLoggedIn });
            if (!user) {
                return __.sessionExpired(res);
            }
            req.user = user;
            next();
        } catch (err) {
            __.errorInternal(err, res);
        }
    }
}

Auth = new Auth();
module.exports = Auth;