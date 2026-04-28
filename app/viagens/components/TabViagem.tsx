import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface Viagem {
  data: string
  horasTrabalhadas: number
  kmRodado: number
  numeroViagens: number
  valorTotal: number
}

interface TabViagemProps {
  viagens: Viagem[]
}

export function TabViagem({ viagens }: TabViagemProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Horas Trabalhadas</TableHead>
            <TableHead className="text-center">KM Rodado</TableHead>
            <TableHead className="text-center">Nº de Viagens</TableHead>
            <TableHead className="text-center">Valor Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="itens-center">
          {viagens.map((viagem) => (
            <TableRow key={viagem.data}>
              <TableCell className="text-center">{viagem.data}</TableCell>
              <TableCell className="text-center">{viagem.horasTrabalhadas}h</TableCell>
              <TableCell className="text-center">{viagem.kmRodado} km</TableCell>
              <TableCell className="text-center">{viagem.numeroViagens}</TableCell>
              <TableCell className="text-center">{viagem.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
