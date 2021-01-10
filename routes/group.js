var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models');

router.get('/getById/:id', async (req, res) => 
{
    try {
        var group = await db.group.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: true,
            message: 'Все круто',
            data: group
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})

router.get('/getByName/:name', async (req, res) => 
{
    try {
        var group = await db.group.findOne({
            where: {
                name: req.params.id
            }
        });
        res.json({
            status: true,
            message: 'Все круто',
            data: group
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})

router.get('/getStudents/:groupId', passport.authenticate('jwt', { session: false }), async (req, res) => 
{
    try {
        var students = await db.students.findAll({
            where: {
                groupId: req.params.groupId
            }
        });
        res.json({
            status: true,
            message: 'Все круто',
            group: group
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})