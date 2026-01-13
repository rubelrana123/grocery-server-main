-- AlterTable
ALTER TABLE `order` ADD COLUMN `deliveryManId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `deliveryMan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `zone` VARCHAR(191) NOT NULL,
    `identityType` VARCHAR(191) NOT NULL,
    `identityNumber` VARCHAR(191) NOT NULL,
    `vehicle` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `identityImage` VARCHAR(512) NOT NULL,
    `deliveryManImage` VARCHAR(512) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_deliveryManId_fkey` FOREIGN KEY (`deliveryManId`) REFERENCES `deliveryMan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
