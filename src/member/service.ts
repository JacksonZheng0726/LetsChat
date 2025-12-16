import {dbServ} from './dbService'
import {dbServ as authDB} from '../auth/dbService'
import { member } from '@/friend';
// import { idConvert } from '@/friend/idEncrypt';

export class potentialFriend {
  public async getPotentialFriend(memberID: string): Promise<member[]>  {
    const potentialFriend = await new dbServ().getPotentialFriend(memberID);
    return potentialFriend
  }
  
  public async updateAvatarAction(memberId: string, avatarBase64: string) {
    await new dbServ().updateAvatar(memberId, avatarBase64);
  }

  public async friendRequestCreation(idRequestMem: string, idReceiveMem: string): Promise<member|undefined> {
    await new authDB().getmemberID(idReceiveMem);
    // if (deletedMember.data.deleted === 'true') {
    //   throw Error("The request receiver has been deleted");
    // }
    if (idRequestMem !== idReceiveMem) {
      const result = await new dbServ().friendRequestCreate(idRequestMem, idReceiveMem);
      if (!result) {
        return undefined;
      }
  //     const memberidToken = await new idConvert().idTojwt(result.id);
  //     return {
  //       ... result,
  //       id: memberidToken
  //     }
  //   }
  // }
    }
  }
}

