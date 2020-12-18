var db = require('../models');

module.exports.CreateLecturer = () =>
{
    db.lecturer.create(
    {
        firstName: "Ксения",
        lastName: "Аксенова",
        patronymic: "Борисовна",
        dateOfBirth: new Date(1955, 9, 31),
        photo: null,
        biography: "Родилась в Пензе",
        departmentId: "1",
        login: "aksenova_ksenia",
        en_password: "doigjohjaerohah"
    });

    db.lecturer.create(
    {
        firstName: "Дмитрий",
        lastName: "Александров",
        patronymic: "Даниилович",
        dateOfBirth: new Date(1964, 11, 3),
        photo: null,
        biography: "Родился в Москве",
        departmentId: "1",
        login: "aleksandrov_dmitriy",
        en_password: "jhgdksgftksrtsr"
    });

    db.lecturer.create(
    {
        firstName: "Роман",
        lastName: "Васильев",
        patronymic: "Ярославович",
        dateOfBirth: new Date(1977, 5, 12),
        photo: null,
        biography: "Родился в Пензе",
        departmentId: "1",
        login: "vas_roman",
        en_password: "32463oi6jlksfgd"
    });

    db.lecturer.create(
    {
        firstName: "Анна",
        lastName: "Захарова",
        patronymic: "Данииловна",
        dateOfBirth: new Date(1980, 8, 17),
        photo: null,
        biography: "Родилась в Пензе",
        departmentId: "2",
        login: "zaharova_anna",
        en_password: "!Rjksdbhgk2378"
    });

    db.lecturer.create(
    {
        firstName: "Григорий",
        lastName: "Минин",
        patronymic: "Фёдорович",
        dateOfBirth: new Date(1967, 1, 26),
        photo: null,
        biography: "Родился в Пензе",
        departmentId: "2",
        login: "minin_grisha",
        en_password: "dkjfhn@@#"
    });
}