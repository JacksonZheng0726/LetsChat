'use server'

import {cookies} from 'next/headers'
import {decrypt} from '../../auth/jwtAuth'
import {potentialFriend} from '../../member/service'
import {friend} from '../../friend/service'
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
export async function getallFriend() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    throw new Error('Authentication invalid');
  }
  const memberId = await decrypt(sessionCookie);
  return await new friend().getAllFriend(memberId);
}
export async function getPendingFriend() {
  console.log('getPendingFriend action called');
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    throw new Error('Authentication invalid');
  }
  const memberId = await decrypt(sessionCookie);
  return await new friend().pendingFriend(memberId);
}

// export async function acceptReq(memberID:string) {
//   const cookieStore = await cookies();
//   const sessionCookie = cookieStore.get('session')?.value;
//   if (!sessionCookie) {
//     throw new Error('Authentication invalid');
//   }
//   const requestID = await decrypt(sessionCookie);
//   return await new friend().acceptFriend(requestID, memberID);
// }
export async function acceptReq(memberID: string) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    throw new Error('Authentication invalid');
  }
  const requestID = await decrypt(sessionCookie);
  
  console.log('Accepting request from:', memberID);
  console.log('Current user (receiver):', requestID);
  
  const result = await new friend().acceptFriend(requestID, memberID);
  console.log('Accept result:', result);
  return result;
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


