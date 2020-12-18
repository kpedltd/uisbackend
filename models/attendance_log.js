module.exports = function (sequelize, Sequelize) {

    var attendance_log = sequelize.define('attendance_log', {
        state: {
            type: Sequelize.ENUM('visited', 'skiped'),
            allowNull: false,
            notEmpty: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        scheduleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        }
    }, {
        timestamps: false
    });

    attendance_log.associate = function (models) {
        attendance_log.belongsTo(models.schedule, { foreignKey: 'scheduleId' });
        attendance_log.belongsTo(models.student, { foreignKey: 'studentId' });
    };

    attendance_log.removeAttribute("id");

    return attendance_log;
};