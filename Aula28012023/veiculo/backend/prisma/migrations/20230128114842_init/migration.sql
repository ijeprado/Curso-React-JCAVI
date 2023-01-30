-- CreateTable
CREATE TABLE "Veiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "modelo" TEXT,
    "marca" TEXT NOT NULL,
    "ano" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");
