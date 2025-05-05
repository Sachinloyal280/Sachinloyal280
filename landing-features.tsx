import { BookOpen, ListChecks, StickyNote, Brain, LayoutDashboard } from "lucide-react"

export function LandingFeatures() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to enhance your learning experience
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ListChecks className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Customizable Playlists</h3>
            <p className="text-center text-muted-foreground">
              Edit courses or create your own, tailoring content to your specific learning needs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Progress Tracking</h3>
            <p className="text-center text-muted-foreground">
              Monitor your completion and identify areas that need more focus in real-time.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <StickyNote className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Integrated Notes</h3>
            <p className="text-center text-muted-foreground">
              Take notes during videos for quick revision and better comprehension.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">AI-Driven Insights</h3>
            <p className="text-center text-muted-foreground">
              Get personalized recommendations to enhance your learning experience.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Course Library</h3>
            <p className="text-center text-muted-foreground">
              Access a wide range of courses and educational content in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
