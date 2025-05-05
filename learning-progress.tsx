import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getUserProgress } from "@/lib/data"

export async function LearningProgress() {
  const progress = await getUserProgress()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
        <CardDescription>Track your progress across all courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progress.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.progress}%</p>
              </div>
              <Progress value={item.progress} className="h-2" />
            </div>
          ))}

          {progress.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">You haven't started any courses yet.</p>
              <p className="text-muted-foreground">Browse courses to begin your learning journey.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
