"use client"

import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { Filtro } from "./components/Filtro"
import { ResumoViagem } from "./components/ResumoViagem"
import { TabViagem, Viagem } from "./components/TabViagem"
import { DialogViagem } from "./components/DialogViagem"

function isoParaDDMMYYYY(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR")
}

function ddmmyyyyParaDate(data: string): Date {
  const [dia, mes, ano] = data.split("/").map(Number)
  return new Date(ano, mes - 1, dia)
}

export default function PageViagens() {
  const [range, setRange] = useState<DateRange | undefined>()
  const [viagens, setViagens] = useState<Viagem[]>([])
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch("/api/viagens")
      .then((res) => res.json())
      .then((dados) => {
        if (!cancelled)
          setViagens(
            dados.map((v: Viagem & { data: string }) => ({
              ...v,
              data: isoParaDDMMYYYY(v.data),
            }))
          )
      })
    return () => { cancelled = true }
  }, [refreshKey])

  async function handleAdd(viagem: Viagem) {
    await fetch("/api/viagens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...viagem,
        data: ddmmyyyyParaDate(viagem.data).toISOString(),
      }),
    })
    setRefreshKey((k) => k + 1)
  }

  const viagensFiltradas = range?.from && range?.to
    ? viagens.filter((v) => {
        const d = ddmmyyyyParaDate(v.data)
        return d >= range.from! && d <= range.to!
      })
    : viagens

  return (
    <div className="p-4 flex flex-col gap-4">
      <ResumoViagem viagens={viagensFiltradas} />
      <div className="flex justify-between">
        <Filtro onChange={setRange} />
        <DialogViagem onAdd={handleAdd} />
      </div>
      <TabViagem viagens={viagensFiltradas} />
    </div>
  )
}
