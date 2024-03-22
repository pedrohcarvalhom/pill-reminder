/*
  Warnings:

  - You are about to drop the `UserPacient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserPacient";

-- CreateTable
CREATE TABLE "_PacientToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PacientToUser_AB_unique" ON "_PacientToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PacientToUser_B_index" ON "_PacientToUser"("B");

-- AddForeignKey
ALTER TABLE "_PacientToUser" ADD CONSTRAINT "_PacientToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pacient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PacientToUser" ADD CONSTRAINT "_PacientToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
