/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `addressLine` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `remarks` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `address`;
