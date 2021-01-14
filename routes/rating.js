var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models');

router.get('/students',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var log = await db.rating_log.findAll({
            attributes: [
                'grade', 
            ],
            where: {
                subjectId: req.query.subjectId,
            },
            include: {
                model: db.student,
                attributes: [
                    'id', 'firstName', 'lastName', 'patronymic'
                ],
                where:{
                    groupId: req.query.groupId
                }
            },
            order: [
                ['student', 'id', 'DESC']
            ]
        });

        if(log.length == 0)
        {
            res.json({
                status: true,
                error: 'Все круто',
                data: []
            });
        }
        else
        {
            res.json({
                status: true,
                error: 'Все круто',
                data: log
            });
        }
    }
    catch(err) {
        res.json({
            status: false,
            error: err.message
        });
    }
});

router.post('/create_entries',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var students = await db.student.findAll({
            attributes:[
                'id', 'firstName', 'lastName', 'patronymic'
            ],
            where: {
                groupId: req.query.groupId
            }
        });

        var result = [];
        for(var i = 0;i < students.length;i++)
        {
            await db.rating_log.create({
                grade: 0,
                subjectId: req.query.subjectId,
                studentId: students[i].id
            });

            result.push({
                state: 0,
                student: students[i]
            });
        }

        res.json({
            data: result,
            status: true,
            error: 'Все круто'
        });
    }
    catch(err) {
        res.json({
            status: false,
            error: err.message
        });
    }
});

router.post('/student_rate',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var attendance = await db.rating_log.findOne({
            where: {
                subjectId: req.query.subjectId,
                studentId: req.query.studentId,
            }
        });

        attendance.grade = req.query.grade;

        await attendance.save();

        res.json({
            status: true,
            error: 'Все круто'
        });
    }
    catch(err) {
        res.json({
            status: false,
            error: err.message
        });
    }
});

module.exports = router;