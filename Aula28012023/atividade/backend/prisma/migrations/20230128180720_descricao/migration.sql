/*
  Warnings:

  - Added the required column `descricao` to the `Chamado` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "horasEstimadas" INTEGER NOT NULL,
    "prioridade" TEXT NOT NULL
);
INSERT INTO "new_Chamado" ("categoria", "codigo", "horasEstimadas", "id", "prioridade", "titulo") SELECT "categoria", "codigo", "horasEstimadas", "id", "prioridade", "titulo" FROM "Chamado";
DROP TABLE "Chamado";
ALTER TABLE "new_Chamado" RENAME TO "Chamado";
CREATE UNIQUE INDEX "Chamado_codigo_key" ON "Chamado"("codigo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
