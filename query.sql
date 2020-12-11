CREATE TABLE IF NOT EXISTS "faculties" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "headId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "departments" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "headId" INTEGER NOT NULL,
    "facultyId" INTEGER NOT NULL REFERENCES "faculties" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "departmentId" INTEGER REFERENCES "faculties" ("id") ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        PRIMARY KEY ("id")
);

CREATE TYPE "public"."enum_edu_programs_type" AS ENUM('fulltime', 'parttime');

CREATE TABLE IF NOT EXISTS "edu_programs" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "type" "public"."enum_edu_programs_type" NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "groups" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "curatorId" INTEGER NOT NULL,
    "eduProgramId" INTEGER NOT NULL REFERENCES "edu_programs" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "groupId" INTEGER REFERENCES "edu_programs" ("id") ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "lecturers" (
    "id" SERIAL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "photo" VARCHAR(255),
    "biography" VARCHAR(255),
    "departmentId" INTEGER NOT NULL REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "login" VARCHAR(255) NOT NULL,
    "en_password" VARCHAR(255) NOT NULL,
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

CREATE TYPE "public"."enum_subjects_certification" AS ENUM('exam', 'record', 'coursework');

CREATE TABLE IF NOT EXISTS "subjects" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "lecturerId" INTEGER NOT NULL REFERENCES "lecturers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "certification" "public"."enum_subjects_certification" NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TYPE "public"."enum_schedules_dayOfWeek" AS ENUM(
    'Friday',
    'Monday',
    'Saturday',
    'Sunday',
    'Thursday',
    'Tuesday',
    'Wednesday'
);

CREATE TYPE "public"."enum_schedules_semester" AS ENUM('spring', 'autumn');

CREATE TABLE IF NOT EXISTS "schedules" (
    "id" SERIAL,
    "dayOfWeek" "public"."enum_schedules_dayOfWeek" NOT NULL,
    "time" TIME NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" "public"."enum_schedules_semester" NOT NULL,
    "subjectId" INTEGER NOT NULL REFERENCES "subjects" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "groupId" INTEGER NOT NULL REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
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

CREATE TYPE "public"."enum_attendance_logs_state" AS ENUM('visited', 'skiped');

CREATE TABLE IF NOT EXISTS "attendance_logs" (
    "id" SERIAL,
    "state" "public"."enum_attendance_logs_state" NOT NULL,
    "date" DATE NOT NULL,
    "scheduleId" INTEGER NOT NULL REFERENCES "schedules" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "studentId" INTEGER NOT NULL REFERENCES "students" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TYPE "public"."enum_rating_logs_grade" AS ENUM('1', '2', '3', '4', '5', 'record');


CREATE TABLE IF NOT EXISTS "rating_logs" (
    "id" SERIAL,
    "studentId" INTEGER NOT NULL REFERENCES "students" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "subjectId" INTEGER NOT NULL REFERENCES "subjects" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    "grade" "public"."enum_rating_logs_grade" NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "student_metrics" (
    "id" SERIAL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "studentId" INTEGER NOT NULL REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TYPE "public"."enum_tasks_state" AS ENUM('visited', 'skiped');


CREATE TABLE IF NOT EXISTS "tasks" (
    "id" SERIAL,
    "state" "public"."enum_tasks_state" NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "test" VARCHAR(255) NOT NULL,
    "begin" DATE NOT NULL,
    "deadline" DATE NOT NULL,
    "subjectId" INTEGER NOT NULL REFERENCES "subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "groupId" INTEGER NOT NULL REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "task_results" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "studentId" INTEGER NOT NULL REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "taskId" INTEGER NOT NULL REFERENCES "tasks" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);