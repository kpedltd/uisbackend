var db = require('../models');

module.exports.Create = () => 
{
    db.edu_program.create(
    {
        name: "Программная инженерия",
        code: "09.04.03",
        type: "fulltime"
    });

    db.edu_program.create(
    {
        name: "Математика",
        code: "01.03.01",
        type: "fulltime"
    });

    db.edu_program.create(
    {
        name: "Информатика и вычислительная техника",
        code: "09.03.01",
        type: "parttime"
    });
}











