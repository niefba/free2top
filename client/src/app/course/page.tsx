'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'

import FieldInput from '@/app/ui/field-input'
import { create } from '@/app/actions/course'

export default function Course() {
    const [state, action] = useActionState(create, undefined)

    return (
        <form action={action}>
      
 
            <FieldInput id="name" label="Utilisateur"></FieldInput>
            { state?.message && <p className='pt-4 text-xs text-red-400 max-w-64'>{state?.message}</p>}

            <div className="flex justify-center mt-6">
                <SubmitButton />
            </div>
            
            
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
   
    return (
      <button className='appearance-none px-4 py-2 rounded-full border border-solid border-zinc-400 hover:bg-stone-100 hover:border-transparent'
        disabled={pending}
        type="submit">
        Enregistrer
      </button>
    )
  }
  