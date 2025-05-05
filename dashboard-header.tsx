"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"
import { useSession } from "next-auth/react"

export function DashboardHeader() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between w-full px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger />
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold">EduHub</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {session?.user && <UserNav user={session.user} />}
        </div>
      </div>
    </header>
  )
}
