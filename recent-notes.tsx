import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUserNotes } from "@/lib/data"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export async function RecentNotes() {
  const notes = await getUserNotes(5) // Get 5 most recent notes

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Notes</CardTitle>
          <CardDescription>Your latest study notes</CardDescription>
        </div>
        <Link href="/dashboard/notes">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{note.courseTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{note.content}</p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">You haven't created any notes yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
