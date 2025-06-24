import { vi, it, expect, beforeEach } from 'vitest';
vi.mock('../../../db', () => ({
  pool: {
    query: vi.fn()
  }
}));
import { dbServ } from '../../../auth/dbService';
import { pool } from '../../../db';
import { Query } from 'pg';

beforeEach(() => {
  vi.clearAllMocks();
});

it('should query database with email and password', async () => {
  vi.mocked(pool.query).mockImplementation(() => Promise.resolve({rows: [{ id: '1010', name: 'jack', data: {} }]
    } as unknown as Query)
  );
  const result = await new dbServ().loginCheck('jack@books.com', '101010');
  expect(result).toEqual({id: '1010', name: 'jack', data: {}});
});

it('should return undefined when no user is found', async () => {
  vi.mocked(pool.query).mockImplementation(() => Promise.resolve({rows: []} as unknown as Query));
  const result = await new dbServ().loginCheck('invalid@books.com', 'invalid');
  expect(result).toBeUndefined();
});