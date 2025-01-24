import { z } from 'zod'
import { SKI_TOURING, TREKKING, SPLITBOARD } from '@/app/lib/constants'

// Signin Form Validation
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

// Signup Form Validation
export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Votre prénom' })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: 'Votre nom de famille' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Votre adresse mail' })
    .trim(),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Votre mot de passe doit contenir au moins une lettre, un chiffre, un caractère spécial, et avoir une longueur minimale de 8 caractères.')
    .trim(),
  confirm: z
    .string()
    .trim(),
}).refine((data) => data.password === data.confirm, {
  message: "Les mots de passe ne correpondent pas",
  path: ["confirm"], // path of error
});
 
export type SignupFormState =
  | {
      errors?: {
        firstName?: string[]
        lastName?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined


// Course Form Validation
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

// Course Props
export interface CourseProps {
  id?: string,
  target: string,
  itinerary: string,
  description: string,
  category: CourseCategory,
  dateBegin: string,
  altitude?: number,
  ascending?: number,
  hours?: number,
  publicTransport?: boolean,
  dateStamm?: string,
  inactive?: boolean
}

type CourseCategory = "" | typeof SKI_TOURING | typeof TREKKING | typeof SPLITBOARD;
