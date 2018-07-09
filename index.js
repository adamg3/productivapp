var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Task = require('./models/task'),
    passport = require('passport'),
    LocalStrategy = require('passport-local')

var methodOverride = require("method-override");
var flash = require("connect-flash");
var taskRoutes = require('./routes/tasks');
var userRoutes = require('./routes/users');
var indexRoutes = require('./routes/index');


//connecting database
var url = process.env.DATABASEURL || 'mongodb://localhost:27017/producTIV';
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(url)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(flash());

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

//Passport configuration

app.use(require("express-session")({
    secret: "This is the secret",
    resave: false,
    saveUninitialized: false
}));

//User authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//routes to use
app.use(indexRoutes);
app.use('/tasks', taskRoutes);

//port check
app.listen(port, function(){
    console.log('producTIV running on' + process.env.PORT);
})