'use server'

import {cookies} from 'next/headers'
import {decrypt} from '../../auth/jwtAuth'
import {potentialFriend} from '../../member/service'
// import {NewPost} from '../../post/index'
// import { redirect } from 'next/navigation'


export async function getPotentialFriend() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    throw new Error('Authentication invalid');
  }
  const memberId = await decrypt(sessionCookie);
  return await new potentialFriend().getPotentialFriend(memberId);
}

export async function sendRequest(memberID: string) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    throw new Error('Authentication invalid');
  }
  const requestID = await decrypt(sessionCookie);
  return await new potentialFriend().friendRequestCreation(requestID, memberID);
}


