module.exports = function (sequelize, Sequelize) {

    var task_result = sequelize.define('task_result', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
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
        }
    }, {});

    task_result.associate = function (models) {
        task_result.belongsTo(models.student, { foreignKey: 'studentId' });
        task_result.belongsTo(models.student, { foreignKey: 'taskId' });
    };

    task_result.removeAttribute("id");

    return task_result;
};