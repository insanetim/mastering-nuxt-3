import type { LessonWithPath } from '~/types/course'

export default async () => {
  const course = await useCourse()

  return course.value.chapters[0].lessons[0] as LessonWithPath
}
