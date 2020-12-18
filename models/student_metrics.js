module.exports = function (sequelize, Sequelize) {
    var student_metrics = sequelize.define('student_metrics', {
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            notEmpty: true
        },
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        }
    }, {
        timestamps: false
    });

    student_metrics.associate = function(models) {
        student_metrics.belongsTo(models.student, {foreignKey : 'studentId'});  
    };

    student_metrics.removeAttribute("id");

    return student_metrics;
};