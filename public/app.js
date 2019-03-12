/* global $ */
/* global Chart */
$(document).ready(function(){
    $('#newTaskButton').click(function(){
        $('#newTaskForm').toggle();
    });
});


function renderTasksDoughnut(completedTasks, incompleteTasks){
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
            title: {
                text : "Tasks complete vs incomplete",
                display : true,
                fontColor: "white"
            },
            legend: {
                labels: {
                    fontColor: "white"
                }
            },
            responsive: true
            
        }
    };
    var myDonut = new Chart(ctx, config);
};

function renderPointsPie(totalPoints, availablePoints){
    var ctx = document.getElementById('tasksPieChart').getContext('2d');
    var config = {
        type: "pie",
        data: {
            datasets: [{
                data: [
                    totalPoints, 
                    availablePoints
                    ],
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD"
                    ],
            }],
            labels: [
                "Points Achieved",
                "Missing Points",
            ]
        },
        options: {
            title: {
                text : "Points obtained vs Points missed",
                display : true,
                fontColor: "white"
            },
            legend: {
                labels: {
                    fontColor: "white"
                }
            },            
            responsive: true
        }
    };
    var myPie = new Chart(ctx, config);
}

function renderTasksBar(low, med, high){
    var ctx = document.getElementById('tasksBarChart').getContext('2d');
    var config = {
        type: "bar",
        data: {
            datasets: [{
                label:"Number of Tasks",
                data: [
                    low, 
                    med,
                    high
                    ],
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#6dc066"
                    ],
            }],
            labels: [
                "Low",
                "Medium",
                "High"
            ]
        },
        options: {
            title: {
                text : "Distribution of tasks by importance",
                display : true,
                fontColor: "white"
            },
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: {
                        maxRotation: 90,
                        minRotation: 80,
                        fontColor: "white"
                    }
                }],
                 yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white"
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: "white"
                }
            }
        }
    }
    var myBar = new Chart(ctx, config);
}