import { vi, it, expect, beforeEach } from 'vitest'

vi.mock('../../../db', () => ({
  pool: {
    query: vi.fn()
  }
}))

vi.mock('../../../auth/dbService', () => ({
  dbServ: class {
    async getmemberID() {}
  }
}))


import { pool } from '../../../db'
import { dbServ as friendDb } from '../../../member/dbService'
import {dbServ as authDB} from '../../../auth/dbService'

beforeEach(() => {
  vi.clearAllMocks()
})

it('deleted request will caused undefined return', async () => {
  type QueryResponse = {
    mockResolvedValueOnce(arg0: { rows: { data: { requestStatus: string } }[] }): unknown
    rows: Array<{
      data: {
        requestStatus: string;
      };
    }>;
  };
  
  (pool.query as unknown as QueryResponse).mockResolvedValueOnce({
    rows: [{ data: { requestStatus: 'delete' } }]
  });
  const result = await new friendDb().friendRequestCreate('requester', 'receiver')
  expect(result).toBeUndefined()
})

it('already exist of pending request will return undefined', async () => {
  type QueryResponse = {
    mockResolvedValueOnce(arg0: { rows: { data: { requestStatus: string } }[] }): unknown
    rows: Array<{
      data: {
        requestStatus: string;
      };
    }>;
  };
  
  (pool.query as unknown as QueryResponse).mockResolvedValueOnce({
    rows: [{ data: { requestStatus: 'waiting' } }]
  });
  const result = await new friendDb().friendRequestCreate('requester', 'receiver')
  expect(result).toBeUndefined()
})

it('inserts a new waiting request and returns the receiver’s id & name', async () => {
  type QueryResponse = {
    mockResolvedValueOnce(arg0: { rows: { data: { requestStatus: string } }[] }): unknown
    rows: Array<{
      data: {
        requestStatus: string;
      };
    }>;
  };
  
  (pool.query as unknown as QueryResponse).mockResolvedValueOnce({
    rows: []
  });
  (pool.query as unknown as QueryResponse).mockResolvedValueOnce({
    rows: []
  });
  const fakeMember = { id: '1010', data: { name: 'Molly' } }
  vi.spyOn(authDB.prototype, 'getmemberID')
    .mockResolvedValue(fakeMember)
  const result = await new friendDb().friendRequestCreate('requester', 'receiver')
  expect(result).toEqual({ id: '1010', name: 'Molly' })
})