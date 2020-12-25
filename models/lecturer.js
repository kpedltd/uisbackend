//var bCrypt = require('bcrypt');

module.exports = function (sequelize, Sequelize) {

    var lecturer = sequelize.define('lecturer', {
        firstName: {
            type: Sequelize.STRING(256),
            allowNull: false,
            notEmpty: true
        },
        lastName: {
            type: Sequelize.STRING(256),
            allowNull: false,
            notEmpty: true
        },
        patronymic: {
            type: Sequelize.STRING(256),
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
        biography: {
            type: Sequelize.STRING,
            allowNull: true
        },
        departmentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey : true
        },
        headId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            foreignKey : true
        },
        curatorId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            foreignKey : true
        },
        deanId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            foreignKey : true
        },
        login: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        en_password: {
            type: Sequelize.STRING(128),
            allowNull: false
        }
    }, {
        setterMethods: {
            password: function (value) {
                this.en_password = value;
                this.setDataValue('en_password', bCrypt.hashSync(value, bCrypt.genSaltSync(8)));
            }
        }
    });

    lecturer.prototype.PassIsEquals = function (password) {
        //return bCrypt.compareSync(password, this.en_password);
        return password == this.en_password;
    };

    lecturer.associate = function (models) {
        lecturer.hasMany(models.subject, { foreignKey: 'lecturerId' });
        lecturer.belongsTo(models.department, { foreignKey: 'departmentId' });
    };

    return lecturer;
};