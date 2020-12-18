var db = require('../models');

module.exports.CreateGroup = () =>
{
    db.group.create(
    {
        name: "17ВП1",
        curatorId: 2,
        eduProgramId: 1
    });

    db.group.create(
    {
        name: "17ВМ1",
        curatorId: 3,
        eduProgramId: 2
    });

    db.group.create(
    {
        name: "17ВТ1",
        curatorId: 5,
        eduProgramId: 3
    });
}