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
}