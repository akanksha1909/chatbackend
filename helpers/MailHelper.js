const __ = require('./Response');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'akkuakankshaakku@gmail.com', // generated ethereal user
        pass: 'chqghthqdahesnjc'  // generated ethereal password
    }
});
class MailHelper {

    sendEmail(to, from) {
        let mailOptions = {
            from: from,
            to: to,
            subject: 'Welcome To I Get Happy '
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            }
            return true;
        });
    }
}

MailHelper = new MailHelper();
module.exports = MailHelper;