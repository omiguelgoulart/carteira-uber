-- CreateTable
CREATE TABLE "Combustivel" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "combustivel" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "litros" DOUBLE PRECISION NOT NULL,
    "posto" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "precoLitro" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Combustivel_pkey" PRIMARY KEY ("id")
);
