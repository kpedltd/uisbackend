var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models')

router.post(
    '/login',
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

module.exports = router;