// dbService.ts
import { pool } from '../db';

export class dbServ {
  async loginCheck(email: string, password: string) {
    const select = `
      select *
      from member 
      where data->>'email' = $1 
      and data->>'pwhash' = crypt($2, data->>'pwhash')
    `;
    const query = {
      text: select,
      values: [email, password],
    };
    const result = await pool.query(query);
    return result.rows[0];
  }
  public async getmemberID(id: string) {
    const select =
    `SELECT * FROM member
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