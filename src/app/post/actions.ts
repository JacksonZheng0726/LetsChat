'use server'

import {cookies} from 'next/headers'
import {decrypt} from '../../auth/jwtAuth'
import {memberPost} from '../../post/service'
import {NewPost} from '../../post/index'
import { redirect } from 'next/navigation'


export async function createPost(postDetail: NewPost) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    throw new Error('Authentication invalid');
  }
  const memberId = await decrypt(sessionCookie);
  return await new memberPost().makePost(memberId, postDetail);
}


export async function getPost(page:number) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    redirect('/login')
  }
  const memberId = await decrypt(sessionCookie);
  return await new memberPost().getAllpost(memberId, page);
}