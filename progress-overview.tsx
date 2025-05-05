import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getUserProgress } from "@/lib/data"
import { BarChart, PieChart } from "lucide-react"

export async function ProgressOverview() {
  // Get user progress data
  const progress = await getUserProgress()

  // Calculate overall progress
  const overallProgress =
    progress.length > 0 ? Math.round(progress.reduce((acc, item) => acc + item.progress, 0) / progress.length) : 0

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5" />
            Overall Progress
          </CardTitle>
          <CardDescription>Your average progress across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Completion</p>
              <p className="text-sm text-muted-foreground">{overallProgress}%</p>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="mr-2 h-5 w-5" />
            Course Breakdown
          </CardTitle>
          <CardDescription>Progress for individual courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.length > 0 ? (
              progress.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.progress}%</p>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">You haven't started any courses yet.</p>
                <p className="text-muted-foreground">Browse courses to begin your learning journey.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
