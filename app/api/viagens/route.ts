import { NextRequest } from "next/server"
import { viagemService } from "@/services/viagem.service"

export async function GET() {
  try {
    const viagens = await viagemService.listarViagens()
    return Response.json(viagens)
  } catch (error) {
    return Response.json({ error: "Erro ao buscar viagens" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const viagem = await viagemService.criarViagem({
      data: new Date(body.data),
      horasTrabalhadas: body.horasTrabalhadas,
      kmRodado: body.kmRodado,
      numeroViagens: body.numeroViagens,
      valorTotal: body.valorTotal,
    })
    return Response.json(viagem, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Erro ao criar viagem" }, { status: 500 })
  }
}
