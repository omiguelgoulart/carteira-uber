import { combustivelRepository, CombustivelInput } from "@/repositories/combustivel.repository"

export const combustivelService = {
  listarCombustiveis() {
    return combustivelRepository.findAll()
  },

  async buscarCombustivel(id: number) {
    const item = await combustivelRepository.findById(id)
    if (!item) throw new Error("Abastecimento não encontrado")
    return item
  },

  criarCombustivel(input: CombustivelInput) {
    return combustivelRepository.create(input)
  },

  async atualizarCombustivel(id: number, input: Partial<CombustivelInput>) {
    await combustivelService.buscarCombustivel(id)
    return combustivelRepository.update(id, input)
  },

  async deletarCombustivel(id: number) {
    await combustivelService.buscarCombustivel(id)
    return combustivelRepository.delete(id)
  },
}
