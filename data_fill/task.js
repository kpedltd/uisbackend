var db = require('../models');

module.exports.CreateTasks= () => 
{
    db.task.create(
    {
        description: "Спроектировать базу данных",
        begin: new Date(2020, 9, 1),
        deadline: new Date(2020, 12, 20),
        subjectId: 1,
        groupId: 1,
    });

    db.task.create(
    {
        description: "Решить дифференциальное уравнение",
        begin: new Date(2020, 9, 12),
        deadline: new Date(2020, 11, 29),
        subjectId: 3,
        groupId: 2,
    });
}