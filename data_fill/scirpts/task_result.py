import random
import string

w = open('task_result.js', 'w', encoding="utf-16")

template = """db.task_result.create(
{{
    grade: {0},
    studentId: {1},
    taskId: {2}
}});
"""

task = [1, 2]
module = 0

for i in range(len(module_st)):
    for j in range(random.randint(3, 7)):
        studentId = j + 1 + module
        taskId = task[i]
        grade = random.randint(3, 5)

        out = template.format(
                grade, studentId, taskId)
        w.write(out)

    module = module + module_st[i]
