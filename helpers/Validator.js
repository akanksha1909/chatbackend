const __ = require('./Response');

class Validator {
    Validate(req, res, next, arrayOfStrings) {
        req.error = '';
        console.log(req.body);
        arrayOfStrings.map((v, i) => {
            if (req.body[v] === null || req.body[v] === undefined || req.body[v] === '') {
                req.error = "Bad Values";
                console.log('Param missing => ' + v);
            }
        })
        if (req.error) {
            __.badValues(res);
        } else {
            next();
        }
    }
    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validatePhone(phone) {
        let re = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/g;
        return re.test(phone);
    }
}

Validator = new Validator();
module.exports = Validator;