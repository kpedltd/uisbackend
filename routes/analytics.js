var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models')
const Op = require('sequelize').Op;
const fs = require('fs');
const sequelize = require('sequelize')


router.get('/charts',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var attendance_analytics = await db.attendance_log.findAll({
            include:
            {
                model: db.schedule,
                where: {
                    groupId: req.query.groupId,
                    subjectId: req.query.subjectId
                },
                attributes: []
            },
            attributes: [ "state", [sequelize.fn('COUNT', 'state'), "count"] ],
            group: ['state']
        });

        var rating_analytics = await db.rating_log.findAll({
            where: {
                subjectId: req.query.subjectId
            },
            include:
            {
                model: db.student,
                where: {
                    groupId: req.query.groupId
                },
                attributes: []
            },
            attributes: [ "grade", [sequelize.fn('COUNT', 'grade'), "count"] ],
            group: ['grade']
        });
    
        res.json({
            status: true,
            error: 'Все круто',
            data: {
                attendance: attendance_analytics,
                rating: rating_analytics
            }
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