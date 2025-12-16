import { pool } from '../db';
import {dbServ as Frienddb} from '../friend/dbService'
/* reference: https://www.postgresql.org/docs/current/functions-formatting.html */
export class dbServ {
  public async postCreate(memberName: string, content: string, image?: string) {
    const select = `
      INSERT INTO post (member, data)
      VALUES (
        $1::uuid,
        jsonb_build_object(
          'posted', to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
          'content', $2::text,
          'image', $3::text
        )
      )
      RETURNING id, member, data->>'posted' as posted, data->>'content' as content, data->>'image' as image
    `;
    const query = {
      text: select,
      values: [memberName, content, image],
    };
    const result = await pool.query(query);
    return result.rows[0];
  }
  public async getPost(memberId: string, page: number, size: number) {
    const postNum = size;
    const offset = (page - 1) * postNum;
    const friends = await new Frienddb().getAllfriend(memberId);
    const memAndFriendIds = [memberId].concat(friends.map(friend => friend.id));
    
    const select = `
      SELECT 
        P.id,
        M.data->>'name' as member,
        M.data->>'avatar' as avatar,
        P.data->>'posted' as posted,
        P.data->>'content' as content,
        P.data->>'image' as image
      FROM post AS P
      JOIN member AS M on P.member = M.id
      WHERE P.member = ANY($1) AND
      (NOT M.data ? 'deleted')
      ORDER BY P.data->>'posted' DESC
      LIMIT $2
      OFFSET $3
    `;

    
    const query = {
      text: select,
      values: [memAndFriendIds, postNum, offset],
    };
    
    const result = await pool.query(query);
    
    return result.rows.map(row => ({
      id: row.id,
      member: row.member,
      avatarUrl: row.avatar,
      posted: row.posted,
      content: row.content,
      image: row.image
    }));
  }
  public async getmemberName(id: string) {
    const select =
    `SELECT data->'name' as name
    FROM member
    WHERE id = $1
    `;
    const query = {
      text: select,
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows[0];
  }
}
