import { verifyToken } from '@/app/lib/dal'
import { CourseForm } from '@/app/ui/course-form'

export default async function Course({params} : { params: Promise<{ id: string }> }) {
    
    const id = (await params).id

    const authToken = await verifyToken()
    const courses = await fetch(`${process.env.API_URL}/api/courses/${id}`,  {
      method: 'GET',
      headers: { 'Authorization': `Basic ${authToken}` }
    })
    const {data} = await courses.json()
    return (
        <CourseForm {...data}></CourseForm>
    )
}


