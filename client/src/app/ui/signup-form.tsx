'use client'
 
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'

import { signup } from '@/app/actions/auth'
import { Input } from '@/app/ui/field-label'

export function SignupForm() {
  const [state, action] = useActionState(signup, undefined)
 
  return (
    <form action={action}>
      
      <Input id="firstName" label="Prénom" error={state?.errors?.firstName}></Input>
      <Input id="lastName" label="Nom" error={state?.errors?.lastName}></Input>

      <Input id="email" label="Identifiant" placeholder="Adresse mail" error={state?.errors?.email}></Input>

      <Input id="password" label="Mot de passe" type="password" error={state?.errors?.password}></Input>
      <Input id="confirm" label="Confirmation" type="password" error={state?.errors?.confirm}></Input>

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
    <button className='btn'
      disabled={pending}
      type="submit">
      Sign Up
    </button>
  )
}


