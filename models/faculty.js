module.exports = function (sequelize, Sequelize) {

    var faculty = sequelize.define('faculty', {
        name: {
            type: Sequelize.STRING(256),
            allowNull: false,
            notEmpty: true
        }
    }, {});

    faculty.associate = function (models) {
        faculty.hasMany(models.department, { foreignKey: 'departmentId' });
        faculty.hasOne(models.lecturer, { foreignKey: 'deanId' });
    };

    return faculty;
};