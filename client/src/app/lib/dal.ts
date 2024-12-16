// Data Access Layer (DAL)

import 'server-only'

import {cache} from 'react';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export const verifyToken = cache(async () => {
  const authToken = (await cookies()).get('authToken')?.value
 
  if (!authToken) {
    redirect('/')
  }
  console.log(authToken)
  return authToken
})
