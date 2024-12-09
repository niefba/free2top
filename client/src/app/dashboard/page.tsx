
interface Course {
    id: string;
    target?: string;
    itinerary?: string;
    description?: string;
  }

export default async function Dashboard() {
    const courses = await fetch('http://server_free2top:4000/api/courses')
    const {data} = await courses.json()
    
    return (
      <>
        {data.map((course: Course) => (
          <CourseRow key={course.id} course={course}></CourseRow>
        ))}
      </>
    )
}

function CourseRow({course}: {course: Course}) {
    return (
        <div className="flex flex-row bg-stone-50 m-2 p-1
            hover:bg-stone-100
            rounded-md border-solid border border-zinc-300
            divide-x text-zinc-400">
            <div className="basis-1/3 px-1 line-clamp-1 hover:line-clamp-none font-bold">{course.target} - {course.itinerary}</div>
            <div className="basis-2/3 px-1">{course.description}</div>
        </div>
    )
}