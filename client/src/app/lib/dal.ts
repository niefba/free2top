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

  return authToken
})

export const getUser = cache(async () => {
  const authToken = (await cookies()).get('authToken')?.value

  if (!authToken) return null
  const userProfile = await fetch(`${process.env.API_URL}/auth/profile`,  {
    method: 'GET',
    headers: { 'Authorization': `Basic ${authToken}` }
  })
  const user = await userProfile.json()
  return user
})

