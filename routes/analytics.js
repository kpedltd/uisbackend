var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models')
const Op = require('sequelize').Op;
const fs = require('fs');


router.get('/charts',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var lecturer = await db.lecturer.findOne({
            where: {
                login: req.user.login
            }
        });

        

        var analytics = await db.attendance_log.findAll({
            include:
            {
                model: db.schedule,
                where: {
                    groupId: req.query.groupId
                },
                include: {
                    model: db.subject,
                    where: {
                        lecturerId: lecturer.id
                    },
                    attributes: []
                },
                attributes: []
            },
            where: {
                state: 'skiped'
            }
        });

        console.log(analytics);
    
        res.json({
            status: true,
            error: 'Все круто',
            data: analytics
        });
    }
    catch(err) {
        console.log(err.message);
        res.status(204).json({
            status: false,
            error: err.message
        });
    }
});


module.exports = router;