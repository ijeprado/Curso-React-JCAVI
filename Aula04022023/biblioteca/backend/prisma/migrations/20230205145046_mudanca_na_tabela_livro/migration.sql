/*
  Warnings:

  - You are about to drop the column `nome` on the `Livro` table. All the data in the column will be lost.
  - Added the required column `autor` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "isAlugado" BOOLEAN NOT NULL DEFAULT false,
    "valorDiaria" DECIMAL NOT NULL
);
INSERT INTO "new_Livro" ("id", "isAlugado", "valorDiaria") SELECT "id", "isAlugado", "valorDiaria" FROM "Livro";
DROP TABLE "Livro";
ALTER TABLE "new_Livro" RENAME TO "Livro";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
