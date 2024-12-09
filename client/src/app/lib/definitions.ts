import { z } from 'zod'
 
export const SigninFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Votre nom d\'utilisateur.' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Votre mot de passe.' })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined