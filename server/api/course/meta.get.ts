import type {
  Chapter,
  Course,
  CourseMeta,
  Lesson,
  OutlineChapter,
  OutlineLessons
} from '~/types/course'
import course from '~/server/courseData'

course as Course

export default defineEventHandler((): CourseMeta => {
  const outline: OutlineChapter[] = course.chapters.reduce(
    (prev: OutlineChapter[], next: Chapter) => {
      const lessons: OutlineLessons[] = next.lessons.map((lesson: Lesson) => ({
        title: lesson.title,
        slug: lesson.slug,
        number: lesson.number,
        path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`
      }))

      const chapter: OutlineChapter = {
        title: next.title,
        slug: next.slug,
        number: next.number,
        lessons
      }

      return [...prev, chapter]
    },
    []
  )

  return {
    title: course.title,
    chapters: outline
  }
})
