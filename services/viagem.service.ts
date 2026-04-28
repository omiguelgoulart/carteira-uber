import { viagemRepository, ViagemInput } from "@/repositories/viagem.repository"

export const viagemService = {
  listarViagens() {
    return viagemRepository.findAll()
  },

  async buscarViagem(id: number) {
    const viagem = await viagemRepository.findById(id)
    if (!viagem) throw new Error("Viagem não encontrada")
    return viagem
  },

  criarViagem(input: ViagemInput) {
    return viagemRepository.create(input)
  },

  async atualizarViagem(id: number, input: Partial<ViagemInput>) {
    await viagemService.buscarViagem(id)
    return viagemRepository.update(id, input)
  },

  async deletarViagem(id: number) {
    await viagemService.buscarViagem(id)
    return viagemRepository.delete(id)
  },
}
