var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models');

router.get('/getById/:id', async (req, res) => 
{
    try {
        var edu_program = await db.edu_program.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: true,
            message: 'Все круто',
            edu_program: edu_program
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
        var edu_program = await db.edu_program.findOne({
            where: {
                name: req.params.id
            }
        });
        res.json({
            status: true,
            message: 'Все круто',
            edu_program: edu_program
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})