/*
  Warnings:

  - Added the required column `deliveryDate` to the `order` table without a default value. This is not possible if the table is not empty.
  - Made the column `deliveryAddress` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `deliveryDate` DATE NOT NULL,
    MODIFY `deliveryAddress` VARCHAR(191) NOT NULL;
