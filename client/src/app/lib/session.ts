import 'server-only'
import { cookies } from 'next/headers'
 
export async function createSession(token: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    // 3. Store the session in cookies for optimistic auth checks
    const cookieStore = await cookies()
    cookieStore.set('authToken', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('authToken')
}
  