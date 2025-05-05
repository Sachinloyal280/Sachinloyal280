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
import { Link, Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Define a type for our URL objects
interface ResourceUrl {
  id: string
  url: string
  title: string
  description: string
}

// Create a function to get URLs from localStorage
function getStoredUrls(courseId: string): ResourceUrl[] {
  if (typeof window === "undefined") return []

  try {
    const storedData = localStorage.getItem(`course_urls_${courseId}`)
    return storedData ? JSON.parse(storedData) : []
  } catch (error) {
    console.error("Error retrieving URLs from localStorage:", error)
    return []
  }
}

// Create a function to save URLs to localStorage
function saveUrlsToStorage(courseId: string, urls: ResourceUrl[]) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(`course_urls_${courseId}`, JSON.stringify(urls))
  } catch (error) {
    console.error("Error saving URLs to localStorage:", error)
  }
}

export function ClientUrlManager({ courseId }: { courseId: string }) {
  const [urls, setUrls] = useState<ResourceUrl[]>([])
  const [isAddingUrl, setIsAddingUrl] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const { toast } = useToast()

  // Load URLs from localStorage on component mount
  useEffect(() => {
    setUrls(getStoredUrls(courseId))
  }, [courseId])

  // Function to add a new URL
  function handleAddUrl(e: React.FormEvent) {
    e.preventDefault()

    if (!newUrl) {
      toast({
        title: "Error",
        description: "URL is required",
        variant: "destructive",
      })
      return
    }

    // Create a new URL object
    const newUrlObject: ResourceUrl = {
      id: Date.now().toString(), // Simple ID generation
      url: newUrl.startsWith("http") ? newUrl : `https://${newUrl}`,
      title: newTitle || newUrl,
      description: newDescription || "",
    }

    // Update state with the new URL
    const updatedUrls = [...urls, newUrlObject]
    setUrls(updatedUrls)

    // Save to localStorage
    saveUrlsToStorage(courseId, updatedUrls)

    // Reset form and close dialog
    setNewUrl("")
    setNewTitle("")
    setNewDescription("")
    setIsAddingUrl(false)

    toast({
      title: "Success",
      description: "URL added successfully",
    })
  }

  // Function to delete a URL
  function handleDeleteUrl(urlId: string) {
    const updatedUrls = urls.filter((url) => url.id !== urlId)
    setUrls(updatedUrls)

    // Save to localStorage
    saveUrlsToStorage(courseId, updatedUrls)

    toast({
      title: "Success",
      description: "URL deleted successfully",
    })
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

      {urls.length > 0 ? (
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
