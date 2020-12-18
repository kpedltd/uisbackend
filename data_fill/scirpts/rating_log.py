import random
import string

w = open('rating_log.js', 'w', encoding="utf-16")

template = """db.rating_log.create(
{{
    studentId: {0},
    subjectId: {1},
    grade: '{2}'
}})
"""

subject = [
    [1, 2, 3, 4, 6],
    [1, 3, 5, 6],
    [3, 4, 5, 6]
]

students = [32, 33, 34]
module = 0

for i in range(len(students)):
    for j in range(len(subject)):
        for k in range(random.randint(3, 7)):
            studentId = module + k + 1
            subjectId = j + 1

            grade = random.randint(3, 5)

            out = template.format(
                studentId, subjectId, grade)
            w.write(out)

    module = module + students[i]
