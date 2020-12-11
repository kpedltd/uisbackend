module.exports = function (sequelize, Sequelize) {

    var subject = sequelize.define('subject', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        lecturerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        certification: {
            type: Sequelize.ENUM('exam', 'record', 'coursework'),
            allowNull: false
        }
    }, {});

    subject.associate = function (models) {
        subject.belongsTo(models.lecturer, { foreignKey: 'lecturerId' });
        subject.hasMany(models.rating_log, { foreignKey: 'subjectId' });
        subject.hasMany(models.schedule, { foreignKey: 'subjectId' });
        subject.hasMany(models.task, { foreignKey: 'subjectId' });
    };

    return subject;
};