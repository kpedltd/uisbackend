module.exports = function (sequelize, Sequelize) {

    var edu_program = sequelize.define('edu_program', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM('fulltime', 'parttime'),
            allowNull: false
        }
    }, {});

    edu_program.associate = function (models) {
        edu_program.hasMany(models.group, { foreignKey: 'groupId' });
    };

    return edu_program;
};