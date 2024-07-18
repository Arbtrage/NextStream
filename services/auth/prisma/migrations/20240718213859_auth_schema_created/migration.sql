-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth-schema";

-- CreateTable
CREATE TABLE "auth-schema"."Auth" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);
