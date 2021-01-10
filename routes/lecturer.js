var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models')
var json_middleware = require('../middleware/json')
var fs = require('fs')
var Readable = require('stream').Readable

router.post(
    '/login', json_middleware.CopyBody,
    async (req, res, next) => {
        passport.authenticate(
            'lecturer_login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('Ошибка.');

                        return res.json({ 
                            status: false,
                            error: error.message
                        });
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) 
                            {
                                return res.json({ 
                                    status: false,
                                    error: error.message
                                });
                            }

                            const body = { login: user.login };
                            const token = jwt.sign({ user: body }, 'barebuh');

                            return res.json({
                                status: true,
                                token: token
                            });
                        }
                    );
                } catch (error) {
                    return res.json({ 
                        status: false,
                        error: error.message
                    });
                }
            }
        )(req, res, next);
    }
);

var getme = async (req, res) => 
{
    try {
        var lecturer = await db.lecturer.findOne({
            where: {
                login: req.user.login
            }
        });

        var department = await db.department.findByPk(lecturer.departmentId);
        var faculty = await db.faculty.findByPk(department.facultyId);

        var result = {
            firstName: lecturer.firstName,
            lastName: lecturer.lastName,
            patronymic: lecturer.patronymic,
            faculty: faculty.name,
            department: department.name,
            biography: lecturer.biography,
            dateOfBirth: lecturer.dateOfBirth,
            photo: lecturer.photo
        }

        res.json({
            status: true,
            error: 'Все круто',
            data: result,
            token: req.query.secret_token
        });
    } catch(err) {
        res.json({
            status: false,
            error: err.message
        });
    }
}

router.get('/getme', passport.authenticate('jwt', { session: false }), getme)

router.get('/logout', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    req.logout();
    res.json({
        status: true,
        error: 'Все круто'
    });
});

router.post('/update_photo', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        await fs.writeFileSync(__dirname + '\\..\\public\\photos\\' + `${req.user.login}${req.query.photo_ext}`, req.files.file.data);
    
        var lecturer = await db.lecturer.findOne({
            where: {
                login: req.user.login
            }
        });

        lecturer.photo = `/photos/${req.user.login}${req.query.photo_ext}`;
        lecturer.save();

        res.json({
            status: true,
            error: 'Все круто'
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

router.get('/subjects', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try {
        var lecturer = await db.lecturer.findOne({
            where: {
                login: req.user.login
            }
        });

        var subjects = await db.subject.findAll({
            attributes: [
                'id', 'name'
            ],
            where: {
                lecturerId: lecturer.id
            }
        });

        res.json({
            status: true,
            error: 'Все круто',
            data: subjects
        });
    }
    catch(err) {
        console.log(err.message);
        res.status(204).json({
            status: false,
            error: err.message
        });
    }
})

module.exports = router;