import { z } from 'zod'

// Signin
export const SigninFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Votre adresse mail' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Votre mot de passe' })
    .trim(),
})
 
export type SigninFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

// Signup
export const SignupFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Votre adresse mail' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Votre mot de passe' })
    .trim(),
})
 
export type SignupFormState =
  | {
      errors?: {
        email?: string[]
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
  altitude: z
    .number()
    .int('Un nombre entier est attendu')
    .positive('Alitude non valide'),
  ascending: z
    .number()
    .int('Un nombre entier est attendu')
    .positive('Dénivelé non valide'),
  hours: z
    .number()
    .int('Un nombre entier est attendu')
    .positive('Temps non valide'),
  dateStamm: z
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
        altitude?: string[]
        ascending?: string[]
        hours?: string[]
        dateStamm?: string[]
      }
      message?: string
    }
  | undefined