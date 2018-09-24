const express = require('express');
const userRouter = express.Router();

const validator = require('../helpers/Validator.js');

const userController = require('../controllers/userController.js');

// Router function to create or edit expenses
userRouter.post('/login', function (req, res) {
    console.log('*****************');
    console.log(req.body);
    userController.login(req, res);
});

// Router function to search for an expense by title,tags or notes
userRouter.post('/signUp', (req, res, next) => {
    validator.Validate(req, res, next, ['name', 'email', 'phone', 'password'])
}, function (req, res) {
    userController.signUp(req, res);
});


module.exports = userRouter;