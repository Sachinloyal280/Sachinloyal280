import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Personalized Learning Experience
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                EduHub helps you organize your learning journey with customizable playlists, progress tracking, and
                AI-driven insights.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted md:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 rounded-lg bg-background/80 p-6 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 rounded bg-muted"></div>
                    <div className="h-4 w-full rounded bg-muted"></div>
                    <div className="h-4 w-2/3 rounded bg-muted"></div>
                    <div className="h-8 w-1/3 rounded bg-primary/70"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
