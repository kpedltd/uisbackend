CREATE TABLE IF NOT EXISTS "faculties" (
    "id" SERIAL,
    "name" VARCHAR(256) NOT NULL,
    "headId" INTEGER,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "departments" (
    "id" SERIAL,
    "name" VARCHAR(256) NOT NULL,
    "headId" INTEGER,
    "facultyId" INTEGER NOT NULL REFERENCES "faculties" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "departmentId" INTEGER REFERENCES "faculties" ("id") ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "groups" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "curatorId" INTEGER,
    "eduProgramId" INTEGER NOT NULL REFERENCES "edu_programs" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "groupId" INTEGER REFERENCES "edu_programs" ("id") ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "edu_programs" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "type" "public"."enum_edu_programs_type" NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "lecturers" (
    "id" SERIAL,
    "firstName" VARCHAR(256) NOT NULL,
    "lastName" VARCHAR(256) NOT NULL,
    "patronymic" VARCHAR(256) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "photo" VARCHAR(255),
    "biography" VARCHAR(255),
    "departmentId" INTEGER NOT NULL REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "login" VARCHAR(64) NOT NULL,
    "en_password" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "headId" INTEGER REFERENCES "departments" ("id") ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        "curatorId" INTEGER REFERENCES "groups" ("id") ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "subjects" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "lecturerId" INTEGER NOT NULL REFERENCES "lecturers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "certification" "public"."enum_subjects_certification" NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "students" (
    "id" SERIAL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "photo" VARCHAR(255),
    "departmentId" INTEGER NOT NULL REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "groupId" INTEGER NOT NULL REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "login" VARCHAR(255) NOT NULL,
    "en_password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "schedules" (
    "id" SERIAL,
    "dayOfWeek" "public"."enum_schedules_dayOfWeek" NOT NULL,
    "time" TIME NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" "public"."enum_schedules_semester" NOT NULL,
    "subjectId" INTEGER NOT NULL REFERENCES "subjects" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "groupId" INTEGER NOT NULL REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "student_metrics" (
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "studentId" INTEGER NOT NULL REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "tasks" (
    "id" SERIAL,
    "description" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255),
    "test" VARCHAR(255),
    "begin" DATE NOT NULL,
    "deadline" DATE NOT NULL,
    "subjectId" INTEGER NOT NULL REFERENCES "subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "groupId" INTEGER NOT NULL REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "task_results" (
    "file" VARCHAR(256),
    "grade" INTEGER,
    "studentId" INTEGER NOT NULL REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "taskId" INTEGER NOT NULL REFERENCES "tasks" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS "attendance_logs" (
    "state" "public"."enum_attendance_logs_state" NOT NULL,
    "date" DATE NOT NULL,
    "scheduleId" INTEGER NOT NULL REFERENCES "schedules" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "studentId" INTEGER NOT NULL REFERENCES "students" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "rating_logs" (
    "studentId" INTEGER NOT NULL REFERENCES "students" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "subjectId" INTEGER NOT NULL REFERENCES "subjects" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "grade" "public"."enum_rating_logs_grade" NOT NULL
);