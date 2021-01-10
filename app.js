var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var db = require('./models');
var path = require('path');
var helmet = require("helmet");
var fileUpload = require("express-fileupload")
var serveIndex = require('serve-index')

var test = require('./controllers/test');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'barebuh', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));

// passport.serializeStudent((student, done) => {
//     done(null, student.id);
// });

// passport.deserializeStudent((id, done) => {
//     db.user.findById(id).then(student => {
//         if (student) {
//             done(null, student.get());
//         } else {
//             done(student.errors, null);
//         }
//     });
// });

// passport.serializeLecturer((lecturer, done) => {
//     done(null, lecturer.id);
// });

// passport.deserializeLecturer((id, done) => {
//     db.user.findById(id).then(lecturer => {
//         if (lecturer) {
//             done(null, lecturer.get());
//         } else {
//             done(lecturer.errors, null);
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

require("./passport/lecturer_auth")(passport);
require("./passport/student_auth")(passport);
require("./passport/index")(passport);

var routes_student = require('./routes/student');
var routes_lecturer = require('./routes/lecturer');
var routes_schedule = require('./routes/schedule');
var routes_subject = require('./routes/subject');
var routes_attendance = require('./routes/attendance');

app.use('/student', routes_student);
app.use('/lecturer', routes_lecturer);
app.use('/schedule', routes_schedule);
app.use('/subject', routes_subject);
app.use('/attendance', routes_attendance);



app.post('/say', (req, res) =>
{
    res.json({
        say: req.body.say
    });
});

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
