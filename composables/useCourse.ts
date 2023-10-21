import { CourseMeta } from '~/types/course'

export default async () => {
  return useFetchWithCache<CourseMeta>('/api/course/meta')
}
