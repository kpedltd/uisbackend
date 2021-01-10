var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models');

router.get('/students',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    var log = await db.attendance_log.findAll({
        attributes: [
            'state'
        ],
        where: {
            scheduleId: req.query.scheduleId,
            date: new Date(req.query.date)
        },
        include: {
            model: db.student,
            attributes: [
                'firstName', 'lastName', 'patronymic'
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
});

module.exports = router;