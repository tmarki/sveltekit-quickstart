-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" TEXT DEFAULT 'free';
