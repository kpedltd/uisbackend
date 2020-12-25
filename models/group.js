module.exports = function (sequelize, Sequelize) {

    var group = sequelize.define('group', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        eduProgramId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        }
    }, {});

    group.associate = function (models) {
        group.belongsTo(models.edu_program, { foreignKey: 'eduProgramId' });

        group.hasMany(models.schedule, { foreignKey: 'groupId' });
        group.hasMany(models.student, { foreignKey: 'groupId' });
        group.hasMany(models.task, { foreignKey: 'groupId' });
        group.hasOne(models.lecturer, { foreignKey: 'curatorId' });
    };

    return group;
};