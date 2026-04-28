import "dotenv/config"
import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

function parseData(data: string): Date {
  const [dia, mes, ano] = data.split("/").map(Number)
  return new Date(ano, mes - 1, dia)
}

const viagens = [
  { data: "03/04/2026", horasTrabalhadas: 7.59, kmRodado: 175, numeroViagens: 28, valorTotal: 334.11 },
  { data: "06/04/2026", horasTrabalhadas: 5.25, kmRodado: 95,  numeroViagens: 15, valorTotal: 143.50 },
  { data: "07/04/2026", horasTrabalhadas: 4.10, kmRodado: 66,  numeroViagens: 16, valorTotal: 134.77 },
  { data: "08/04/2026", horasTrabalhadas: 3.58, kmRodado: 82,  numeroViagens: 14, valorTotal: 125.43 },
  { data: "09/04/2026", horasTrabalhadas: 2.1,  kmRodado: 55,  numeroViagens: 8,  valorTotal: 81.44  },
  { data: "10/04/2026", horasTrabalhadas: 6.42, kmRodado: 149, numeroViagens: 20, valorTotal: 337.05 },
  { data: "13/04/2026", horasTrabalhadas: 3.43, kmRodado: 74,  numeroViagens: 14, valorTotal: 130.33 },
  { data: "14/04/2026", horasTrabalhadas: 3.18, kmRodado: 70,  numeroViagens: 10, valorTotal: 99.43  },
  { data: "15/04/2026", horasTrabalhadas: 3.45, kmRodado: 55,  numeroViagens: 12, valorTotal: 102.78 },
  { data: "17/04/2026", horasTrabalhadas: 4.06, kmRodado: 63,  numeroViagens: 12, valorTotal: 120.75 },
  { data: "21/04/2026", horasTrabalhadas: 6.15, kmRodado: 106, numeroViagens: 26, valorTotal: 270.91 },
  { data: "22/04/2026", horasTrabalhadas: 4.12, kmRodado: 57,  numeroViagens: 12, valorTotal: 105.99 },
  { data: "23/04/2026", horasTrabalhadas: 4.44, kmRodado: 96,  numeroViagens: 14, valorTotal: 124.25 },
  { data: "27/04/2026", horasTrabalhadas: 3.19, kmRodado: 53,  numeroViagens: 10, valorTotal: 76.47  },
]

async function main() {
  console.log("Inserindo viagens...")
  for (const v of viagens) {
    await prisma.viagem.create({
      data: {
        data: parseData(v.data),
        horasTrabalhadas: v.horasTrabalhadas,
        kmRodado: v.kmRodado,
        numeroViagens: v.numeroViagens,
        valorTotal: v.valorTotal,
      },
    })
    console.log(`✓ ${v.data}`)
  }
  console.log("Concluído.")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
