import { NextRequest } from "next/server"
import { combustivelService } from "@/services/combustivel.service"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await combustivelService.buscarCombustivel(Number(id))
    return Response.json(item)
  } catch {
    return Response.json({ error: "Abastecimento não encontrado" }, { status: 404 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const item = await combustivelService.atualizarCombustivel(Number(id), {
      ...(body.data && { data: new Date(body.data) }),
      ...(body.combustivel !== undefined && { combustivel: body.combustivel }),
      ...(body.formaPagamento !== undefined && { formaPagamento: body.formaPagamento }),
      ...(body.litros !== undefined && { litros: body.litros }),
      ...(body.posto !== undefined && { posto: body.posto }),
      ...(body.valorTotal !== undefined && { valorTotal: body.valorTotal }),
      ...(body.precoLitro !== undefined && { precoLitro: body.precoLitro }),
    })
    return Response.json(item)
  } catch {
    return Response.json({ error: "Erro ao atualizar abastecimento" }, { status: 404 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await combustivelService.deletarCombustivel(Number(id))
    return new Response(null, { status: 204 })
  } catch {
    return Response.json({ error: "Abastecimento não encontrado" }, { status: 404 })
  }
}
