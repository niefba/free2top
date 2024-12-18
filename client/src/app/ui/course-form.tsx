'use client'

import { useFormStatus } from 'react-dom'
import { useActionState, useState } from 'react'

import Input, { Select, Textarea } from '@/app/ui/field-label'
import { createCourse, updateCourse, deleteCourse } from '@/app/actions/course'
import Link from 'next/link'

interface CourseProps {
    id?: string,
    target: string,
    itinerary: string,
    description: string,
    category: CourseCategory,
    dateBegin: string
}

type CourseCategory = "" | "ski touring" | "trekking" | "splitboard";

export function CourseForm ({id, target, itinerary, description, category, dateBegin} : CourseProps) {
    // Update or create a course
    const [state, action] = useActionState(id ? updateCourse.bind(null, id) : createCourse, undefined)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const categories = ["", "ski touring", "trekking", "splitboard"];

    return (
    <form action={action} className='m-2'>
        
        <Input id="target" init={target} label="Objectif" error={state?.errors?.target}></Input>
        <Input id="itinerary" init={itinerary} label="Itinéraire" error={state?.errors?.itinerary}></Input>
        <Input id="dateBegin" type="date" init={dateBegin?.substring(0, 10)} label="Date de la course" error={state?.errors?.dateBegin}></Input>
        <Textarea id="description" init={description} label="Description" error={state?.errors?.description}></Textarea>
        <Select id='category' init={category} label="Catégorie" options={categories} error={state?.errors?.category}></Select>

        { state?.message && <p className='px-2 pt-4 text-red-400'>{state?.message}</p>}
        

        <div className="flex justify-center mt-6">
        { !confirmDelete && id &&
            <DeleteButton handleClick={() => setConfirmDelete(true)}></DeleteButton>
        }
        { !confirmDelete &&
        <>
            <SubmitButton />
            <CancelButton href="/dashboard">Annuler</CancelButton>
        </>
        }
        { confirmDelete && id &&
        <>
            <span className="grid place-items-center">Confirmez-vous la suppression?</span>
            <ConfirmDeleteButton id={id}></ConfirmDeleteButton>
            <CancelDeleteButton handleClick={() => setConfirmDelete(false)}></CancelDeleteButton>
        </>
        }
        </div>
          
          
    </form>
    )
}
  
function SubmitButton() {
    const { pending } = useFormStatus()
    
    return (
    <button className='mx-2 appearance-none px-4 py-2 rounded-full border border-solid bg-black text-white hover:bg-gray-700'
        disabled={pending}
        type="submit">
        Enregistrer
    </button>
    )
}
 
function DeleteButton({handleClick} : {handleClick: () => void}) {
    const { pending } = useFormStatus()
    
    return (
    <button className='mx-2 appearance-none px-4 py-2 rounded-full border border-solid border-zinc-400 hover:bg-stone-100 hover:border-transparent'
        disabled={pending}
        onClick={handleClick}>
        Supprimer
    </button>
    )
}

function ConfirmDeleteButton({id} : {id: string}) {
    
    return (
    <button className='mx-2 appearance-none px-4 py-2 rounded-full border border-solid bg-black text-white hover:bg-gray-700'
        onClick={() => deleteCourse(id)}>
        Oui
    </button>
    )
}

function CancelDeleteButton({handleClick} : {handleClick: () => void}) {
    
    return (
    <button className='mx-2 appearance-none px-4 py-2 rounded-full border border-solid border-zinc-400 hover:bg-stone-100 hover:border-transparent'
        onClick={handleClick}>
        Non
    </button>
    )
}

function CancelButton({href, children} : {href:string, children: string}) {
    
    return (
    <Link className='mx-2 appearance-none px-4 py-2 rounded-full border border-solid border-zinc-400 hover:bg-stone-100 hover:border-transparent'
        href={href}>
        {children}
    </Link>
    )
}