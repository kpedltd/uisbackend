var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models');
const Sequelize = require('sequelize');


router.get('/getById/:id', async (req, res) => 
{
    try {
        var subject = await db.subject.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: true,
            error: 'Все круто',
            subject: subject
        });
    } catch(err) {
        res.json({
            status: false,
            error: err.message
        });
    }
})

router.get('/groups', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try {
        console.log(req.params);

        var groups = await db.schedule.findAll({
            raw: true,
            attributes: [
                [Sequelize.literal('DISTINCT \"groupId\"'), 'groupId'],
                'groupId',
            ],
            where: {
                subjectId: req.query.subjectId
            }
        });

        for(var i = 0;i < groups.length;i++)
        {
            var groupinfo = await db.group.findByPk(groups[i].groupId);
            groups[i].name = groupinfo.name;
        }

        res.json({
            status: true,
            error: 'Все круто',
            data: groups
        });
    } catch(err) {
        res.json({
            status: false,
            error: err.message
        });
    }
})

router.get('/getByName/:name', async (req, res) => 
{
    try {
        var subject = await db.subject.findOne({
            where: {
                name: req.params.id
            }
        });
        res.json({
            status: true,
            error: 'Все круто',
            subject: subject
        });
    } catch(err) {
        res.json({
            status: false,
            error: err.message
        });
    }
})

module.exports = router;