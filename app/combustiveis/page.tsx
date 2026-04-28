"use client"

import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { Filtro } from "./components/Filtro"
import { ResumoCombustivel } from "./components/ResumoCombustivel"
import { TabCombustivel, Combustivel } from "./components/TabCombustivel"
import { DialogCombustivel } from "./components/DialogCombustivel"

function isoParaDDMMYYYY(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR")
}

function ddmmyyyyParaDate(data: string): Date {
  const [dia, mes, ano] = data.split("/").map(Number)
  return new Date(ano, mes - 1, dia)
}

export default function PageCombustiveis() {
  const [range, setRange] = useState<DateRange | undefined>()
  const [combustiveis, setCombustiveis] = useState<Combustivel[]>([])
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch("/api/combustiveis")
      .then((res) => res.json())
      .then((dados) => {
        if (!cancelled)
          setCombustiveis(
            dados.map((c: Combustivel & { data: string }) => ({
              ...c,
              data: isoParaDDMMYYYY(c.data),
            }))
          )
      })
    return () => { cancelled = true }
  }, [refreshKey])

  async function handleAdd(c: Combustivel) {
    await fetch("/api/combustiveis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...c,
        data: ddmmyyyyParaDate(c.data).toISOString(),
      }),
    })
    setRefreshKey((k) => k + 1)
  }

  const filtrados = range?.from && range?.to
    ? combustiveis.filter((c) => {
        const d = ddmmyyyyParaDate(c.data)
        return d >= range.from! && d <= range.to!
      })
    : combustiveis

  return (
    <div className="p-4 flex flex-col gap-4">
      <ResumoCombustivel combustiveis={filtrados} />
      <div className="flex justify-between">
        <Filtro onChange={setRange} />
        <DialogCombustivel onAdd={handleAdd} />
      </div>
      <TabCombustivel combustiveis={filtrados} />
    </div>
  )
}
