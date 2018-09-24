//Include packages
const express = require("express"), //Express app library
    mongoose = require("mongoose"), //Database layer for mongodb
    path = require('path'),
    bodyParser = require("body-parser"), //Body parser for parse input parameters in request
    cors = require("cors"),

    requestIp = require('request-ip');




//Enable query logger for development
mongoose.set('debug', true);


//Initializing the express framework
app = express();



app.use(cors());
app.use(requestIp.mw());
app.options('*', cors());



//Connect to mongoDB using mongoose package
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/chatapplication', { useNewUrlParser: true });

//Initialize plugins
app.use(bodyParser.json({ limit: '50mb' })); // support json encoded bodies
//app.use(expressValidator());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 100000 })); // support encoded bodies

//For letsEncrypt SSL verification
app.use('/.well-known', express.static('.well-known'));

app.use('/static', express.static('static'))

const http = require('http').Server(app);
const io = require('socket.io')(http);


// access socketio everywhere inside routes and controllers (req.app.get('socketio'))
app.set('socketio', io);

const UserRoutes = require('./routes/users');
app.use('/user/', UserRoutes);




//Start the server
http.listen(process.env.PORT || 5000, function () {
    console.log("Server is running on Port " + (process.env.PORT || 5000));
});

