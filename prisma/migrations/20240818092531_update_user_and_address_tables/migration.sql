/*
  Warnings:

  - You are about to drop the column `country` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - Added the required column `addressLine` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `country`,
    DROP COLUMN `state`,
    DROP COLUMN `street`,
    ADD COLUMN `addressLine` VARCHAR(191) NOT NULL,
    ADD COLUMN `remarks` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `deliveryAddress` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NULL;
