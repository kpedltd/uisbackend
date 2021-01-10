//var bCrypt = require('bcrypt');

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
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        en_password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        setterMethods: {
            password: function (value) {
                this.en_password = value;
                //this.setDataValue('en_password', bCrypt.hashSync(value, bCrypt.genSaltSync(8)));
            }
        }
    });

    student.prototype.PassIsEquals = function (password) {
        return password == this.en_password;
       //return bCrypt.compareSync(password, this.en_password);
    };

    student.associate = function (models) {
        student.hasMany(models.student_metrics, { foreignKey: 'studentId' });
        student.hasMany(models.rating_log, { foreignKey: 'studentId' });
        student.hasMany(models.attendance_log, { foreignKey: 'studentId' });
        student.hasMany(models.task_result, { foreignKey: 'studentId' });

        student.belongsTo(models.department, { foreignKey: 'departmentId' });
        student.belongsTo(models.group, { foreignKey: 'groupId' });
    };

    return student;
};