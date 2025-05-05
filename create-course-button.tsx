"use client"

import type React from "react"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { PlusCircle, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function CreateCourseButton() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [urls, setUrls] = useState<{ url: string; title: string; description: string }[]>([])
  const [currentUrl, setCurrentUrl] = useState("")
  const [currentUrlTitle, setCurrentUrlTitle] = useState("")
  const [currentUrlDescription, setCurrentUrlDescription] = useState("")

  function handleAddUrl() {
    if (!currentUrl) return

    setUrls([
      ...urls,
      {
        url: currentUrl,
        title: currentUrlTitle,
        description: currentUrlDescription,
      },
    ])

    setCurrentUrl("")
    setCurrentUrlTitle("")
    setCurrentUrlDescription("")
  }

  function handleRemoveUrl(index: number) {
    setUrls(urls.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the server action to create a course
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          isPublic,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create course")
      }

      // If we have URLs, add them to the course
      if (urls.length > 0) {
        for (const urlItem of urls) {
          await fetch(`/api/courses/${data.course.id}/urls`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(urlItem),
          })
        }
      }

      toast({
        title: "Success",
        description: "Course created successfully",
      })

      setTitle("")
      setDescription("")
      setIsPublic(true)
      setUrls([])
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error creating course:", error)
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
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Course</DialogTitle>
            <DialogDescription>Create a new course to share with others</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="public">Make this course public</Label>
            </div>

            <div className="space-y-2 mt-4">
              <Label>Resource URLs (Optional)</Label>
              <div className="space-y-2">
                {urls.map((urlItem, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border rounded-md">
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate">{urlItem.title || urlItem.url}</p>
                      <p className="text-xs text-muted-foreground truncate">{urlItem.url}</p>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveUrl(index)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border rounded-md p-3">
                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="urlTitle">Title (Optional)</Label>
                  <Input
                    id="urlTitle"
                    value={currentUrlTitle}
                    onChange={(e) => setCurrentUrlTitle(e.target.value)}
                    placeholder="Resource title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="urlDescription">Description (Optional)</Label>
                  <Input
                    id="urlDescription"
                    value={currentUrlDescription}
                    onChange={(e) => setCurrentUrlDescription(e.target.value)}
                    placeholder="Brief description"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={handleAddUrl}
                  disabled={!currentUrl}
                >
                  Add URL
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
