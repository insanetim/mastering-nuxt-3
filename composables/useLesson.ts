import type { LessonWithPath } from '~/types/course'

export default async (chapterSlug: string, lessonSlug: string) => {
  return useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  )
}
