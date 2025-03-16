/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `requiter` ADD COLUMN `role` ENUM('REQUITER', 'ADMIN') NOT NULL DEFAULT 'REQUITER';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;
