var bCrypt = require('bcrypt');

module.exports = function (sequelize, Sequelize) {

    var student = sequelize.define('student', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        patronymic: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        dateOfBirth: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            notEmpty: true
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        departmentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        groupId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

    }, {
        setterMethods: {
            password: function (value) {
                this.setDataValue('en_password', bCrypt.hashSync(value, bCrypt.genSaltSync(8)));
            }
        }
    });

    student.prototype.PassIsEquals = function (password) {
        return bCrypt.compareSync(password, this.password);
    };

    // user.associate = function (models) {
    //     user.hasMany(models.article, { foreignKey: 'userId' })
    // };
    return student;
};