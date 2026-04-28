import { prisma } from "@/lib/prisma"

export type ViagemInput = {
  data: Date
  horasTrabalhadas: number
  kmRodado: number
  numeroViagens: number
  valorTotal: number
}

export const viagemRepository = {
  findAll() {
    return prisma.viagem.findMany({ orderBy: { data: "desc" } })
  },

  findById(id: number) {
    return prisma.viagem.findUnique({ where: { id } })
  },

  create(input: ViagemInput) {
    return prisma.viagem.create({ data: input })
  },

  update(id: number, input: Partial<ViagemInput>) {
    return prisma.viagem.update({ where: { id }, data: input })
  },

  delete(id: number) {
    return prisma.viagem.delete({ where: { id } })
  },
}
