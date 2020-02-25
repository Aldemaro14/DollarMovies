const express = require('express');
const router = express.Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');

//Register process
router.post('/register', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password2 is required').notEmpty();
    req.checkBody('password', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(err){
        res.render('register', {
            errors:errors
        });
    } else {
        let newUser = new User({
            firstName : firstName,
            lastName : lastName,
            email : email,
            userName : userName,
            password : password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save((err) => {
                    if(err){
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are now registered and can now log in');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

//Register Form
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login',  (req, res) =>{
    res.render('login');
});

module.exports = router;