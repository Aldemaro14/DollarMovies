const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//const flash = require('connect-flash');
const session = require('express-session');

//connect to database
mongoose.connect('mongodb+srv://super2:Password.123@cluster0-l4pwh.gcp.mongodb.net/test?retryWrites=true&w=majority', 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
let db = mongoose.connection;

//Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
})

//Check for DB errors
db.on('error', (err) => {
    console.log(err);
})

//Init App
const app = express();

//Bring the models
let User = require('./models/user.model');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware parse application
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        }
    }
}));

//Home Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'it works',
    });
});

//Route files
let movies = require('./routes/movies');
let users = require('./routes/users')
app.use('/movies', movies);
app.use('/users', users);


//Start Server
app.listen(3000, () => {
    console.log('server running on port 3000');
})