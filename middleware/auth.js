const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const domain = "localhost:3000";

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`
    }),

    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${domain}/`,
    algorithms: ['RS256']
});

const checkScopes = jwtAuthz(['read:messages']);

module.exports = 
{
    checkJwt: checkJwt,
    checkScopes: checkScopes
};