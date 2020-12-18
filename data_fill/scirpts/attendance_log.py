import random
import string

w = open('attendance_log.js', 'w', encoding="utf-16")

template = """db.attendance_log.create(
{{
    state: '{2}',
    date: new Date(2020, 9, 3),
    scheduleId: {0},
    student: {1}
}});
"""

schedule = [1, 2]
state = ['visited', 'skiped']

for i in range(32):
    for j in range(len(schedule)):
        studentId = i
        scheduleId = schedule[j]
        grade = state[random.randint(0, 1)]

        out = template.format(
            scheduleId, studentId, grade)
        w.write(out)
