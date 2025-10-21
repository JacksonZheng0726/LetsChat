import { pool } from '../db';
/* reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */
export class dbServ {
  public async getAllfriend(memberID: string) {
    const select =
    ` select M.id AS friendid, M.data->>'name' AS friendname
    From friend as F, member as M
    WHERE ((F.memberOne = M.id AND F.memberTwo = $1) OR
      (F.memberOne = $1 AND F.memberTwo = M.id))
    AND F.data->>'requestStatus' = 'accept' 
    AND (NOT M.data ? 'deleted')`;
    const query = {
      text: select,
      values: [memberID],
    };
    const result = await pool.query(query);
    return result.rows.map((row)=> ({
      id: row.friendid,
      name: row.friendname
    }));
  }
//   public async acceptFriendReq(memberIDReceiver: string, memberIDSender: string) {
//   console.log('Accepting request - Receiver:', memberIDReceiver);
//   console.log('Accepting request - Sender:', memberIDSender);
  
//   const update = `
//     UPDATE friend
//     SET data = jsonb_set(data, '{requestStatus}', '"accept"')
//     WHERE ((memberOne = $1 AND memberTwo = $2) OR (memberOne = $2 AND memberTwo = $1))
//       AND data->>'requestStatus' = 'waiting'
//     RETURNING *
//   `;
  
//   const query = {
//     text: update,
//     values: [memberIDReceiver, memberIDSender],
//   };
  
//   await pool.query(query);
//   // console.log('Update affected rows:', result.rowCount);
//   // console.log('Update result:', result.rows);
  
//   // if (result.rows.length === 0) {
//   //   console.error('No friend request found to accept');
//   //   throw new Error('Friend request not found');
//   // }
  
//   // // Get the member info to return
//   // const memberQuery = await pool.query(
//   //   'SELECT id, data FROM member WHERE id = $1',
//   //   [memberIDSender]
//   // );
  
//   // return {
//   //   id: memberQuery.rows[0].id,
//   //   name: memberQuery.rows[0].data.name
//   // };
// }
  public async acceptFriendReq(memberIDReceiver: string, memberIDSender: string) {
    const select = `
    UPDATE friend
    SET data = jsonb_set(data, '{requestStatus}', '"accept"')
    WHERE (memberOne = $2 AND memberTwo = $1) AND data->>'requestStatus' = 'waiting'
    RETURNING *
  `;
    const query = {
      text: select,
      values: [memberIDReceiver, memberIDSender],
    };
    await pool.query(query);
  }
  public async getPendingFriend(memberID: string) {
    console.log('Getting pending requests for:', memberID);
    
    // Get requests WHERE this user is the RECEIVER (memberTwo)
    // and status is 'waiting'
    const select = `
      SELECT 
        m.id,
        m.data->>'name' as name
      FROM friend f
      JOIN member m ON f.memberOne = m.id
      WHERE f.memberTwo = $1
        AND f.data->>'requestStatus' = 'waiting'
    `;
    
    const query = {
      text: select,
      values: [memberID],
    };
    
    const result = await pool.query(query);
    console.log('Pending requests found:', result.rows.length);
    console.log('Pending requests data:', result.rows);
    
    return result.rows.map((row) => ({
      id: row.id,
      name: row.name
    }));
  }
}
//   public async getPendingFriend(memberID: string){
//     const select = 
//     `Select M.id AS friendid, M.data->>'name' AS friendname
//     FROM friend AS F, member AS M
//     WHERE F.memberOne = M.id 
//     AND F.data->>'requestStatus' = 'waiting' 
//     AND F.memberTwo = $1`
//     const query = {
//       text: select,
//       values: [memberID],
//     };
//     const result = await pool.query(query);
//     return result.rows.map((row)=> ({
//       id: row.friendid,
//       name: row.friendname
//     }));
//   }
// }