require('dotenv').config();
const _ = require('lodash');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const __ = require('../helpers/Response');
const userModel = require('../models/users.js');


class User {
    // SignUp
    async signUp(req, res) {
        try {
            let user = await userModel.findOne({ '$or': [{ 'email': req.body.email }, { 'phone': req.body.phone }] }).exec();
            if (!user) {
                let hashPassword = new userModel().generateHash(req.body.password);
                let temp = {
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    password: hashPassword
                }
                let userNew = await userModel.create(temp);
                let tempNew = {
                    _id: userNew._id,
                    lastLoggedIn: userNew.last_seen
                }
                //generating token
                let token = jwt.sign(tempNew, process.env.randomKey);
                let final = {
                    _id: userNew._id,
                    token: token
                }
                __.success(res, final, 'User created');
            }
            else {
                __.dataExists(res, 'User already exists');
            }
        } catch (error) {
            __.errorInternal(res, error);
        }
    }
    // Login
    async login(req, res) {
        try {
            let user = await userModel.findOne({ '$or': [{ 'email': req.body.username }, { 'phone': req.body.username }] }).exec();
            if (!user) {
                __.notFound(res, 'User not Found');
            }
            else {
                let verifyPassword = await user.verifyPassword(req.body.password);
                if (!verifyPassword)
                    return __.notAuthorized(res, 'Wrong Password');
                user.last_seen = new Date();
                let userNew = await user.save();
                let tempNew = {
                    _id: userNew._id,
                    lastLoggedIn: userNew.last_seen
                }
                //generating token
                let token = jwt.sign(tempNew, process.env.randomKey);
                let final = {
                    _id: userNew._id,
                    token: token
                }
                __.success(res, final, 'Successfuly Login');
            }
        } catch (error) {
            __.errorInternal(res, error);
        }
    }

}
user = new User();
module.exports = user;