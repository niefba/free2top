'use client'

import { useFormStatus } from 'react-dom'
import { useActionState, useState } from 'react'

import { Input, Select, Textarea, Checkbox } from '@/app/ui/field-label'
import { createCourse, updateCourse, deleteCourse } from '@/app/actions/course'
import Link from 'next/link'
import { CourseProps } from '@/app/lib/definitions'

export function CourseForm ({id, target, itinerary, description, category, dateBegin, altitude, ascending, hours, publicTransport, dateStamm, inactive} : CourseProps) {
    // Update or create a course
    const [state, action] = useActionState(id ? updateCourse.bind(null, id) : createCourse, undefined)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const categories : {value: string, label: string}[] = [
        { value: "", label: "" },
        { value: "ski touring", label: "Ski de randonnée" },
        { value: "trekking", label: "Randonnée pédestre" },
        { value: "splitboard", label: "Splitboard" }
    ];

    return (
        <form action={action} className='grow max-w-3xl'>
            
            <Input id="target" init={target} label="Objectif" error={state?.errors?.target}></Input>
            <Input id="itinerary" init={itinerary} label="Itinéraire" error={state?.errors?.itinerary}></Input>
            <Checkbox id="publicTransport" checked={publicTransport} label="Transports publics"></Checkbox>
            <Input id="dateBegin" type="date" init={dateBegin?.substring(0, 10)} label="Date de la course" error={state?.errors?.dateBegin}></Input>
            <Input id="dateStamm" type="date" init={dateStamm?.substring(0, 10)} label="Date du Stamm" error={state?.errors?.dateStamm}></Input>
            <div className="grid sm:grid-cols-3 sm:gap-4">
                <Input id="altitude" type="number" init={altitude} label="Altitude en mètres" error={state?.errors?.altitude}></Input>
                <Input id="ascending" type="number" init={ascending} label="Dénivelé en mètres" error={state?.errors?.ascending}></Input>
                <Input id="hours" type="number" init={hours} label="Temps en heures" error={state?.errors?.hours}></Input>
            </div>
            <Textarea id="description" init={description} label="Description" error={state?.errors?.description}></Textarea>
            <Select id='category' init={category} label="Catégorie" options={categories} error={state?.errors?.category}></Select>
            <Checkbox id="inactive" checked={inactive} label="Désactiver les demandes d'inscription"></Checkbox>

            { state?.message && <p className='px-2 pt-4 text-red-400'>{state?.message}</p>}
            

            <div className="flex justify-center mt-6">
            { !confirmDelete && id &&
                <DeleteButton handleClick={() => setConfirmDelete(true)}></DeleteButton>
            }
            { !confirmDelete &&
            <>
                <SubmitButton />
                <Link className='btn' href="/dashboard">Annuler</Link>
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
    <button className='btn-primary'
        disabled={pending}
        type="submit">
        Enregistrer
    </button>
    )
}
 
function DeleteButton({handleClick} : {handleClick: () => void}) {
    const { pending } = useFormStatus()
    
    return (
    <button className='btn'
        disabled={pending}
        onClick={handleClick}>
        Supprimer
    </button>
    )
}

function ConfirmDeleteButton({id} : {id: string}) {
    
    return (
    <button className='btn-primary'
        onClick={() => deleteCourse(id)}>
        Oui
    </button>
    )
}

function CancelDeleteButton({handleClick} : {handleClick: () => void}) {
    
    return (
    <button className='btn'
        onClick={handleClick}>
        Non
    </button>
    )
}