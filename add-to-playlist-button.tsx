"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Playlist {
  id: string
  name: string
}

interface AddToPlaylistButtonProps {
  courseId: string
}

export function AddToPlaylistButton({ courseId }: AddToPlaylistButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([])
  const { toast } = useToast()
  const router = useRouter()

  // Fetch user's playlists when the dialog opens
  useEffect(() => {
    if (open) {
      fetchPlaylists()
    }
  }, [open])

  async function fetchPlaylists() {
    try {
      const response = await fetch("/api/playlists")
      if (!response.ok) {
        throw new Error("Failed to fetch playlists")
      }
      const data = await response.json()
      setPlaylists(data.playlists || [])
    } catch (error) {
      console.error("Error fetching playlists:", error)
      toast({
        title: "Error",
        description: "Failed to load your playlists. Please try again.",
        variant: "destructive",
      })
    }
  }

  function handlePlaylistChange(playlistId: string) {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId) ? prev.filter((id) => id !== playlistId) : [...prev, playlistId],
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/playlists/add-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          playlistIds: selectedPlaylists,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add course to playlists")
      }

      toast({
        title: "Success",
        description: "Course added to selected playlists",
      })

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error adding course to playlists:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add to Playlist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add to Playlist</DialogTitle>
            <DialogDescription>Select the playlists you want to add this course to</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div key={playlist.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`playlist-${playlist.id}`}
                    checked={selectedPlaylists.includes(playlist.id)}
                    onCheckedChange={() => handlePlaylistChange(playlist.id)}
                  />
                  <Label htmlFor={`playlist-${playlist.id}`}>{playlist.name}</Label>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                You don't have any playlists yet. Create a playlist first.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || selectedPlaylists.length === 0 || playlists.length === 0}>
              {isLoading ? "Adding..." : "Add to Playlists"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
