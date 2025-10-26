'use server'

import { cookies } from 'next/headers'

import { Credentials, Authenticated, SignUpInfo, GoogleAuthenticated} from '../../auth'
import {authenticate, accountCreation, googleAuthenticate} from '../../auth/service'
import {encrypt} from '../../auth/jwtAuth'
import { OAuth2Client } from 'google-auth-library'
const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID)
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


export async function Googlelogin(token: string) : Promise<GoogleAuthenticated|undefined> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
  })
  const userInfo = ticket.getPayload()
  if (!userInfo) {
    return undefined
  }
  const {email, name, sub: googleID} = userInfo
  const user = await googleAuthenticate(email!, name!, googleID!)
  if (!user) {
    console.error('Failed to authenticate user')
    return undefined
  }
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
  }
  return {
  name: user.name,
  email: user.email || '',
  id: user.id
  }
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
    
  } catch (error) {
    console.error('Sign up error:', error);
    return null;
  }
}

export async function logout() {
   const cookieStore = await cookies()
   cookieStore.delete('session')
}
