"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ClientCourseResources } from "@/components/client-course-resources"

interface Course {
  id: string
  title: string
  description?: string | null
}

interface Playlist {
  id: string
  name: string
  courses: Course[]
}

interface PlaylistContentProps {
  playlistId: string
}

export function PlaylistContent({ playlistId }: PlaylistContentProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRemoving, setIsRemoving] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch(`/api/playlists/${playlistId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch playlist")
        }
        const data = await response.json()
        setPlaylist(data.playlist)
      } catch (error) {
        console.error("Error fetching playlist:", error)
        toast({
          title: "Error",
          description: "Failed to load playlist. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlaylist()
  }, [playlistId, toast])

  async function handleRemoveCourse(courseId: string) {
    setIsRemoving(courseId)

    try {
      const response = await fetch("/api/playlists/remove-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistId,
          courseId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove course from playlist")
      }

      // Update the local state to remove the course
      setPlaylist((prev) => {
        if (!prev) return null
        return {
          ...prev,
          courses: prev.courses.filter((course) => course.id !== courseId),
        }
      })

      toast({
        title: "Success",
        description: "Course removed from playlist",
      })
      router.refresh()
    } catch (error) {
      console.error("Error removing course:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRemoving(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-5 bg-muted rounded-md w-40 mb-2"></div>
                  <div className="h-4 bg-muted rounded-md w-60"></div>
                </div>
                <div className="h-8 w-8 bg-muted rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="font-medium text-lg">Playlist not found</h3>
        <p className="text-muted-foreground mt-1 mb-4">
          The playlist you're looking for doesn't exist or you don't have access to it.
        </p>
        <Link href="/dashboard/playlists">
          <Button>Back to Playlists</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {playlist.courses.length > 0 ? (
        playlist.courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    <Link href={`/dashboard/courses/${course.id}`} className="hover:underline">
                      {course.title}
                    </Link>
                  </h3>
                  {course.description && <p className="text-sm text-muted-foreground mt-1">{course.description}</p>}
                  <ClientCourseResources courseId={course.id} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCourse(course.id)}
                  disabled={isRemoving === course.id}
                >
                  {isRemoving === course.id ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">Remove from playlist</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="font-medium text-lg">No courses in this playlist</h3>
          <p className="text-muted-foreground mt-1 mb-4">Add courses to this playlist to get started</p>
          <Link href="/dashboard/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
