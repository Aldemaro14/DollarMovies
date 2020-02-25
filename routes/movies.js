const express = require('express');
const router = express.Router();
let Movie = require('../models/movie.model');

//Movies Route
router.get('/', (req, res) => {
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
router.get('/add', (req, res) => {
    res.render('addMovie', {
        title: 'Add Movie',
    });
});

//Add Submit POST Route
router.post('/add', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();

    //Get errors
    let errors = req.validationErrors();
    if(errors){
        res.render('addMovie',  {
            title: 'Add Movie',
            errors:errors
        });
    } else {
        let movie = new Movie();
        movie.title = req.body.title;
        movie.genre = req.body.genre;
        movie.body = req.body.body;

        movie.save((err) => {
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'Movie Added');
                res.redirect('/movies');
            }
        });
    }
});

//Update movie load route
router.get('/edit/:id', (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        console.log(movie);
        console.log(req.params.id);
        res.render('editMovie', {
            title: "Edit Movie",
            movie: movie
        });
    });
});

//Add update POST Route
router.post('/edit/:id', (req, res) => {
    let movie = {};
    movie.title = req.body.title;
    movie.genre = req.body.genre;
    movie.body = req.body.body;

    let query = {_id:req.params.id}

    Movie.update(query, movie, (err) => {
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('sucess', 'Movie Updated');
            res.redirect('/movies');
        }
    });
});

//delete movie route
router.delete('/:id', (req, res) => {
    let query = {_id:req.params.id}

    Movie.remove(query, (err)=> {
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

//Get single movie
router.get('/:id', (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        res.render('movie', {
            movie: movie
        });
    });
});

module.exports = router;