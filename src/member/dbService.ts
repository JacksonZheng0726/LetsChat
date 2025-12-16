import { pool } from '../db';
import {dbServ as authDB} from '../auth/dbService'
/* reference: https://www.postgresql.org/docs/current/functions-formatting.html */
export class dbServ {
  public async getPotentialFriend(id: string) {
    const select =
    `select M.id, M.data->'name' as name
    FROM member AS M
    where M.id != $1 AND
    (NOT M.data ? 'deleted') AND
    not exists (
      SELECT 1 FROM friend F
      WHERE (F.memberOne = $1 AND F.memberTwo = M.id OR F.memberOne = M.id AND F.memberTwo = $1)
      AND (F.data->>'requestStatus' = 'accept' OR F.data->>'requestStatus' = 'waiting')
    )
    `;
    const query = {
      text: select,
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows;
  }

  public async friendRequestCreate(idRequestMem: string, idReceiveMem: string) {
    console.log('Request from:', idRequestMem);
    console.log('Request to:', idReceiveMem);
    const select =
    `select *
    from friend AS F
    where(F.memberOne = $1 AND F.memberTwo = $2) OR
    (F.memberOne = $2 AND F.memberTwo = $1)`
    const query = {
      text: select,
      values: [idRequestMem, idReceiveMem],
    };
    const result = await pool.query(query);
    const acceptReq = result.rows.filter(
      row => row.data.requestStatus === 'accept'
    );
    if (acceptReq.length >= 1) {
      return;
    }
    const rejectReq = result.rows.filter(
      row => row.data.requestStatus === 'delete'
    );
    if (rejectReq.length >= 1) {
      return;
    }
    /* reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
    const moreThanTwoPend = result.rows.filter(
      row => row.data.requestStatus === 'waiting'
    );
    if (moreThanTwoPend.length >= 1) {
      return;
    }
    const insert = 
    `INSERT INTO friend(memberOne, memberTwo,data)
      VALUES (
        $1::uuid,
        $2::uuid,
        jsonb_build_object(
          'requestStatus', 'waiting',
          'posted', NOW()
        )
      )
      returning *`
      const query2 = {
        text: insert,
        values: [idRequestMem, idReceiveMem],
      };
      await pool.query(query2);
    const member = await new authDB().getmemberID(idReceiveMem)
    return {id: member.id, name: member.data.name}
  }
  public async updateAvatar(memberId: string, avatarBase64: string) {
    const select = `
      UPDATE member
      SET data = jsonb_set(data, '{avatar}', to_jsonb($1::text), true)
      WHERE id = $2::uuid
      RETURNING data->>'avatar' as avatar
    `;
    const result = await pool.query(select, [avatarBase64, memberId]);
    return result.rows[0];
  }
}