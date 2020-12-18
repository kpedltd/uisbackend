import random
import string

w = open('schedule.js', 'w', encoding="utf-16")

daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
lesson_time = ['8:00', '9:50', '11:40', '13:45']
locs = ['201', '206', '425', '316', '319', '324']
group = 3
subject = 6


def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

template = """db.schedule.create(
{{
    dayOfWeek: "{0}",
    time: '{1}',
    location: '7а кабинет {2}',
    year: 2020,
    semester: 'autumn',
    subjectId: {3},
    groupId: {4}
}});
"""

currentTime = 0
currentDay = 0

dictonary = [[], [], [] ,[]]
lecturers = [0, 0, 1, 2, 3, 4]
subjects = [1, 2, 3, 4, 5, 6]
lecturerId = 1

for i in range(len(daysOfWeek)):
    dd = daysOfWeek[i]

    for j in range(group):
        for k in range(len(lesson_time)):
            
            if lecturerId in dictonary[k]:
                result = False
                possible = []

                for l in range(5):
                    if l not in dictonary[k]:
                        result = True
                        possible.append(l)

                if result == False:
                    continue

                lecturerId = possible[len(possible) - 1]

            dictonary[k].append(lecturerId)

            indices = [i for i, x in enumerate(lecturers) if x == lecturerId]
            index = indices[random.randint(0, len(indices) - 1)]

            tt = lesson_time[k]
            out = template.format(
                dd, tt, locs[lecturerId], subjects[index], j + 1)
            w.write(out)
            lecturerId = random.randint(0, 4)

    for j in range(len(dictonary)):
        dictonary[j].clear()