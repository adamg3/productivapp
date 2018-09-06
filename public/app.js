/* global $ */
/* global Chart */
$(document).ready(function(){
    $('#newTaskButton').click(function(){
        $('#newTaskForm').toggle();
    });
});


function renderDoughnut(completedTasks, incompleteTasks){
    var ctx = document.getElementById('tasksDonutChart').getContext('2d');
    var config = {
        type: "doughnut",
        data: {
            datasets: [{
                data: [
                    completedTasks,
                    incompleteTasks
                    ],
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD"
                    ],
            }],
            labels: [
                "Complete Tasks",
                "Incomplete Tasks"
            ]
        },
        options: {
            responsive: true
        }
    };
    var myDonut = new Chart(ctx, config);
};
