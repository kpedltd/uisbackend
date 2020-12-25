module.exports = function (sequelize, Sequelize) {
    var department = sequelize.define('department', {
        name: {
            type: Sequelize.STRING(256),
            allowNull: false,
            notEmpty: true
        },
        facultyId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        }
    }, {});

    department.associate = function (models) {
        department.belongsTo(models.faculty, { foreignKey: 'facultyId' });
        department.hasMany(models.lecturer, { foreignKey: 'departmentId' });
        department.hasMany(models.student, { foreignKey: 'departmentId' });

        department.hasOne(models.lecturer, { foreignKey: 'headId' });
    };

    return department;
};