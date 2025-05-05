import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getRecommendedCourses } from "@/lib/data"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export async function RecommendedCourses() {
  const courses = await getRecommendedCourses()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recommended Courses</CardTitle>
          <CardDescription>Courses tailored to your learning style and interests</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                </div>
                <Button size="sm" variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add to Playlist
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 py-8">
              <p className="text-center text-muted-foreground">
                No recommendations available yet. Complete your profile to get personalized recommendations.
              </p>
              <Link href="/dashboard/settings">
                <Button variant="outline">Update Profile</Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
