module.exports = function (sequelize, Sequelize) {

    var schedule = sequelize.define('schedule', {
        dayOfWeek: {
            type: Sequelize.ENUM('Friday', 'Monday', 'Saturday', 'Sunday', 'Thursday', 'Tuesday', 'Wednesday'),
            allowNull: false,
            notEmpty: true
        },
        time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        semester: {
            type: Sequelize.ENUM('spring', 'autumn'),
            allowNull: false
        },
        subjectId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        groupId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }, {});

    schedule.associate = function (models) {
        schedule.belongsTo(models.subject, { foreignKey: 'subjectId' });
        schedule.belongsTo(models.group, { foreignKey: 'groupId' });

        schedule.hasMany(models.attendance_log, { foreignKey: 'scheduleId' });
    };

    return schedule;
};