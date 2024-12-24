import { verifyToken } from '@/app/lib/dal'
import { CourseForm } from '@/app/ui/course-form'

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
    
    return (
        !readonly ?
        <CourseForm {...data}></CourseForm>
        :
        <div className='p-4'>
          <h1 className='text-2xl mb-4'>
            {data.target} - {data.itinerary}
            <small className="absolute right-4">{ data.category }</small>
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
            <div className='flex-auto min-w-96 bg-stone-700 rounded p-2'>
              <span>{ data.description }</span>
            </div>
          </div>
        </div>

    )
}


