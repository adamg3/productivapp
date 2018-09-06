var express = require("express");
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Task = require('../models/task');
var middleware = require('../middleware')

//Home
router.get('/', function(req,res){
  res.render('landing');  
})

//===========
//Auth routes
//===========

//show register form
router.get('/register', function(req, res){
    res.render('register', {page: 'register'});
});

//handle signup logic
router.post('/register', function(req,res){
    var newUser = new User({username: req.body.username});
    console.log(newUser);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register', {error : err.message});
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to producTIV ' + user.username);
            res.redirect('/tasks'); 
        });
    });
});
// })


//show login form
router.get('/login', function(req,res){
    res.render('login', {page: 'login'});
});


//login logic

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/tasks',
        failureRedirect: '/login'
    }), function(req,res){
});

//logout route
router.get('/logout', function(req,res){
    req.logout();
    req.flash('success', 'Succesfully Logged Out!')
    res.redirect('/');
});


//show profile page
router.get('/profile', middleware.isLoggedIn, function(req,res){
    Task.find({createdUsername : req.user.username}, function(err, allTasks){
    if(err) {
        res.redirect('/landing')
    } else {
        res.render('profile', {page: 'profile', tasks : allTasks});
    };
});
});

module.exports = router;