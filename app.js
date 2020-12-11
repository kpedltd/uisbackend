var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var db = require('./models');
 


// var routes = require('./routes/index');
// var register = require('./routes/register');
// var auth = require('./routes/auth');
// var signout = require('./routes/signout');
// var profile = require('./routes/profile');
// var articles = require('./routes/articles');
// var api = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'barebuh', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// passport.serializeStudent((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeStudent((id, done) => {
//     db.user.findById(id).then(user => {
//         if (user) {
//             done(null, user.get());
//         } else {
//             done(user.errors, null);
//         }
//     });
// });

// app.use('/register', register);
// app.use('/auth', auth);
// app.use('/signout', signout);
// app.use('/profile', profile);
// app.use('/post', articles);
// app.use('/api', api);
// app.use('/', routes);

// require("./passport/register")(passport);
// require("./passport/auth")(passport);


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', 3000);

db.sequelize.authenticate().
    then(() => {
        db.sequelize
        .sync({force : true})
        .then(() => {
            app.listen(app.get('port'), function () {
            });
        })
        .catch(err => {
            console.error(err);
        });
    })
    .catch((err) => {
        console.error(err);
    });
