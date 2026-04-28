import { NextRequest } from "next/server"
import { combustivelService } from "@/services/combustivel.service"

export async function GET() {
  try {
    const combustiveis = await combustivelService.listarCombustiveis()
    return Response.json(combustiveis)
  } catch {
    return Response.json({ error: "Erro ao buscar abastecimentos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const item = await combustivelService.criarCombustivel({
      data: new Date(body.data),
      combustivel: body.combustivel,
      formaPagamento: body.formaPagamento,
      litros: body.litros,
      posto: body.posto,
      valorTotal: body.valorTotal,
      precoLitro: body.precoLitro,
    })
    return Response.json(item, { status: 201 })
  } catch {
    return Response.json({ error: "Erro ao criar abastecimento" }, { status: 500 })
  }
}
