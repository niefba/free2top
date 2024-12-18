import { z } from 'zod'

// Signin
export const SigninFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Votre nom d\'utilisateur' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Votre mot de passe' })
    .trim(),
})
 
export type SigninFormState =
  | {
      errors?: {
        name?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

// Course
export const CourseFormSchema = z.object({
  target: z
    .string()
    .min(2, { message: 'Votre objectif' })
    .trim(),
  itinerary: z
    .string()
    .min(6, { message: 'Votre itinéraire' })
    .trim(),
  description: z
    .string()
    .min(6, { message: 'Description trop brève' })
    .max(5000, { message: 'Description trop longue' })
    .trim(),
  category: z
    .string()
    .min(1, { message: 'Choisir une discipline' })
    .trim(),
  dateBegin: z
    .string()
    .date('Date non valide')
    .trim(),
})
  
export type CourseFormState =
  | {
      errors?: {
        target?: string[]
        itinerary?: string[]
        description?: string[]
        category?: string[]
        dateBegin?: string[]
      }
      message?: string
    }
  | undefined