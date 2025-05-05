"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AddToPlaylistButton } from "@/components/add-to-playlist-button"
import { DeleteCourseButton } from "@/components/delete-course-button"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string | null
}

export function CourseGrid() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        setCourses(data.courses || [])
      } catch (error) {
        console.error("Error fetching courses:", error)
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [toast])

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-muted rounded-md mb-2"></div>
              <div className="h-4 bg-muted rounded-md w-3/4"></div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="h-10 bg-muted rounded-md w-40"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.length > 0 ? (
        courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Link href={`/dashboard/courses/${course.id}`} className="hover:underline">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                </Link>
                <DeleteCourseButton id={course.id} title={course.title} />
              </div>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <AddToPlaylistButton courseId={course.id} />
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <h3 className="font-medium text-lg">No courses available</h3>
          <p className="text-muted-foreground mt-1">Create your first course or check back later for new content</p>
        </div>
      )}
    </div>
  )
}
