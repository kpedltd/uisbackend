var db = require('../models');

module.exports.CreateTaskResults = () =>
{
    db.task_result.create(
    {
        grade: 5,
        studentId: 1,
        taskId: 1
    });
    db.task_result.create(
    {
        grade: 3,
        studentId: 2,
        taskId: 1
    });
    db.task_result.create(
    {
        grade: 4,
        studentId: 3,
        taskId: 1
    });
    db.task_result.create(
    {
        grade: 5,
        studentId: 4,
        taskId: 1
    });
    db.task_result.create(
    {
        grade: 5,
        studentId: 5,
        taskId: 1
    });
    db.task_result.create(
    {
        grade: 5,
        studentId: 6,
        taskId: 1
    });
    db.task_result.create(
    {
        grade: 4,
        studentId: 33,
        taskId: 2
    });
    db.task_result.create(
    {
        grade: 4,
        studentId: 34,
        taskId: 2
    });
    db.task_result.create(
    {
        grade: 5,
        studentId: 35,
        taskId: 2
    });
    db.task_result.create(
    {
        grade: 4,
        studentId: 36,
        taskId: 2
    });
    db.task_result.create(
    {
        grade: 3,
        studentId: 37,
        taskId: 2
    });
}