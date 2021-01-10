var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var json_middleware = require('../middleware/json')
var db = require('../models')
var fs = require('fs')
const dirTree = require("directory-tree");

router.post(
    '/login', json_middleware.CopyBody,
    async (req, res, next) => {
        passport.authenticate(
            'student_login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('Ошибка.');

                        return next(error);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { login: user.login };
                            const token = jwt.sign({ user: body }, 'barebuh');

                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

router.get('/getme', passport.authenticate('jwt', { session: false }), async (req, res) => 
{
    try {
        var student = await db.student.findOne({
            where: {
                login: req.user.login
            }
        });
        res.json({
            status: true,
            message: 'Все круто',
            student: student,
            token: req.query.secret_token
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})

router.get('/edit', passport.authenticate('jwt', { session: false }), async (req, res) => 
{
    try {
        var student = await db.student.findOne({
            where: {
                login: req.user.login
            }
        });

        if(req.query.login)
        {
            student.login = req.query.login;
        }
        if(req.query.password)
        {
            student.password = req.query.password;
        }

        await student.save();

        res.json({
            status: true,
            token: req.query.secret_token
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})

router.get('/logout', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    req.logout();
    res.json({
        status: true,
        message: 'Все круто'
    });
});

router.get('/get_profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    var result = {};
    db.student.findOne({
        where: {
            login: req.user.login
        }
    }).then(async (student) => {
        result.firstName = student.firstName;
        result.lastName = student.lastName;
        result.patronymic = student.patronymic;
        result.dateOfBirth = student.dateOfBirth;
        result.photo = student.photo;

        try {
            var department = await db.department.findOne({
                where: {
                    id: student.departmentId
                }
            });
    
            var faculty = await db.faculty.findOne({
                where: {
                    id: await department.facultyId
                }
            });
    
            var group = await db.group.findOne({
                where: {
                    id: student.groupId
                }
            });
    
            var edu_program = await db.edu_program.findOne({
                where: {
                    id: await group.eduProgramId
                }
            });
    
            result.departmentName = await department.name;
            result.facultyName = await faculty.name;
            result.groupName = await group.name;
            result.educationProgramName = await edu_program.name;

            res.json(await result);
        } catch (error) {
            res.json({
                status: false,
                message: err.message
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: err.message
        });
    });
})

router.post('/update_photo', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        const tree = dirTree(__dirname + '\\..\\public', {}, null, (item, PATH, stats) => {
            console.log(item);
        });

        await fs.writeFileSync(__dirname + '\\..\\public\\photos\\' + `${req.user.login}${req.query.photo_ext}`, req.files.file.data);
    
        var student = await db.student.findOne({
            where: {
                login: req.user.login
            }
        });

        student.photo = `/photos/${req.user.login}${req.query.photo_ext}`;
        student.save();

        res.json({
            status: true,
            message: 'Все круто'
        });
    }
    catch(err) {
        console.log(err.message);
        res.status(204).json({
            status: false,
            message: err.message
        });
    }
});

module.exports = router;