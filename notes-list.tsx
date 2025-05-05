import { Card, CardContent } from "@/components/ui/card"
import { getUserNotes } from "@/lib/data"
import { formatDistanceToNow } from "date-fns"
import { DeleteNoteButton } from "@/components/delete-note-button"
import { EditNoteButton } from "@/components/edit-note-button"

export async function NotesList() {
  const notes = await getUserNotes()

  return (
    <div className="space-y-4">
      {notes.length > 0 ? (
        notes.map((note) => (
          <Card key={note.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{note.courseTitle}</h3>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{note.content}</p>
              <div className="flex justify-end gap-2">
                <EditNoteButton id={note.id} content={note.content} courseTitle={note.courseTitle} />
                <DeleteNoteButton id={note.id} />
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="font-medium text-lg">No notes yet</h3>
          <p className="text-muted-foreground mt-1 mb-4">Create your first note to capture your learning insights</p>
        </div>
      )}
    </div>
  )
}
