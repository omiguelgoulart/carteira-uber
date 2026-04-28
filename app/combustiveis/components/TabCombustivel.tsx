import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface Combustivel {
  data: string
  combustivel: string
  formaPagamento: string
  litros: number
  posto: string
  valorTotal: number
  precoLitro: number
}

interface TabCombustivelProps {
  combustiveis: Combustivel[]
}

export function TabCombustivel({ combustiveis }: TabCombustivelProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Combustível</TableHead>
            <TableHead className="text-center">Posto</TableHead>
            <TableHead className="text-center">Litros</TableHead>
            <TableHead className="text-center">Preço/L</TableHead>
            <TableHead className="text-center">Forma Pgto.</TableHead>
            <TableHead className="text-center">Valor Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {combustiveis.map((c, i) => (
            <TableRow key={i}>
              <TableCell className="text-center">{c.data}</TableCell>
              <TableCell className="text-center">{c.combustivel}</TableCell>
              <TableCell className="text-center">{c.posto}</TableCell>
              <TableCell className="text-center">{c.litros.toFixed(2)} L</TableCell>
              <TableCell className="text-center">{c.precoLitro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
              <TableCell className="text-center">{c.formaPagamento}</TableCell>
              <TableCell className="text-center">{c.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
