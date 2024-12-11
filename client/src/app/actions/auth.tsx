import { SigninFormSchema, SigninFormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation';

export async function signup(state: SigninFormState, formData: FormData) {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    })
    console.log(response);
    if (response.ok) {
      redirect('/profile')
    } else {
        // Handle errors
        return {
          message: 'Vos identifiants sont incorrects. Vérifiez le nom d\'utilisateur et le mot de passe saisis puis recommencez.'
        }
    }
}