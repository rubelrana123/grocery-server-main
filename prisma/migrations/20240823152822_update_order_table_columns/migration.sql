/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderStatus` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `status`,
    ADD COLUMN `orderStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `transactionId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `payment`;
