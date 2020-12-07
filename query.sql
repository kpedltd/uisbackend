CREATE TABLE IF NOT EXISTS "students" (
    "id"   SERIAL, 
    "firstName" VARCHAR(255) NOT NULL, 
    "lastName" VARCHAR(255) NOT NULL, 
    "patronymic" VARCHAR(255) NOT NULL, 
    "dateOfBirth" DATE NOT NULL, 
    "photo" VARCHAR(255), 
    "departmentId" INTEGER NOT NULL, 
    "groupId" INTEGER NOT NULL, 
    "password" VARCHAR(255) NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id")
);