// import {member} from './index'
// // import {dbServ as authdb} from '../auth/dbService'
// import {dbServ} from './dbService'
// import {idConvert} from './idEncrypt'

// export class friendCreate {
//   // public async friendDeletion(idRequestMem: string, idReceiveMem: string): Promise<member|undefined> {
//   //   if (idRequestMem !== idReceiveMem) {
//   //     const result = await new dbServ().deleteFriend(idRequestMem, idReceiveMem);
//   //     if (result) {
//   //       const memberDetail = await new authdb().getmemberID(idReceiveMem);
//   //       const memberidToken = await new idConvert().idTojwt(memberDetail.id);
//   //       return {
//   //         id: memberidToken,
//   //         name: memberDetail.data.name
//   //       };
//   //     }
//   //   }
//   // }
//   public async getAllFriend(memberID: string): Promise<member[]> {
//     const friends = await new dbServ().getAllfriend(memberID);
//     const convert = await Promise.all(friends.map(async (friend) => {
//       const memberidToken = await new idConvert().idTojwt(friend.id);
//       return {
//         ...friend,
//         id: memberidToken
//       }
//     }))
//     return convert;
//   }
  
// }
