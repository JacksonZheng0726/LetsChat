// import {SessionUser} from '../types'
// import {Credentials, Authenticated} from './schema'
import {Credentials, User} from './index'

import {dbServ} from './dbService'

// const encodedKey = new TextEncoder().encode(process.env.MASTER_SECRET)
export async function authenticate(credentials: Credentials): Promise<User|undefined> {
  const dbSer = new dbServ();
  const memberUser = await dbSer.loginCheck(credentials.email, credentials.password);
  if (!memberUser || memberUser.data.deleted === 'true') {
    return;
  }
  if (memberUser) {
    return { id: memberUser.id, name: memberUser.name }
  }
}