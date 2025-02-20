'use server'

import { redirect } from 'next/navigation';

import { verifyToken } from "@/app/lib/dal";
import { CourseFormSchema, CourseFormState } from '@/app/lib/definitions'

export async function createCourse(state: CourseFormState, formData: FormData) {

    const target = formData.get('target');
    const itinerary = formData.get('itinerary');
    const description = formData.get('description');
    const category = formData.get('category');
    const dateBegin = String(formData.get('dateBegin'));
    const altitude = Number(formData.get('altitude'));
    const ascending = Number(formData.get('ascending'));
    const hours = Number(formData.get('hours'));
    const publicTransport = Boolean(formData.get('publicTransport'));
    const dateStamm = String(formData.get('dateStamm'));
    const inactive = Boolean(formData.get('inactive'));

    // Validate form fields
    const validatedFields = CourseFormSchema.safeParse({
        target,
        itinerary,
        description,
        category,
        dateBegin,
        altitude,
        ascending,
        hours,
        dateStamm
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Merci de vérifier les informations saisies"
        }
    }

    // Check coherence of dates
    if (invalidDates(dateBegin, dateStamm)) {
      return {
        message: 'Les dates ne sont pas cohérentes.'
      }
    }

    const authToken = await verifyToken()
    const response = await fetch(`${process.env.API_URL}/api/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${authToken}` },
      body: JSON.stringify({ target, itinerary, description, category, dateBegin, altitude,
        ascending,
        hours,
        publicTransport,
        dateStamm,
        inactive
      }),
    })
    
    if (response.ok) {
      redirect('/dashboard')
    } else {
        // Handle errors
        return {
          message: 'Les informations saisies sont incorrectes.'
        }
    }
    
}

export async function updateCourse(id: string, state: CourseFormState, formData: FormData) {

  const target = formData.get('target');
  const itinerary = formData.get('itinerary');
  const description = formData.get('description');
  const category = formData.get('category');
  const dateBegin = String(formData.get('dateBegin'));
  const altitude = Number(formData.get('altitude'));
  const ascending = Number(formData.get('ascending'));
  const hours = Number(formData.get('hours'));
  const publicTransport = Boolean(formData.get('publicTransport'));
  const dateStamm = String(formData.get('dateStamm'));
  const inactive = Boolean(formData.get('inactive'));

  // Validate form fields
  const validatedFields = CourseFormSchema.safeParse({
      target,
      itinerary,
      description,
      category,
      dateBegin,
      altitude,
      ascending,
      hours,
      dateStamm
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
      return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Merci de vérifier les informations saisies"
      }
  }

  // Check coherence of dates
  if (invalidDates(dateBegin, dateStamm)) {
    return {
      message: 'Les dates ne sont pas cohérentes.'
    }
  }

  const authToken = await verifyToken()
  const response = await fetch(`${process.env.API_URL}/api/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${authToken}` },
    body: JSON.stringify({ target, itinerary, description, category, dateBegin, altitude,
      ascending,
      hours,
      publicTransport,
      dateStamm,
      inactive
    }),
  })
  if (response.ok) {
    redirect('/dashboard')
  } else {
      // Handle errors
      return {
        message: 'Les informations saisies sont incorrectes.'
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

function invalidDates(dateBegin: string, dateStamm: string) {
  return new Date(dateBegin).setHours(0,0,0,0) < new Date(dateStamm).setHours(0,0,0,0)
}