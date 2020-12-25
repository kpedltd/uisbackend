var db = require('../models');

module.exports.Create = () =>
{
    db.faculty.create(
    {
        id: 1,
        name: "Факультет вычислительной техники"
    });

    db.faculty.create(
    {
        id: 2,
        name: "Факультет информационных технологий"
    });
}