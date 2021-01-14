module.exports = function (sequelize, Sequelize) {

    var task_result = sequelize.define('task_result', {
        file: {
            type: Sequelize.STRING(256),
            allowNull: true
        },
        grade: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        taskId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        comment: {
            type: Sequelize.STRING(256),
            allowNull: true
        }
    }, {});

    task_result.associate = function (models) {
        task_result.belongsTo(models.student, { foreignKey: 'studentId' });
        task_result.belongsTo(models.task, { foreignKey: 'taskId' });
    };

    task_result.removeAttribute("id");

    return task_result;
};