-- CreateTable
CREATE TABLE "Chamado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "horasEstimadas" INTEGER NOT NULL,
    "prioridade" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Chamado_codigo_key" ON "Chamado"("codigo");
