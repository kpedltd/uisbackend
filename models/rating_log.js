module.exports = function (sequelize, Sequelize) {
    var rating_log = sequelize.define('rating_log', {
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        subjectId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        grade: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    rating_log.associate = function(models) {
        rating_log.belongsTo(models.student, { foreignKey: 'studentId' });  
        rating_log.belongsTo(models.subject, { foreignKey: 'subjectId' });
    };

    rating_log.removeAttribute("id");

    return rating_log;
};