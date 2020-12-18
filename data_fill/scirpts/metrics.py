import random
import string

w = open('student_metrics.js', 'w', encoding="utf-16")

def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

template = """db.student_metrics.create(
{{
    date: new Date({0}, {1}, {2}),
    studentId: {3}
}});
"""

for i in range(150):
    dd = random.randint(1, 28)
    mm = random.randint(1, 12)
    yy = 2020
    studentId = random.randint(1, 99)

    out = template.format(
        yy, mm, dd, studentId)
    w.write(out)
