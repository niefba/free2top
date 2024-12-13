'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

import { CourseFormSchema, CourseFormState } from '@/app/lib/definitions'

export async function create(state: CourseFormState, formData: FormData) {

    const target = formData.get('target');
    const itinerary = formData.get('itinerary');
    const description = formData.get('description');

    // Validate form fields
    const validatedFields = CourseFormSchema.safeParse({
        target,
        itinerary,
        description
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Merci de vérifier les informations saisies"
        }
    }

    // Call the provider or db to create a user...
    //const myHeaders = new Headers();
    //myHeaders.append('Authorization', 'dummy');
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')

    const response = await fetch(`${process.env.API_URL}/api/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${authToken?.value}` },
      body: JSON.stringify({ target, itinerary, description }),
    })
    console.log(response);
    if (response.ok) {
      redirect('/dashboard')
    } else {
        // Handle errors
        return {
          message: 'Les informations saisies sont incorrects.'
        }
    }
    
}