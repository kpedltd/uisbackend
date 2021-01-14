var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../models')
const Op = require('sequelize').Op;
const fs = require('fs');

router.post('/upload_photo', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        console.log(req.query);

        await fs.writeFileSync(__dirname + '\\..\\public\\tests\\photos\\' + `${req.user.login}_${req.query.taskId}${req.query.photo_ext}`, req.files.file.data);
    
        var task = await db.task.findOne({
            where: {
                id: req.query.taskId
            }
        });

        task.photo = `/tests/photos/${req.user.login}_${req.query.taskId}${req.query.photo_ext}`;
        task.save();

        res.json({
            date: null,
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

router.get('/id',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var task = await db.task.findByPk(req.query.id);

        res.json({
            data: task,
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


router.post('/remove', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var task = await db.task.destroy({
            where: {
                id: req.query.taskId
            }
        });

        res.json({
            data: null,
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
})

router.post('/create', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => 
{
    try{
        var task = await db.task.create({
            title: req.query.title,
            description: req.query.description,
            begin: new Date(req.query.begin),
            deadline: new Date(req.query.deadline),
            subjectId: req.query.subjectId,
            groupId: req.query.groupId,
            test: req.query.test
        });

        res.json({
            data: task.id,
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

router.get("/get", 
    passport.authenticate('jwt', { session: false }),
    async (req, res) => 
{
    try {
        var student = await db.student.findOne({
            where: {
                login: req.user.login
            }
        });

        var tasks = await db.task.findAll({
            raw: true,
            attributes: [
                'id', 'title', 'description', 'photo', 'test', 'begin', 'deadline'
            ],
            where: {
                subjectId: req.query.subjectId,
                groupId: student.groupId
            }
        });

        var completedTasks = [];

        for(var i = 0;i < tasks.length;i++)
        {
            var solvedTasks = await db.task_result.findOne({
                where: {
                    studentId: student.id,
                    taskId: tasks[i].id,
                    grade: {
                        [Op.ne]: 0
                    }
                }
            });

            console.log(solvedTasks);

            if(solvedTasks != null)
            {
                tasks[i]['grade'] = solvedTasks.grade;
                tasks[i]['comment'] = solvedTasks.comment;
                tasks[i]['test'] = null;

                completedTasks.push(tasks[i]);
                tasks.splice(i, 1); 
                i--;
                continue;
            }
        }

        for(var k = 0;k < tasks.length;k++)
        {
            if(tasks[k].test)
            {
                var test = JSON.parse(tasks[k].test);
                for (var i = 0;i < test.resultRequirements.length;i++)
                {
                    test.resultRequirements[i] = { "mark" : test.resultRequirements[i] };
                }

                for (var i = 0;i < test.questions.length;i++)
                {
                    for (var j = 0;j < test.questions[i].answers.length;j++)
                    {
                        test.questions[i].answers[j] = { "answer" : test.questions[i].answers[j] }
                    }
                }

                tasks[k].test = test;
            }
        }

        
        res.json({
            status: true,
            message: 'Все круто',
            data: {
                tasks: tasks,
                completedTasks: completedTasks
            }
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

router.get("/get_lecturer", 
    passport.authenticate('jwt', { session: false }),
    async (req, res) => 
{
    try {
        var tasks = await db.task.findAll({
            where:{
                subjectId: req.query.subjectId,
                groupId: req.query.groupId
            }
        });

        res.json({
            status: true,
            message: 'Все круто',
            data: tasks
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

router.post("/update", 
    passport.authenticate('jwt', { session: false }),
    async (req, res) => 
{
    try {
        var task = await db.task.findByPk(
            req.query.taskId
        );

        task.title = req.query.title;
        task.description = req.query.description;
        task.deadline = req.query.deadline;
        task.photo = req.query.photo;
        task.test = req.query.test;

        await task.save();

        res.json({
            data: null,
            status: true,
            message: 'Все круто'
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

router.get("/test", async (req, res) => 
{
    res.json({
        data: {
            testTime: 20,
            questions: [
                {
                    question: "Сколько метров в километре ?",
                    answers: [ "1000", "2000", "999" ],
                    correct: 0
                },
                {
                    question: "Что из этого относится к ООП ?",
                    answers: [ "Христианство", "Полиморфизм", "Онанизм" ],
                    correct: 1
                },
                {
                    question: "Столица России ?",
                    answers: [ "Мордовия", "Москва"],
                    correct: 0
                }
            ]
        },
        status: true,
        message: 'Все круто'
    });
});

router.post("/set_test", 
    passport.authenticate('jwt', { session: false }),
    async (req, res) => 
{
    try {
        var task = await db.task.findByPk(
            req.query.taskId
        );

        task.test = req.query.test;

        await task.save();

        res.json({
            data: null,
            status: true,
            message: 'Все круто'
        });
    } catch(err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

module.exports = router;