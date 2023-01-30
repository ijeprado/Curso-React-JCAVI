/*
  Warnings:

  - You are about to drop the column `codigo` on the `Chamado` table. All the data in the column will be lost.
  - Added the required column `numero` to the `Chamado` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chamado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "horasEstimadas" INTEGER NOT NULL,
    "prioridade" TEXT NOT NULL
);
INSERT INTO "new_Chamado" ("categoria", "descricao", "horasEstimadas", "id", "prioridade", "titulo") SELECT "categoria", "descricao", "horasEstimadas", "id", "prioridade", "titulo" FROM "Chamado";
DROP TABLE "Chamado";
ALTER TABLE "new_Chamado" RENAME TO "Chamado";
CREATE UNIQUE INDEX "Chamado_numero_key" ON "Chamado"("numero");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
