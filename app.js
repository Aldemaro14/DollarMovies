const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
let Movie = require('./models/movie.model');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware parse application
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Home Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'it works',
    });
});

//Movies Route
app.get('/movies', (req, res) => {
    Movie.find({}, (err, movies) => {
        if(err){
            console.log(err);
        } else {
            res.render('movies', {
                title: 'title',
                movies: movies 
            });
        }
    });  
});

//Add Movies Route
app.get('/movies/add', (req, res) => {
    res.render('addMovie', {
        title: 'Add Movie',
    });
});

//Add Submit POST Route
app.post('/movies/add', (req, res) => {
    let movie = new Movie();
    movie.title = req.body.title;
    movie.genre = req.body.genre;
    movie.body = req.body.body;

    movie.save((err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/movies');
        }
    })
})


//Users Route
app.get('/user', (req, res) => {
    User.find({}, (err, user) => {
        if(err){
            console.log(err);
        } else {
            res.render('user', {
                title: 'Profile',
                profile: user 
            });
        }
    });  
});

//Add User Route
app.get('/user/add', (req, res) => {
    res.render('addUser', {
        title: 'Create User',
    });
});

//CreateUser Submit POST Route
app.post('/user/add', (req, res) => {
    console.log(req.body);
    console.log(req.body.firstName);
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.isAdmin = req.body.isAdmin;

    user.save((err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/user');
        }
    });
});

//Start Server
app.listen(3000, () => {
    console.log('server running on port 3000');
})