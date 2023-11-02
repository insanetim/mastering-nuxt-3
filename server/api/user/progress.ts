import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'
import type { ChapterProgress, CourseProgress } from '~/types/course'
import type { ChapterOutline, LessonOutline } from '../course/meta.get'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  protectRoute(event)

  const user = await serverSupabaseUser(event)
  const userEmail = user?.email

  const userProgress = await prisma.lessonProgress.findMany({
    where: {
      userEmail,
      Lesson: {
        Chapter: {
          Course: {
            id: 1
          }
        }
      }
    },
    select: {
      completed: true,
      Lesson: {
        select: {
          slug: true,
          Chapter: {
            select: {
              slug: true
            }
          }
        }
      }
    }
  })

  const courseOutline = await $fetch('/api/course/meta')

  if (!courseOutline) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course outline not found'
    })
  }

  const progress = courseOutline.chapters.reduce(
    (courseProgress: CourseProgress, chapter: ChapterOutline) => {
      // Collect the progress for each chapter in the course
      courseProgress[chapter.slug] = chapter.lessons.reduce(
        (chapterProgress: ChapterProgress, lesson: LessonOutline) => {
          // Collect the progress for each lesson in the chapter
          chapterProgress[lesson.slug] =
            userProgress.find(
              progress =>
                progress.Lesson.slug === lesson.slug &&
                progress.Lesson.Chapter.slug === chapter.slug
            )?.completed || false

          return chapterProgress
        },
        {}
      )

      return courseProgress
    },
    {}
  )

  return progress
})
