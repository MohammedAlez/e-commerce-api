/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `name`,
    ADD COLUMN `firsName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL DEFAULT '';
