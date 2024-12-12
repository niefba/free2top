type FormState =
  | {
      message?: string
    }
  | undefined

export function create(state: FormState, formData: FormData) {
    const name = formData.get('name');
    console.log(name)
    return { message: 'Please enter a valid email' }
    
}