/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `offer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `offer_title_key` ON `offer`(`title`);
