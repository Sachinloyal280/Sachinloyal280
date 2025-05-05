import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { db } from "@/lib/db"

export async function DELETE(request: NextRequest, { params }: { params: { id: string; urlId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: courseId, urlId } = params

    // Check if course exists
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if URL exists and belongs to the course
    const courseUrl = await db.courseUrl.findUnique({
      where: {
        id: urlId,
        courseId,
      },
    })

    if (!courseUrl) {
      return NextResponse.json({ error: "URL not found or does not belong to this course" }, { status: 404 })
    }

    // Delete the URL
    await db.courseUrl.delete({
      where: {
        id: urlId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting course URL:", error)
    return NextResponse.json({ error: "Failed to delete course URL" }, { status: 500 })
  }
}
