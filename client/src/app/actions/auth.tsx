'use server'

import { SigninFormSchema, SigninFormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'


export async function signin(state: SigninFormState, formData: FormData) {
    const name = formData.get('name');
    const password = formData.get('password');
    
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    name,
    password
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  
  // Call the provider or db to create a user...
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    })
    
    const data = await response.json();
    if (response.ok && data.token) {
      // Save the token in a cookie
      (await cookies()).set('authToken', data.token)
      redirect('/dashboard')
    } else {
      // Handle errors
      return {
        message: 'Vos identifiants sont incorrects. Vérifiez le nom d\'utilisateur et le mot de passe saisis puis recommencez.'
      }
    }
}