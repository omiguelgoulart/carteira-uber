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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Combustivel } from "./TabCombustivel"

type FormData = {
  data: Date
  combustivel: string
  formaPagamento: string
  litros: number
  posto: string
  valorTotal: number
  precoLitro: number
}

interface DialogCombustivelProps {
  onAdd: (c: Combustivel) => void
}

export function DialogCombustivel({ onAdd }: DialogCombustivelProps) {
  const [open, setOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const { register, handleSubmit, reset, control } = useForm<FormData>()

  function onSubmit(data: FormData) {
    onAdd({
      data: format(data.data, "dd/MM/yyyy"),
      combustivel: data.combustivel,
      formaPagamento: data.formaPagamento,
      litros: Number(data.litros),
      posto: data.posto,
      valorTotal: Number(data.valorTotal),
      precoLitro: Number(data.precoLitro),
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
          <DialogTitle>Adicionar abastecimento</DialogTitle>
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
              <FieldLabel>Combustível</FieldLabel>
              <Controller
                control={control}
                name="combustivel"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gasolina">Gasolina</SelectItem>
                      <SelectItem value="Gasolina Aditivada">Gasolina Aditivada</SelectItem>
                      <SelectItem value="Etanol">Etanol</SelectItem>
                      <SelectItem value="GNV">GNV</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Posto</FieldLabel>
              <Input placeholder="Nome do posto" {...register("posto", { required: true })} />
            </Field>
            <Field>
              <FieldLabel>Litros</FieldLabel>
              <Input placeholder="Ex: 40.5" inputMode="decimal" {...register("litros", { required: true })} />
            </Field>
            <Field>
              <FieldLabel>Preço por litro</FieldLabel>
              <Input placeholder="Ex: 6.29" inputMode="decimal" {...register("precoLitro", { required: true })} />
            </Field>
            <Field>
              <FieldLabel>Valor total</FieldLabel>
              <Input placeholder="Ex: 254.74" inputMode="decimal" {...register("valorTotal", { required: true })} />
            </Field>
            <Field>
              <FieldLabel>Forma de pagamento</FieldLabel>
              <Controller
                control={control}
                name="formaPagamento"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="Débito">Débito</SelectItem>
                      <SelectItem value="Crédito">Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </FieldGroup>
          <Button type="submit" className="mt-4 w-full">Adicionar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
