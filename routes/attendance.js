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
        var log = await db.attendance_log.findAll({
            attributes: [
                'state', 
            ],
            where: {
                scheduleId: req.query.scheduleId,
                date: new Date(req.query.date)
            },
            include: {
                model: db.student,
                attributes: [
                    'id', 'firstName', 'lastName', 'patronymic'
                ]
            }
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
            await db.attendance_log.create({
                state: 'skiped',
                date: new Date(req.query.date),
                scheduleId: req.query.scheduleId,
                studentId: students[i].id
            });

            result.push({
                state: 'skiped',
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

router.post('/change_state',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var attendance = await db.attendance_log.findOne({
            where: {
                studentId: req.query.studentId,
                scheduleId: req.query.scheduleId,
                date: new Date(req.query.date)
            }
        });

        attendance.state = req.query.state;

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