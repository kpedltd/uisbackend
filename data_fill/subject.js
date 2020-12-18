var db = require('../models');

module.exports.CreateSubject = () =>
{
    db.subject.create(
    {
        name: "Программирование на C",
        lecturerId: "1",
        certification: "exam"
    });

    db.subject.create(
    {
        name: "Информационная безопасность",
        lecturerId: "1",
        certification: "record"
    });

    db.subject.create(
    {
        name: "Конструирование ПО",
        lecturerId: "2",
        certification: "exam"
    });

    db.subject.create(
    {
        name: "Базы данных",
        lecturerId: "3",
        certification: "exam"
    });

    db.subject.create(
    {
        name: "Программирование сетей",
        lecturerId: "4",
        certification: "record"
    });

    db.subject.create(
    {
        name: "Архитектура ЭВМ",
        lecturerId: "5",
        certification: "exam"
    });
}
