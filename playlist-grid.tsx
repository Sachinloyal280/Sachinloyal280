import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getPlaylists } from "@/lib/data"
import { ListMusic, Pencil } from "lucide-react"
import Link from "next/link"
import { DeletePlaylistButton } from "@/components/delete-playlist-button"

export async function PlaylistGrid() {
  const playlists = await getPlaylists()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <Card key={playlist.id} className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <ListMusic className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">{playlist.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {playlist.courseCount} {playlist.courseCount === 1 ? "course" : "courses"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between p-6 pt-0">
              <Link href={`/dashboard/playlists/${playlist.id}`}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
              <div className="flex gap-2">
                <Link href={`/dashboard/playlists/${playlist.id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
                <DeletePlaylistButton id={playlist.id} />
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <ListMusic className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg">No playlists yet</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            Create your first playlist to organize your learning content
          </p>
        </div>
      )}
    </div>
  )
}
