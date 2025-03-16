/*
  Warnings:

  - You are about to drop the column `clerkUserId` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Requiter_password_key` ON `requiter`;

-- DropIndex
DROP INDEX `User_clerkUserId_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `clerkUserId`,
    ADD COLUMN `firstName` VARCHAR(50) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(50) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
