import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Viagem } from "./TabViagem";

interface ResumoViagemProps {
  viagens: Viagem[]
}

// Converte formato HH.MM (ex: 7.59 = 7h59min) para horas decimais
function hhmmParaDecimal(valor: number): number {
  const horas = Math.floor(valor)
  const minutos = Math.round((valor - horas) * 100)
  return horas + minutos / 60
}

function formatarHoras(decimal: number): string {
  const horas = Math.floor(decimal)
  const minutos = Math.round((decimal - horas) * 60)
  return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`
}

export function ResumoViagem({ viagens }: ResumoViagemProps) {
  const dias = viagens.length
  const totalHoras = viagens.reduce((acc, v) => acc + hhmmParaDecimal(v.horasTrabalhadas), 0)
  const totalKm = viagens.reduce((acc, v) => acc + v.kmRodado, 0)
  const totalViagens = viagens.reduce((acc, v) => acc + v.numeroViagens, 0)
  const totalValor = viagens.reduce((acc, v) => acc + v.valorTotal, 0)

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Horas Trabalhadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatarHoras(totalHoras)}</p>
          <p className="text-sm text-muted-foreground">Média: {formatarHoras(totalHoras / dias)}/dia</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>KM Rodado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalKm} km</p>
          <p className="text-sm text-muted-foreground">Média: {(totalKm / dias).toFixed(1)} km/dia</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nº de Viagens</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalViagens}</p>
          <p className="text-sm text-muted-foreground">Média: {(totalViagens / dias).toFixed(1)}/dia</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Valor Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalValor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          <p className="text-sm text-muted-foreground">Média: {(totalValor / dias).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}/dia</p>
        </CardContent>
      </Card>
    </div>
  )
}
