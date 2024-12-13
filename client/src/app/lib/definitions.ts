import { z } from 'zod'
 
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
  })
   
  export type CourseFormState =
    | {
        errors?: {
          target?: string[]
          itinerary?: string[]
          description?: string[]
        }
        message?: string
      }
    | undefined