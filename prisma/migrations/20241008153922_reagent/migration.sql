-- CreateTable
CREATE TABLE "Reagent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "casNumber" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "catalogId" TEXT NOT NULL,
    "catalogLink" TEXT NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "quantityUnit" TEXT NOT NULL,
    "totalQuantity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantityLeft" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "storageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reagent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reagent" ADD CONSTRAINT "Reagent_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
