var Task = require('../models/task');

exports.getTask = function(req,res){
    Task.findById(req.params.taskId)
    .then(function(foundTask){
        res.json(foundTask)
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTask = function(req,res){
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true})
    .then(function(task){
        res.json(task);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deleteTask = function(req,res){
    Task.remove({_id: req.params.taskId})
    .then(function(){
        res.json({message: 'Deleted!'});
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;