const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

const Users = new Schema({

    name: String,
    pic: String,
    email: String,
    phone: Number,
    password: String,
    last_seen: { type: Date, default: Date.now() },
    record_status: { type: String, enum: ['active', 'inactive', 'deleted'], default: "active" }

}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

Users.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Users.methods.verifyPassword = function (password) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('users', Users);