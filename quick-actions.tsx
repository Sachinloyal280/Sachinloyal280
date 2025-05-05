import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ListMusic, BookOpen, StickyNote, BarChart } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Shortcuts to common tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link href="/dashboard/playlists" className="w-full">
          <Button variant="outline" className="w-full justify-start">
            <ListMusic className="mr-2 h-4 w-4" />
            My Playlists
          </Button>
        </Link>
        <Link href="/dashboard/courses" className="w-full">
          <Button variant="outline" className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse Courses
          </Button>
        </Link>
        <Link href="/dashboard/notes" className="w-full">
          <Button variant="outline" className="w-full justify-start">
            <StickyNote className="mr-2 h-4 w-4" />
            View Notes
          </Button>
        </Link>
        <Link href="/dashboard/progress" className="w-full">
          <Button variant="outline" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" />
            Track Progress
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
