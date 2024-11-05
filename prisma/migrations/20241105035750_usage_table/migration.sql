-- AlterTable
ALTER TABLE "Reagent" ALTER COLUMN "casNumber" DROP NOT NULL,
ALTER COLUMN "catalogId" DROP NOT NULL,
ALTER COLUMN "catalogLink" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "pricePerUnit" DROP NOT NULL,
ALTER COLUMN "producer" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Usage" (
    "id" SERIAL NOT NULL,
    "usedQuantity" DOUBLE PRECISION NOT NULL,
    "sampleId" INTEGER,
    "usedReagentId" INTEGER,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Reagent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_usedReagentId_fkey" FOREIGN KEY ("usedReagentId") REFERENCES "Reagent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
