var db = require('../models');

module.exports.CreateFaculty = () =>
{
    db.faculty.create(
    {
        id: 1,
        name: "Факультет вычислительной техники",
        headId: 1
    });

    db.faculty.create(
    {
        id: 2,
        name: "Факультет информационных технологий",
        headId: 4
    });
}