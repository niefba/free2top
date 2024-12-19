'use server'

import { redirect } from 'next/navigation';

import { verifyToken } from "@/app/lib/dal";
import { CourseFormSchema, CourseFormState } from '@/app/lib/definitions'

export async function createCourse(state: CourseFormState, formData: FormData) {

    const target = formData.get('target');
    const itinerary = formData.get('itinerary');
    const description = formData.get('description');
    const category = formData.get('category');
    const dateBegin = formData.get('dateBegin');
    const altitude = Number(formData.get('altitude'));
    const ascending = Number(formData.get('ascending'));
    const hours = Number(formData.get('hours'));
    const publicTransport = Boolean(formData.get('publicTransport'));

    // Validate form fields
    const validatedFields = CourseFormSchema.safeParse({
        target,
        itinerary,
        description,
        category,
        dateBegin,
        altitude,
        ascending,
        hours
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Merci de vérifier les informations saisies"
        }
    }

    const authToken = await verifyToken()
    const response = await fetch(`${process.env.API_URL}/api/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${authToken}` },
      body: JSON.stringify({ target, itinerary, description, category, dateBegin, altitude,
        ascending,
        hours,
        publicTransport }),
    })
    
    if (response.ok) {
      redirect('/dashboard')
    } else {
        // Handle errors
        return {
          message: 'Les informations saisies sont incorrects.'
        }
    }
    
}

export async function updateCourse(id: string, state: CourseFormState, formData: FormData) {

  const target = formData.get('target');
  const itinerary = formData.get('itinerary');
  const description = formData.get('description');
  const category = formData.get('category');
  const dateBegin = formData.get('dateBegin');
  const altitude = Number(formData.get('altitude'));
  const ascending = Number(formData.get('ascending'));
  const hours = Number(formData.get('hours'));
  const publicTransport = Boolean(formData.get('publicTransport'));

  // Validate form fields
  const validatedFields = CourseFormSchema.safeParse({
      target,
      itinerary,
      description,
      category,
      dateBegin,
      altitude,
      ascending,
      hours
  })
  
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
      return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Merci de vérifier les informations saisies"
      }
  }

  const authToken = await verifyToken()
  const response = await fetch(`${process.env.API_URL}/api/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${authToken}` },
    body: JSON.stringify({ target, itinerary, description, category, dateBegin, altitude,
      ascending,
      hours,
      publicTransport }),
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

export async function deleteCourse(id: string) {

  const authToken = await verifyToken()
  const response = await fetch(`${process.env.API_URL}/api/courses/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${authToken}` }
  })
  
  if (response.ok) {
    redirect('/dashboard')
  } else {
      // Handle errors
      return {
        message: 'La suppression a échouée.'
      }
  }
  
}