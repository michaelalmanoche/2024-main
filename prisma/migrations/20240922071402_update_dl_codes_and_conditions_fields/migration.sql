-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('idle', 'queued', 'waiting', 'departed', 'coming', 'arrived');

-- CreateEnum
CREATE TYPE "QueueStatus" AS ENUM ('waiting', 'departed', 'arrived');

-- CreateEnum
CREATE TYPE "TerminalType" AS ENUM ('terminal1', 'terminal2');

-- CreateTable
CREATE TABLE "Operator" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT,
    "lastname" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "brgy" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "emergency_name" TEXT NOT NULL,
    "emergency_address" TEXT NOT NULL,
    "emergency_contact" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT,
    "lastname" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "brgy" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "license_no" TEXT NOT NULL,
    "dl_codes" TEXT[],
    "conditions" TEXT[],
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "emergency_name" TEXT NOT NULL,
    "emergency_address" TEXT NOT NULL,
    "emergency_contact" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Van" (
    "id" SERIAL NOT NULL,
    "mv_file_no" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "engine_no" TEXT NOT NULL,
    "chassis_no" TEXT NOT NULL,
    "denomination" TEXT NOT NULL,
    "piston_displacement" TEXT NOT NULL,
    "number_of_cylinders" INTEGER NOT NULL,
    "fuel" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "body_type" TEXT NOT NULL,
    "body_no" TEXT NOT NULL,
    "year_model" INTEGER NOT NULL,
    "gross_weight" DOUBLE PRECISION NOT NULL,
    "net_weight" DOUBLE PRECISION NOT NULL,
    "shipping_weight" DOUBLE PRECISION NOT NULL,
    "net_capacity" DOUBLE PRECISION NOT NULL,
    "year_last_registered" INTEGER NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Van_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "van_id" INTEGER NOT NULL,
    "operator_id" INTEGER,
    "driver_id" INTEGER,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'idle',
    "queued_at" TIMESTAMP(3),
    "terminal" "TerminalType" NOT NULL DEFAULT 'terminal1',
    "order" INTEGER NOT NULL DEFAULT 0,
    "queue_order" INTEGER,
    "arrivalTime" TIMESTAMP(3),
    "departureTime" TIMESTAMP(3),

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queue" (
    "id" SERIAL NOT NULL,
    "assignment_id" INTEGER NOT NULL,
    "status" "QueueStatus" NOT NULL,
    "current_terminal" INTEGER,
    "queued_at" TIMESTAMP(3),

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Terminal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Terminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "terminal_id" INTEGER NOT NULL,
    "role_id" INTEGER,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_license_no_key" ON "Driver"("license_no");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_van_id_fkey" FOREIGN KEY ("van_id") REFERENCES "Van"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "Operator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "Terminal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
