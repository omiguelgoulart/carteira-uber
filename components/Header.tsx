"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const links = [
  { href: "/viagens", label: "Viagens" },
  { href: "/combustiveis", label: "Combustíveis" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="w-full">
      <div className="flex h-14 items-center justify-between px-6">
        <span className="font-semibold text-base">Carteira Uber</span>
        <nav className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <Separator />
    </header>
  )
}
