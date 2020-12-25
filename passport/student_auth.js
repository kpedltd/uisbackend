let db = require('../models');
let LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(
        'student_login',
        new LocalStrategy(
            {
                usernameField: 'login',
                passwordField: 'password'
            },
            async (login, password, done) => {
                try {
                    const user = await db.student.findOne({ login });

                    if (!user) {
                        return done(null, false, { message: 'Студента с таким логином нет' });
                    }

                    const validate = await user.PassIsEquals(password);

                    if (!validate) {
                        return done(null, false, { message: 'Неправильный пароль' });
                    }

                    return done(null, user, { message: 'Авторизация прошла успешно' });
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};