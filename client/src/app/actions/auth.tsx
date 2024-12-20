'use server'

import { SigninFormSchema, SigninFormState, SignupFormSchema, SignupFormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/app/lib/session';


export async function signin(state: SigninFormState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
    
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email,
    password
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  
  // Call the provider or db to create a user...
  const response = await fetch(`${process.env.API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
  const data = await response.json();
  console.log(data)
  if (response.ok && data.token) {
    console.log(data.user.role)
    // Create session with token
    createSession(data.token)
    redirect('/dashboard')
  } else {
    // Handle errors
    return {
      message: 'Vos identifiants sont incorrects. Vérifiez l\'adresse mail et le mot de passe saisis puis recommencez.'
    }
  }
}

export async function signup(state: SignupFormState, formData: FormData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirm = formData.get('confirm');
  
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    confirm
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Call the provider or db to create a user...
  const response = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      firstName,
      lastName,
      email,
      password }),
  })
  
  if (response.ok) {
    redirect('/')
  } else {
    // Handle errors
    return {
      message: 'Les informations saisies sont incorrects ou l\'adresse mail est déjà utilisée.'
    }
  }
}

export async function signout () {
  deleteSession()
  redirect('/')
}

