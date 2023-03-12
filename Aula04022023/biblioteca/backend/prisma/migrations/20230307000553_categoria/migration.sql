/*
  Warnings:

  - Added the required column `categoriaId` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL,
    "categoriaSuperiorId" INTEGER,
    CONSTRAINT "Categoria_categoriaSuperiorId_fkey" FOREIGN KEY ("categoriaSuperiorId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "isAlugado" BOOLEAN NOT NULL DEFAULT false,
    "valorDiaria" REAL NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    CONSTRAINT "Livro_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Livro" ("autor", "id", "isAlugado", "titulo", "valorDiaria") SELECT "autor", "id", "isAlugado", "titulo", "valorDiaria" FROM "Livro";
DROP TABLE "Livro";
ALTER TABLE "new_Livro" RENAME TO "Livro";
CREATE UNIQUE INDEX "Livro_titulo_key" ON "Livro"("titulo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_descricao_key" ON "Categoria"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_classificacao_key" ON "Categoria"("classificacao");
