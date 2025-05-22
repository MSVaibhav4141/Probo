-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Orders_id_seq";
