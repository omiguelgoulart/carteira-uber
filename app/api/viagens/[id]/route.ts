import { NextRequest } from "next/server"
import { viagemService } from "@/services/viagem.service"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const viagem = await viagemService.buscarViagem(Number(id))
    return Response.json(viagem)
  } catch (error) {
    return Response.json({ error: "Viagem não encontrada" }, { status: 404 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const viagem = await viagemService.atualizarViagem(Number(id), {
      ...(body.data && { data: new Date(body.data) }),
      ...(body.horasTrabalhadas !== undefined && { horasTrabalhadas: body.horasTrabalhadas }),
      ...(body.kmRodado !== undefined && { kmRodado: body.kmRodado }),
      ...(body.numeroViagens !== undefined && { numeroViagens: body.numeroViagens }),
      ...(body.valorTotal !== undefined && { valorTotal: body.valorTotal }),
    })
    return Response.json(viagem)
  } catch (error) {
    return Response.json({ error: "Erro ao atualizar viagem" }, { status: 404 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await viagemService.deletarViagem(Number(id))
    return new Response(null, { status: 204 })
  } catch (error) {
    return Response.json({ error: "Viagem não encontrada" }, { status: 404 })
  }
}
