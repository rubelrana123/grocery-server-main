/*
  Warnings:

  - Added the required column `date` to the `wishListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wishListItem` ADD COLUMN `date` DATE NOT NULL;
