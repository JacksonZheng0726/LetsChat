import {member} from './index'
// import {dbServ as authdb} from '../auth/dbService'
import {dbServ} from './dbService'
import {idConvert} from './idEncrypt'
// import {dbServ as authDB} from '../auth/dbService'

export class friend {
  public async pendingFriend(memberID: string): Promise<member[]> {
    const result = await new dbServ().getPendingFriend(memberID)
    return result
  }
  
  public async acceptFriend(idRequestMem: string, idReceiveMem: string) {
    if (idRequestMem !== idReceiveMem) {
      await new dbServ().acceptFriendReq(idRequestMem, idReceiveMem);
    }
  }
  // public async friendDeletion(idRequestMem: string, idReceiveMem: string): Promise<member|undefined> {
  //   if (idRequestMem !== idReceiveMem) {
  //     const result = await new dbServ().deleteFriend(idRequestMem, idReceiveMem);
  //     if (result) {
  //       const memberDetail = await new authdb().getmemberID(idReceiveMem);
  //       const memberidToken = await new idConvert().idTojwt(memberDetail.id);
  //       return {
  //         id: memberidToken,
  //         name: memberDetail.data.name
  //       };
  //     }
  //   }
  // }
  public async getAllFriend(memberID: string): Promise<member[]> {
    const friends = await new dbServ().getAllfriend(memberID);
    const convert = await Promise.all(friends.map(async (friend) => {
      const memberidToken = await new idConvert().idTojwt(friend.id);
      return {
        ...friend,
        id: memberidToken
      }
    }))
    return convert;
  }
}
  

