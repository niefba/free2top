import { verifyToken } from '@/app/lib/dal'
import { CourseForm } from '@/app/ui/course-form'
import Link from 'next/link'

export default async function Course({params} : { params: Promise<{ id: string }> }) {
    
    const id = (await params).id

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const authToken = await verifyToken()
    const courses = await fetch(`${process.env.API_URL}/api/courses/${id}`,  {
      method: 'GET',
      headers: { 'Authorization': `Basic ${authToken}` }
    })
    const {data, readonly} = await courses.json()

    // Check if the date of stamm is in the future and the course is not inactive
    const isOpen = !data.inactive && (new Date().setHours(0,0,0,0) < new Date(data.dateStamm).setHours(0,0,0,0))

    return (
        !readonly ?
        <CourseForm {...data}></CourseForm>
        :
        <div className='lg:flex lg:justify-center'>
          <div className='m-2 grow max-w-3xl'>
            <h1 className='text-2xl mb-4'>
              {data.target} - {data.itinerary}
              <span className="pl-4 md:float-right text-stone-400">{ data.category }</span>
            </h1>
            
            <div className='flex flex-wrap'>
              <div className="grid gap-x-4 grid-cols-2 mb-4 items-center">
                <strong className='text-right'>Date de la course</strong>
                <span>{ new Date(data.dateBegin).toLocaleDateString('fr-FR', options) }</span>
                <strong className='text-right'>Date du Stamm</strong>
                <span>{ new Date(data.dateStamm).toLocaleDateString('fr-FR', options) }</span>
                <strong className='text-right'>Altitude</strong>
                <span>{ data.altitude } mètres</span>
                <strong className='text-right'>Dénivelé</strong>
                <span>{ data.ascending } mètres</span>
                <strong className='text-right'>Temps</strong>
                <span>{ data.hours } heures</span>
                <strong className='text-right'>Accessible en transports publics</strong>
                <span>{ data.publicTransport ? "Oui" : "Non" }</span>
              </div>
              <div className='flex-auto min-w-96 bg-stone-100 dark:bg-stone-700 rounded p-2'>
              {
                data.description.split("\n").map((line: string, key: number) => {
                  return <div key={key}>{line}</div>;
                })
              }
              </div>
            </div>

            <div className='flex flex-wrap justify-center m-4'>
              { isOpen &&
                <Link className='btn' href={`mailto:${data.user.email}?subject=${data.target} - ${data.itinerary}`}>S&apos;inscrire</Link>
              }
              <Link className='btn' href="/dashboard">Annuler</Link>
            </div>
          </div>
        </div>

    )
}


