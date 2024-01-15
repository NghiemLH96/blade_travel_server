-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `email_verify` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'business', 'member') NOT NULL DEFAULT 'member',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createAt` VARCHAR(191) NOT NULL,
    `updateAt` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `avatar` LONGTEXT NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_IPs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_IPs` ADD CONSTRAINT `user_IPs_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
