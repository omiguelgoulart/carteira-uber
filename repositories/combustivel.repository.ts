import { prisma } from "@/lib/prisma"

export type CombustivelInput = {
  data: Date
  combustivel: string
  formaPagamento: string
  litros: number
  posto: string
  valorTotal: number
  precoLitro: number
}

export const combustivelRepository = {
  findAll() {
    return prisma.combustivel.findMany({ orderBy: { data: "desc" } })
  },

  findById(id: number) {
    return prisma.combustivel.findUnique({ where: { id } })
  },

  create(input: CombustivelInput) {
    return prisma.combustivel.create({ data: input })
  },

  update(id: number, input: Partial<CombustivelInput>) {
    return prisma.combustivel.update({ where: { id }, data: input })
  },

  delete(id: number) {
    return prisma.combustivel.delete({ where: { id } })
  },
}
