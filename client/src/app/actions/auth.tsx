import { SigninFormSchema, FormState } from '@/app/lib/definitions'
import router from 'next/router'
 
export async function signup(state: FormState, formData: FormData) {
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
  const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    })
 
    if (response.ok) {
        router.push('/profile')
    } else {
        // Handle errors
        router.push('/error')
    }
}