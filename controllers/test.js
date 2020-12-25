var express = require('express');
var router = express.Router();
var models = require('../models/index');

var department = require('../data_fill/department')
var faculty = require('../data_fill/faculty')
var group = require('../data_fill/group')
var student_data = require('../data_fill/student_data')
var metrics_data = require('../data_fill/student_metrics_data')
var schedule = require('../data_fill/schedule')
var rating_log = require('../data_fill/rating_log')
var edu_program = require('../data_fill/edu_program')
var lecturer = require('../data_fill/lecturer')
var subject = require('../data_fill/subject')
var tasks = require('../data_fill/task')
var task_result = require('../data_fill/task_result')
var atten_log = require('../data_fill/attendance_log')

var tasks_async = [
    edu_program,
    faculty,
    department,
    group,
    lecturer,
    student_data,
    metrics_data,
    subject,
    rating_log,
    schedule,
    tasks,
    task_result,
    atten_log
];

function processEachTask(task, callback) 
{
    task.Create();
}

function done(err)
{
    if(err == null)
    {
        es.json({
            success: true
        });
    }
    else
    {
        es.json({
            success: false,
            error: err.message
        });
    }
}

router.get('/insert',async (req, res) => {
    await Promise.all(tasks_async.map(async (async_task) => {
        await async_task.Create();
    }));

    res.json({
        success: true
    });
});

router.get('/drop', async (req, res) => {
    models.sequelize.sync({ force: true });

    res.json({
        success: true
    });
});

module.exports = router;