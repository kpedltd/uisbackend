import random
import string

f = open('names.txt', 'r')
w = open('students.js', 'w', encoding="utf-16")

def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

template = """db.student.create(
{{
    firstName: "{0}",
    lastName: "{1}",
    patronymic: "{2}",
    dateOfBirth: new Date({3}, {4}, {5}),
    photo: null,
    departmentId: {6},
    groupId: {7},
    login: "s10{8}",
    en_password: "{9}"
}});
"""

array = []

for line in f:
    temp = line.split(" ")
    temp[2] = temp[2].rstrip()
    array.append(temp)

i = 11
g = 1
d = 1

for fio in array:
    dd = random.randint(1, 28)
    mm = random.randint(1, 12)
    yy = random.randint(1, 5) + 1996
    if (i - 10) % 33 == 0:
        g = g + 1
    if (i - 10) % 66 == 0:
        d = d + 1

    out = template.format(
        fio[1], fio[0], fio[2],
        yy, mm, dd, d, g,
        i, get_random_string(32))
    i = i + 1
    w.write(out)
