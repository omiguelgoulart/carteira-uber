import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Combustivel } from "./TabCombustivel"

interface ResumoCombustivelProps {
  combustiveis: Combustivel[]
}

export function ResumoCombustivel({ combustiveis }: ResumoCombustivelProps) {
  const total = combustiveis.length
  const totalLitros = combustiveis.reduce((acc, c) => acc + c.litros, 0)
  const totalGasto = combustiveis.reduce((acc, c) => acc + c.valorTotal, 0)
  const precoMedio = total > 0 ? totalGasto / totalLitros : 0

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Abastecimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-sm text-muted-foreground">Total de abastecimentos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total de Litros</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalLitros.toFixed(2)} L</p>
          <p className="text-sm text-muted-foreground">Média: {total > 0 ? (totalLitros / total).toFixed(2) : "0"} L/abast.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preço Médio/L</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{precoMedio.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          <p className="text-sm text-muted-foreground">Por litro abastecido</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Gasto</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalGasto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          <p className="text-sm text-muted-foreground">Média: {total > 0 ? (totalGasto / total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"}/abast.</p>
        </CardContent>
      </Card>
    </div>
  )
}
