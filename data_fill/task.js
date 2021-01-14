var db = require('../models');

module.exports.Create = () => 
{
    db.task.create(
    {
        title: "Работа с БД",
        description: "Спроектировать базу данных",
        begin: new Date(2020, 9, 1),
        deadline: new Date(2021, 12, 20),
        subjectId: 1,
        groupId: 1,
    });

    db.task.create(
    {
        title: "Обыкновенные дифф. уравнения",
        description: "Решить дифференциальное уравнение",
        begin: new Date(2020, 9, 12),
        deadline: new Date(2020, 11, 29),
        subjectId: 1,
        groupId: 1,
    });
}