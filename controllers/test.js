var express = require('express');
var router = express.Router();
var models = require('../models');

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

router.get('/insert', (req, res) => {
    edu_program.CreateEducationProgram();
    faculty.CreateFaculty();
    department.CreateDepartment();
    lecturer.CreateLecturer();
    group.CreateGroup();
    subject.CreateSubject();
    student_data.CreateStudent();
    metrics_data.CreateStudentMetrics();
    schedule.CreateSchedule();
    rating_log.CreateRatingLog();
    tasks.CreateTasks();
    task_result.CreateTaskResults();
    atten_log.CreateAttendanceLog();
    
    res.json({
        success: true
    });
});

module.exports = router;