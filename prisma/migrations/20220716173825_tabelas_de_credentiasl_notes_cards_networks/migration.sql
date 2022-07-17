-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit', 'debit', 'creditAndDebit');

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "securityCode" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL DEFAULT false,
    "type" "CardType" NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "networks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_label_key" ON "credentials"("userId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "notes_userId_title_key" ON "notes"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_label_key" ON "cards"("userId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "networks_userId_label_key" ON "networks"("userId", "label");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
