var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models');

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
            message: 'Все круто',
            subject: subject
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
        var subject = await db.subject.findOne({
            where: {
                name: req.params.id
            }
        });
        res.json({
            status: true,
            message: 'Все круто',
            subject: subject
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})