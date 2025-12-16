import {NewPost, Post} from './index'
import {dbServ} from './dbService'
// import {idConvert} from '../auth/index'

export class memberPost {
  public async makePost(memberID: string, postDetail: NewPost): Promise<Post>  {
    const memberName = await new dbServ().getmemberName(memberID);
    const postMess = await new dbServ().postCreate (
      memberID,
      postDetail.content,
      postDetail.image
    )
    return {
      ...postMess,
      member: memberName.name
    }
  }
  
  public async getAllpost(memberID: string, page: number, size?: number): Promise<Post[]> {
    console.log('Getting posts for member:', memberID, 'page:', page, 'size:', size || 20);
    const realSize = size || 20;
    const postMess = await new dbServ().getPost(memberID, page, realSize);
    console.log('Posts retrieved:', postMess.length);
    return postMess;
  }

  
}