var db = require('../models');

module.exports.Create = () =>
{
    db.task_result.create(
    {
        grade: 5,
        studentId: 22,
        taskId: 1
    });
    db.task_result.create(
    {
        grade: 3,
        studentId: 2,
        taskId: 1,
        comment: "Неверно выполнено задание"
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
        studentId: 1,
        taskId: 2
    });
    db.task_result.create(
    {
        grade: 4,
        studentId: 2,
        taskId: 2
    });
    db.task_result.create(
    {
        grade: 5,
        studentId: 3,
        taskId: 2
    });
    db.task_result.create(
    {
        grade: 4,
        studentId: 4,
        taskId: 2
    });
    db.task_result.create(
    {
        grade: 3,
        studentId: 5,
        taskId: 2
    });
}