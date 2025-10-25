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
  async signUp(name: string, email: string, password: string) {
    const checkEmail = `
    SELECT id FROM member 
    WHERE data->>'email' = $1::text`;
  
  const existing = await pool.query(checkEmail, [email]);
  
  if (existing.rows.length > 0) {
    throw new Error('EMAIL_EXISTS');
  }
    const insertion = `
    INSERT INTO member(data) 
    VALUES (
      jsonb_build_object(
        'email', $2::text,
        'name', $1::text,
        'pwhash', crypt($3::text, gen_salt('bf')),
        'roles', '["member"]'::jsonb
      )
    )
    RETURNING id, data->>'email' as email, data->>'name' as name;`
    const query = {
      text: insertion,
      values: [name, email, password],
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