var db = require('../models');

module.exports.CreateDepartment = () =>
{
    db.department.create(
    {
        id: 1,
        name: "Математическое обеспечение и применение ЭВМ",
        facultyId: 1,
        headId: 2
    }).then((result) => {}).catch((err) => {
        console.log(err.message);
    });

    db.department.create(
    {
        id: 2,
        name: "Информационное обеспечение управления и производства",
        facultyId: 2,
        headId: 5
    }).then((result) => {}).catch((err) => {
        console.log(err.message);
    });
}