import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface PlaylistHeaderProps {
  playlist: {
    id: string
    name: string
    courses: {
      id: string
      title: string
      description?: string | null
    }[]
  }
}

export function PlaylistHeader({ playlist }: PlaylistHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/playlists">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{playlist.name}</h1>
        </div>
        <p className="text-muted-foreground">
          {playlist.courses.length} {playlist.courses.length === 1 ? "course" : "courses"}
        </p>
      </div>
      <div className="flex gap-2">
        <Link href={`/dashboard/playlists/${playlist.id}/edit`}>
          <Button variant="outline">Edit Playlist</Button>
        </Link>
      </div>
    </div>
  )
}
