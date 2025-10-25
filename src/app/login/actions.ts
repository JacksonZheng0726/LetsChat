'use server'

import { cookies } from 'next/headers'

import { Credentials, Authenticated, SignUpInfo} from '../../auth'
import {authenticate, accountCreation} from '../../auth/service'
import {encrypt} from '../../auth/jwtAuth'

export async function login(credentials: Credentials) : Promise<Authenticated|undefined> {
  const user = await authenticate(credentials)
  if (user) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
    const session = await encrypt(user.id)
    const cookieStore = await cookies()
   
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    return { name: user.name }
  }
  return undefined
}

export async function signUp(credentials: SignUpInfo) {
  try {
    const user = await accountCreation(credentials);
    
    if (!user) {
      console.error('Sign up failed: No user returned');
      return null;
    }
    
    console.log('Sign up successful:', user);
    return user;
    
  } catch (error: any) {
    console.error('Sign up error:', error);
    return null;
  }
}

export async function logout() {
   const cookieStore = await cookies()
   cookieStore.delete('session')
}
