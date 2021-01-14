var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models');
const Sequelize = require('sequelize');
var fs = require("fs");

router.get('/new_tasks', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try {
        var solvedTasks = await db.task_result.findAll({
            where: {
                grade: 0
            },
            include: [{
                model: db.student,
                where:{
                    groupId: req.query.groupId
                },
                attributes: [
                    "id", "firstName", "lastName", "patronymic"
                ]
            }, {
                model: db.task,
                where:{
                    subjectId: req.query.subjectId
                },
                attributes: ["id", "title"]
            }],
            attributes: [
                "file", "grade", "comment"
            ]
        });

        res.json({
            status: true,
            message: 'Все круто',
            data: solvedTasks
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

router.post("/grade_student", 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try {
        var result = await db.task_result.findOne({
            where: {
                studentId: req.query.studentId,
                taskId: req.query.taskId
            }
        });

        result.grade = req.query.grade;
        await result.save();

        res.json({
            status: true,
            message: 'Все круто'
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

router.post("/set_grade", 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try {
        var student = await db.student.findOne({
            where: {
                login: req.user.login
            }
        });

        var result = await db.task_result.findOne({
            where: {
                studentId: student.id,
                taskId: req.query.taskId
            }
        });

        if(!result)
        {
            await db.task_result.create({
                studentId: student.id,
                taskId: req.query.taskId,
                grade: req.query.grade
            });
        }
        else
        {
            result.grade = req.query.grade;

            await result.save();
        }

        res.json({
            status: true,
            message: 'Все круто'
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

router.post('/answer', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var student = await db.student.findOne({
            where: {
                login: req.user.login
            }
        });

        var result = await db.task_result.findOne({
            where: {
                studentId: student.id,
                taskId: req.query.taskId
            }
        });

        await fs.writeFileSync(__dirname + '\\..\\public\\answers\\' + `${req.user.login}_${req.query.taskId}${req.query.photo_ext}`, req.files.file.data);

        result.file = `/answers/${req.user.login}_${req.query.taskId}${req.query.photo_ext}`;
        await result.save();

        res.json({
            status: true,
            message: 'Все круто'
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

module.exports = router;