'use client'
 
import { useFormStatus } from 'react-dom'
import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export function SigninForm() {
  const [state, action] = useActionState(signup, undefined)
 
  return (
    <form action={action}>
      
 
      <FieldInput id="name" label="Utilisateur" error={state?.errors?.name}></FieldInput>

      <FieldInput id="password" label="Mot de passe" type="password" error={state?.errors?.password}></FieldInput>
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
    <button className='px-4 py-2 rounded-full border border-solid border-gray-400 hover:bg-[#f2f2f2] hover:border-transparent'
      disabled={pending}
      type="submit">
      Sign In
    </button>
  )
}

interface InputProps {
  id: string;
  name?: string;
  type?: string;
  label: string;
  disabled?: boolean;
  error?: string[];
}
function FieldInput({id, name=id, type="text", label, disabled=false, error} : InputProps) {
  return (
    <div>
      <div className="flex flex-col space-y-1">
        <label htmlFor={id} className="text-lg font-medium text-gray-700">{label}</label>
        <input type={type} id={id} name={name} placeholder={label} disabled={disabled}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
      </div>
      {error?.map((value, index) => 
        <p key={index} className='text-xs text-red-400'>{value}</p>
      )}
    </div>
    
  )
}
