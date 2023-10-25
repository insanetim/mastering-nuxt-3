import type { CourseOutline } from '~/server/api/course/meta.get'

export default async () => {
  return useFetchWithCache<CourseOutline>('/api/course/meta')
}
