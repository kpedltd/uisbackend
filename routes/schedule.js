var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models');

router.get('/getmy',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => 
{
    try {
        var student = await db.student.findOne({
            raw: true,
            where: {
                login: req.user.login
            }
        });

        var schedule = await db.schedule.findAll({
            raw: true,
            where: {
                groupId: student.groupId
            }
        });

        var result = {};
        for(var i = 0;i < schedule.length;i++)
        {
            var subject = await db.subject.findOne({
                raw: true,
                where: {
                    id: schedule[i].subjectId
                }
            });

            var subresult = {};

            subresult.name = subject.name;
            subresult.location = schedule[i].location;
            subresult.time = schedule[i].time;

            if(!result[schedule[i].dayOfWeek])
            {
                result[schedule[i].dayOfWeek] = [];
            }

            result[schedule[i].dayOfWeek].push(subresult);
        }

        var nresult = [];
        for (var day in result)
        {
            var sch = [];
            for(var i = 0;i < result[day].length;i++)
            {
                sch.push(result[day][i]);
            }
            nresult.push({
                day: day,
                subjects: sch
            });
        }

        res.json({
            status: true,
            message: 'Все круто',
            data: nresult
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})

router.get("/lecturer", 
    passport.authenticate('jwt', { session: false }),
    async (req, res) => 
{
    try
    {
        var lecturer = await db.lecturer.findOne({
            raw: true,
            where: {
                login: req.user.login
            }
        });
    
        var subjects = await db.subject.findAll({
            raw: true,
            where: {
                lecturerId: lecturer.id
            }
        });
    
        var schedule = {};
        for(var i = 0;i < subjects.length;i++)
        {
            var sch = await db.schedule.findAll({
                raw: true,
                where: {
                    subjectId: subjects[i].id
                }
            });
    
            for(var j = 0;j < sch.length;j++)
            {
                var group = await db.group.findByPk(sch[j].groupId);
    
                var insertion = {
                    groupName: group.name,
                    subjectName: subjects[i].name,
                    location: sch[j].location,
                    time: sch[j].time
                }
    
                if(!schedule[sch[j].dayOfWeek])
                {
                    schedule[sch[j].dayOfWeek] = [];
                }
    
                schedule[sch[j].dayOfWeek].push(insertion);
            }
        }

        var nresult = [];
        for (var day in schedule)
        {
            var sch = [];
            for(var i = 0;i < schedule[day].length;i++)
            {
                sch.push(schedule[day][i]);
            }
            nresult.push({
                day: day,
                subjects: sch
            });
        }

        res.json({
            status: true,
            error: 'Все круто',
            data: {
                records : nresult
            }
        });
    }
    catch(err) {
        res.json({
            status: false,
            error: err.message
        });
    }
});

router.get("/concrete", 
    passport.authenticate('jwt', { session: false }),
    async (req, res) => 
{
    try {
        console.log(req.query);

        var schedules = await db.schedule.findAll({
            attributes: [
                'id', 'time'
            ],
            where: {
                subjectId: req.query.subjectId,
                groupId: req.query.groupId,
                dayOfWeek: req.query.dayOfWeek
            }
        });

        if(schedules.length == 0)
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
                data: schedules
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

module.exports = router;