-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pacient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Pacient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPacient" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "pacientId" INTEGER NOT NULL,

    CONSTRAINT "UserPacient_pkey" PRIMARY KEY ("userId","pacientId")
);

-- CreateTable
CREATE TABLE "Pill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "measure" TEXT NOT NULL,
    "when" TEXT,
    "description" TEXT,
    "pacientId" INTEGER NOT NULL,

    CONSTRAINT "Pill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hour" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "pillId" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Pill" ADD CONSTRAINT "Pill_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hour" ADD CONSTRAINT "Hour_pillId_fkey" FOREIGN KEY ("pillId") REFERENCES "Pill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
