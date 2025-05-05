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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Link, Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CourseUrl {
  id: string
  url: string
  title?: string | null
  description?: string | null
}

interface CourseUrlManagerProps {
  courseId: string
}

export function CourseUrlManager({ courseId }: CourseUrlManagerProps) {
  const [urls, setUrls] = useState<CourseUrl[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingUrl, setIsAddingUrl] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchCourseWithUrls()
  }, [courseId])

  async function fetchCourseWithUrls() {
    try {
      setIsLoading(true)

      try {
        const response = await fetch(`/api/courses/${courseId}/urls`)

        if (!response.ok) {
          console.error(`Error response: ${response.status} ${response.statusText}`)
          const errorData = await response.json().catch(() => ({}))
          console.error("Error details:", errorData)
          throw new Error(`Failed to fetch URLs: ${response.status}`)
        }

        const data = await response.json()

        if (data.urls && Array.isArray(data.urls)) {
          setUrls(data.urls)
        } else {
          console.log("No URLs found or invalid format", data)
          setUrls([])
        }
      } catch (fetchError) {
        console.error("Fetch operation failed:", fetchError)
        setUrls([])
        toast({
          title: "Warning",
          description: "Could not load URLs. You can still add new ones.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error in fetchCourseWithUrls:", error)
      setUrls([])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAddUrl(e: React.FormEvent) {
    e.preventDefault()

    if (!newUrl) {
      toast({
        title: "Error",
        description: "URL is required",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/courses/${courseId}/urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: newUrl,
          title: newTitle || null,
          description: newDescription || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to add URL")
      }

      toast({
        title: "Success",
        description: "URL added successfully",
      })

      // Reset form and close dialog
      setNewUrl("")
      setNewTitle("")
      setNewDescription("")
      setIsAddingUrl(false)

      // Refresh URLs
      fetchCourseWithUrls()
      router.refresh()
    } catch (error) {
      console.error("Error adding URL:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteUrl(urlId: string) {
    try {
      const response = await fetch(`/api/courses/${courseId}/urls/${urlId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete URL")
      }

      toast({
        title: "Success",
        description: "URL deleted successfully",
      })

      // Refresh URLs
      fetchCourseWithUrls()
      router.refresh()
    } catch (error) {
      console.error("Error deleting URL:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Course Resources</h3>
        <Dialog open={isAddingUrl} onOpenChange={setIsAddingUrl}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add URL
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddUrl}>
              <DialogHeader>
                <DialogTitle>Add Resource URL</DialogTitle>
                <DialogDescription>Add a URL to this course as a learning resource</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="url">URL*</Label>
                  <Input
                    id="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Resource title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Brief description of this resource"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddingUrl(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Resource</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-5 bg-muted rounded-md w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded-md w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : urls.length > 0 ? (
        <div className="space-y-2">
          {urls.map((url) => (
            <Card key={url.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Link className="h-4 w-4 mr-2 text-primary" />
                      <a
                        href={url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline text-primary"
                      >
                        {url.title || url.url}
                      </a>
                    </div>
                    {url.description && <p className="text-sm text-muted-foreground">{url.description}</p>}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteUrl(url.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border rounded-lg">
          <p className="text-muted-foreground">No resources added yet</p>
          <p className="text-sm text-muted-foreground">Add URLs to provide learning resources for this course</p>
        </div>
      )}
    </div>
  )
}
