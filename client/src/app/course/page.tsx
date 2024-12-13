'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'

import Input, { Textarea } from '@/app/ui/field-label'
import { create } from '@/app/actions/course'
import Link from 'next/link'

export default function Course() {
    const [state, action] = useActionState(create, undefined)

    return (
        <form action={action} className='m-2'>
      
 
            <Input id="target" label="Objectif" error={state?.errors?.target}></Input>
            <Input id="itinerary" label="Itinéraire" error={state?.errors?.itinerary}></Input>
            <Textarea id="description" label="Description" error={state?.errors?.description}></Textarea>

            { state?.message && <p className='pt-4 text-xs text-red-400 max-w-64'>{state?.message}</p>}
            

            <div className="flex justify-center mt-6">
                <SubmitButton />
                <CancelButton href="/dashboard">Annuler</CancelButton>
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
  
function CancelButton({href, children} : {href:string, children: string}) {
   
    return (
      <Link className='mx-2 appearance-none px-4 py-2 rounded-full border border-solid border-zinc-400 hover:bg-stone-100 hover:border-transparent'
        href={href}>
        {children}
      </Link>
    )
}
