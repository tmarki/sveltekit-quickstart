/*
  Warnings:

  - You are about to drop the column `token` on the `MagicLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[csrfToken]` on the table `MagicLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `csrfToken` to the `MagicLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MagicLink_token_key";

-- AlterTable
ALTER TABLE "MagicLink" DROP COLUMN "token",
ADD COLUMN     "csrfToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MagicLink_csrfToken_key" ON "MagicLink"("csrfToken");

-- CreateIndex
CREATE INDEX "MagicLink_email_idx" ON "MagicLink"("email");

-- CreateIndex
CREATE INDEX "MagicLink_expires_idx" ON "MagicLink"("expires");
