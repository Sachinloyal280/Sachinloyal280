"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
// Add a fallback mechanism to the component
// Import the fallback data
import { fallbackUrls } from "@/lib/fallback-data"

interface CourseUrl {
  id: string
  url: string
  title?: string | null
  description?: string | null
}

interface CourseDetailProps {
  courseId: string
}

export function CourseDetail({ courseId }: CourseDetailProps) {
  const [urls, setUrls] = useState<CourseUrl[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  // Add this at the beginning of the component function:
  const [errorState, setErrorState] = useState(false)

  // Update the useEffect to include the fallback mechanism:
  useEffect(() => {
    // Skip fetching if no courseId is provided
    if (!courseId) {
      setIsLoading(false)
      return
    }

    let isMounted = true

    async function fetchCourseWithUrls() {
      try {
        setIsLoading(true)
        setErrorState(false)

        try {
          const response = await fetch(`/api/courses/${courseId}/urls`)

          if (!response.ok) {
            console.error(`Error response: ${response.status} ${response.statusText}`)
            const errorData = await response.json().catch(() => ({}))
            console.error("Error details:", errorData)
            throw new Error(`Failed to fetch course URLs: ${response.status}`)
          }

          const data = await response.json()

          if (isMounted) {
            if (data.urls && Array.isArray(data.urls)) {
              setUrls(data.urls)
            } else {
              console.log("No URLs found or invalid format", data)
              setUrls([])
            }
          }
        } catch (fetchError) {
          console.error("Fetch operation failed:", fetchError)
          if (isMounted) {
            setErrorState(true)
            // Use fallback data
            setUrls(fallbackUrls)
          }
        }
      } catch (error) {
        console.error("Error in fetchCourseWithUrls:", error)
        if (isMounted) {
          setErrorState(true)
          setUrls(fallbackUrls)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchCourseWithUrls()

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false
    }
  }, [courseId])

  if (isLoading) {
    return (
      <div className="space-y-2 mt-4">
        <div className="h-5 bg-muted rounded-md w-1/4 mb-2"></div>
        <Card className="animate-pulse">
          <CardContent className="p-4">
            <div className="h-4 bg-muted rounded-md w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded-md w-1/2"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Add this after the loading check but before the "no URLs" check:
  if (errorState) {
    // Don't show anything if there was an error
    return null
  }

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
