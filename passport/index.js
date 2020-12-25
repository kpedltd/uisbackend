const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
    passport.use(
        new JWTstrategy(
            {
                secretOrKey: 'barebuh',
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
}