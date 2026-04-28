"use client"

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { ptBR } from "react-day-picker/locale"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FiltroProps {
  onChange: (range: DateRange | undefined) => void
}

export function Filtro({ onChange }: FiltroProps) {
  const [range, setRange] = useState<DateRange | undefined>()
  const [open, setOpen] = useState(false)

  function handleSelect(selected: DateRange | undefined) {
    setRange(selected)
    if (selected?.from && selected?.to) {
      onChange(selected)
      setOpen(false)
    }
  }

  function formatarPeriodo() {
    if (!range?.from) return "Selecionar período"
    const fmt = (d: Date) => d.toLocaleDateString("pt-BR")
    if (!range.to) return fmt(range.from)
    return `${fmt(range.from)} – ${fmt(range.to)}`
  }

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-72 justify-start gap-2">
            <CalendarIcon className="size-4" />
            {formatarPeriodo()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            locale={ptBR}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      {range && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setRange(undefined); onChange(undefined) }}
        >
          Limpar
        </Button>
      )}
    </div>
  )
}
