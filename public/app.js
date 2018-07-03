/* global $ */
$(document).ready(function(){
    $('#newTaskButton').click(function(){
        $('#newTaskForm').toggle();
    });
    
});


// function removeTask(task){
//     var clickedId = task.data('id');
//     var deleteUrl = '/tasks/' + clickedId;
//     $.ajax({
//         method: 'DELETE',
//         url: deleteUrl
//     })
//     .then(function(data){
//         task.remove();
//     })
//     .catch(function(err){
//         console.log(err);
//     })
// }

// function updatetask(task){
//     var updateUrl = '/tasks/' + task.data('id');
//     var isDone = !task.data('completed');
//     var updateData = {completed: isDone}
//     $.ajax({
//       method: 'PUT',
//       url: updateUrl,
//       data: updateData
//     })
//     .then(function(updatedTask){
//         task.toggleClass("done");
//         task.data('completed', isDone)
//     })
// }