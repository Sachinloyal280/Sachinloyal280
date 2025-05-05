"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardWelcome() {
  const { data: session } = useSession()
  const userName = session?.user?.name || "there"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground">Here's an overview of your learning progress and recommended courses.</p>
        </div>
      </CardContent>
    </Card>
  )
}
