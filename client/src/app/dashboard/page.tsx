import Link from "next/link";
import { verifyToken } from "@/app/lib/dal";

interface Course {
    id: string;
    target?: string;
    itinerary?: string;
    description?: string;
  }

export default async function Dashboard() {
  const authToken = await verifyToken()
  const courses = await fetch(`${process.env.API_URL}/api/courses`,  {
    method: 'GET',
    headers: { 'Authorization': `Basic ${authToken}` }
  })
  const {data} = await courses.json()
  
  return (
    <>
      {data.map((course: Course) => (
        <CourseRow key={course.id} course={course}></CourseRow>
      ))}
      <AddButton></AddButton>
    </>
  )
}

function CourseRow({course}: {course: Course}) {
    return (
        <Link href={`/course/${course.id}`} className="flex flex-row bg-stone-100 m-2 p-1
            rounded-md border-solid border border-zinc-300
            divide-x text-zinc-600">
            <div className="basis-1/3 px-1 line-clamp-1 hover:line-clamp-none font-bold">{course.target} - {course.itinerary}</div>
            <div className="basis-2/3 px-1">{course.description}</div>
        </Link>
    )
}

function AddButton() {
 
  return (
    <div className="flex justify-center mt-6">
      <Link className='px-4 py-2 rounded-full border border-solid border-zinc-400 hover:bg-stone-100 hover:border-transparent'
      href="/course">
        Proposer une nouvelle course
      </Link>
    </div>
  )
}