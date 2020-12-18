var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var db = require('./models');
var path = require('path');


var test = require('./controllers/test');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'barebuh', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '../public'));

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


app.use('/test', test);


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
        res.json({
            message: err.message,
            error: err
        });
    });
}


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

app.set('port', 3000);

db.sequelize.authenticate().
    then(() => {
        db.sequelize
        .sync({force : false})
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
