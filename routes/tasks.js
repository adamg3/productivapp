var express = require("express");
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Task = require('../models/task');
var middleware = require('../middleware')
var moment = require('moment');
var helpers = require('../helpers/tasks');



//show tasks
router.get('/', middleware.isLoggedIn, function(req,res){
    //Get all tasks from db that are made by logged in user
    var todaysDate = moment().format('DD-MM-YYYY');
    Task.find({ $and: [{createdUsername : req.user.username}, {creationDate : todaysDate}]}, function(err, allTasks){
        if(err){
            console.log(err);
        } else {
            res.render('tasks/tasks', {tasks: allTasks, page: 'tasks'});

        }
    })
});




//create tasks

router.post('/', function(req,res){
    var name = req.body.name;
    var completionDate = moment(req.body.completionDate).format('DD-MM-YYYY');
    var creationDate = moment().format('DD-MM-YYYY');
    var importance = req.body.importance;
    var createdUserID = req.user._id;
    var createdUsername = req.user.username;
    
    var newTask = {
        name: name, 
        completionDate: completionDate, 
        creationDate: creationDate, 
        importance: importance, 
        createdUserID: createdUserID,
        createdUsername: createdUsername
    }
    //create task and add to db
    Task.create(newTask, function(err, newlyCreated){
        if(err){
            res.redirect('/tasks');
            req.flash('error', 'The task is missing some information.')
        } else {
            res.redirect('/tasks');
        }
    })
})

// delete tasks
router.delete('/:id', function(req,res){
    Task.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect('/tasks')
        } else {
            res.redirect('/tasks');
            console.log('deleted');
        }
    });
});

//edit task route
router.get('/:id/edit', function(req,res){
    Task.findById(req.params.id, function(err, foundTask){
        if(err){
            req.flash('error', 'task not found');
        } else {
            res.render('tasks/edit', { task: foundTask})
        }
    });
})


//update tasks
router.put('/:id', function(req,res){
    Task.findByIdAndUpdate(req.params.id, req.body, function(err, updatedTask){
        if(err){
            res.redirect('/tasks');
        } else {
            res.redirect('/tasks');
        }
    })
})

//complete task
router.put('/:id/complete', function(req,res){
    Task.findByIdAndUpdate(req.params.id, {
        completed : true
    }, function(err){
        if(err){
            res.redirect('/tasks');
            console.log(err);
        } else {
            User.findByIdAndUpdate(req.user.id, {
                points : (User.currentPoints + Task.importance)
            }, function(err){
                if(err){
                    res.redirect('/tasks');
                    console.log(err);
                } else {
                    res.redirect('/tasks')
                };
                
            })
        }
    })
});


//uncomplete task
router.put('/:id/incomplete', function(req,res){
    Task.findByIdAndUpdate(req.params.id, {
        completed : false
    }, function(err){
        if(err){
            res.redirect('/tasks');
        } else {
            User.findByIdAndUpdate(req.user.id, {
                points : (User.currentPoints - Task.importance)
            }, function(err){
                if(err){
                    res.redirect('/tasks');
                    console.log(err);
                } else {
                    res.redirect('/tasks')
                };
                
            })
        }
    })
});
    
module.exports = router;