import random
import string
import datetime

f = open('attendance_log.js', 'w', encoding="utf-16")

template = """db.attendance_log.create(
{{
    state: '{2}',
    date: new Date({3}, {4}, {5}),
    scheduleId: {0},
    student: {1}
}});
"""

schedule = [
    [1, 2, 3, 4],
    [12, 13, 14],
    [23, 24, 25, 26],
    [30, 31],
    [40, 41]
]

state = ['visited', 'skiped']

u = datetime.datetime.strptime("2020-09-01","%Y-%m-%d")

for d in range(5):
    for w in range(5):
        for i in range(1, 32):
            for j in range(len(schedule[w])):
                studentId = i
                scheduleId = schedule[w][j]
                grade = state[random.randint(0, 1)]

                out = template.format(
                    scheduleId, studentId, grade,
                    u.year, u.month, u.day)
                f.write(out)
        u = u + datetime.timedelta(days=1)

schedule = [
    [5, 6, 7],
    [15, 16, 17, 18],
    [27],
    [32, 33, 34, 35],
    [42, 43, 44, 45]
]

u = datetime.datetime.strptime("2020-09-01","%Y-%m-%d")

for d in range(5):
    for w in range(5):
        for i in range(33, 65):
            for j in range(len(schedule[w])):
                studentId = i
                scheduleId = schedule[w][j]
                grade = state[random.randint(0, 1)]

                out = template.format(
                    scheduleId, studentId, grade,
                    u.year, u.month, u.day)
                f.write(out)
        u = u + datetime.timedelta(days=1)

schedule = [
    [8, 9, 10, 11],
    [19, 20, 21, 22],
    [28, 29],
    [36, 37, 38, 39],
    [46, 47, 48, 49]
]

u = datetime.datetime.strptime("2020-09-01","%Y-%m-%d")

for d in range(5):
    for w in range(5):
        for i in range(66, 99):
            for j in range(len(schedule[w])):
                studentId = i
                scheduleId = schedule[w][j]
                grade = state[random.randint(0, 1)]

                out = template.format(
                    scheduleId, studentId, grade,
                    u.year, u.month, u.day)
                f.write(out)
        u = u + datetime.timedelta(days=1)