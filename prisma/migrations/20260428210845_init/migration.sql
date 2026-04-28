-- CreateTable
CREATE TABLE "Viagem" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horasTrabalhadas" DOUBLE PRECISION NOT NULL,
    "kmRodado" DOUBLE PRECISION NOT NULL,
    "numeroViagens" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Viagem_pkey" PRIMARY KEY ("id")
);
