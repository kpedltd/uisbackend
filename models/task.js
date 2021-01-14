module.exports = function (sequelize, Sequelize) {

    var task = sequelize.define('task', {
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        test: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        begin: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        deadline: {
            type: Sequelize.DATEONLY,
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

    task.associate = function (models) {
        task.hasMany(models.task_result, { foreignKey: 'taskId' });

        task.belongsTo(models.subject, { foreignKey: 'subjectId' });
        task.belongsTo(models.group, { foreignKey: 'groupId' });
    };

    return task;
};