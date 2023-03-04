/*
  Warnings:

  - You are about to alter the column `valorDiaria` on the `Livro` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "isAlugado" BOOLEAN NOT NULL DEFAULT false,
    "valorDiaria" REAL NOT NULL
);
INSERT INTO "new_Livro" ("autor", "id", "isAlugado", "titulo", "valorDiaria") SELECT "autor", "id", "isAlugado", "titulo", "valorDiaria" FROM "Livro";
DROP TABLE "Livro";
ALTER TABLE "new_Livro" RENAME TO "Livro";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
