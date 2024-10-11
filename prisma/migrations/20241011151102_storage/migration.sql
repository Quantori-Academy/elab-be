/*
  Warnings:

  - You are about to drop the column `location` on the `Storage` table. All the data in the column will be lost.
  - Made the column `name` on table `Storage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Storage_location_key";

-- DropIndex
DROP INDEX "Storage_name_key";

-- AlterTable
ALTER TABLE "Storage" DROP COLUMN "location",
ALTER COLUMN "name" SET NOT NULL;
