export interface Course {
  id: string
  title: string
  description?: string | null
  isPublic: boolean
  creatorId?: string | null
  createdAt: string
  updatedAt: string
}
