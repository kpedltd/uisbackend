var db = require('../models');

module.exports.Create = () =>
{
    db.group.create(
    {
        name: "17ВП1",
        eduProgramId: 1
    });

    db.group.create(
    {
        name: "17ВМ1",
        eduProgramId: 2
    });

    db.group.create(
    {
        name: "17ВТ1",
        eduProgramId: 3
    });
}