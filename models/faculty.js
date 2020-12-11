module.exports = function (sequelize, Sequelize) {

    var faculty = sequelize.define('faculty', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        headId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        }
    }, {});

    faculty.associate = function (models) {
        faculty.hasMany(models.department, { foreignKey: 'departmentId' });
        faculty.hasOne(models.lecturer, { foreignKey: 'headId' });
    };

    return faculty;
};