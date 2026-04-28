"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { ptBR } from "react-day-picker/locale"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Viagem } from "./TabViagem"

type FormData = {
  data: Date
  horasTrabalhadas: number
  kmRodado: number
  numeroViagens: number
  valorTotal: number
}

interface DialogViagemProps {
  onAdd: (viagem: Viagem) => void
}

export function DialogViagem({ onAdd }: DialogViagemProps) {
  const [open, setOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const { register, handleSubmit, reset, control } = useForm<FormData>()

  function onSubmit(data: FormData) {
    onAdd({
      data: format(data.data, "dd/MM/yyyy"),
      horasTrabalhadas: Number(data.horasTrabalhadas),
      kmRodado: Number(data.kmRodado),
      numeroViagens: Number(data.numeroViagens),
      valorTotal: Number(data.valorTotal),
    })
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Adicionar viagem</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Data</FieldLabel>
              <Controller
                control={control}
                name="data"
                rules={{ required: true }}
                render={({ field }) => (
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-2 font-normal">
                        <CalendarIcon className="size-4" />
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => { field.onChange(date); setCalendarOpen(false) }}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Horas trabalhadas</FieldLabel>
              <Input placeholder="Ex: 7.59 (7h 59min)" inputMode="decimal" {...register("horasTrabalhadas", { required: true })} />
            </Field>
            <Field>
              <FieldLabel>KM rodado</FieldLabel>
              <Input placeholder="Ex: 175" inputMode="numeric" {...register("kmRodado", { required: true })} />
            </Field>
            <Field>
              <FieldLabel>Nº de viagens</FieldLabel>
              <Input placeholder="Ex: 28" inputMode="numeric" {...register("numeroViagens", { required: true })} />
            </Field>
            <Field>
              <FieldLabel>Valor total</FieldLabel>
              <Input placeholder="Ex: 334.11" inputMode="decimal" {...register("valorTotal", { required: true })} />
            </Field>
          </FieldGroup>
          <Button type="submit" className="mt-4 w-full">Adicionar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
