-- CreateTable
CREATE TABLE "Court" (
    "id" SERIAL NOT NULL,
    "courtNumber" INTEGER NOT NULL,
    "venueId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Court_venueId_courtNumber_key" ON "Court"("venueId", "courtNumber");

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
