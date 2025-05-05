"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "lucide-react"

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

export function ClientCourseResources({ courseId }: { courseId: string }) {
  const [urls, setUrls] = useState<ResourceUrl[]>([])

  // Load URLs from localStorage on component mount
  useEffect(() => {
    setUrls(getStoredUrls(courseId))
  }, [courseId])

  // Don't display anything if there are no URLs
  if (urls.length === 0) {
    return null
  }

  return (
    <div className="space-y-2 mt-4">
      <h4 className="text-sm font-medium">Resources</h4>
      <div className="space-y-2">
        {urls.map((url) => (
          <Card key={url.id}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Link className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <a
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline text-primary"
                >
                  {url.title || url.url}
                </a>
              </div>
              {url.description && <p className="text-xs text-muted-foreground mt-1 ml-6">{url.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
