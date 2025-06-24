import { vi, it, expect, beforeEach } from 'vitest';
import { authenticate } from '../../../auth/service';

vi.mock('../../../auth/dbService', () => ({
  dbServ: vi.fn().mockImplementation(() => ({
    loginCheck: vi.fn(),
    getmemberID: vi.fn()
  }))
}));

import {dbServ} from '../../../auth/dbService';

beforeEach(() => {
  vi.clearAllMocks();
});

it('should return user when credentials are valid', async () => {
  const mockUser = {
    id: '0928',
    name: 'Jack',
    data: {}
  };
  vi.mocked(dbServ).mockImplementation(() => ({
    loginCheck: vi.fn().mockResolvedValue(mockUser),
    getmemberID: vi.fn()
  }));
  const result = await authenticate({email: 'jack@gmail.com', password: '12334'});
  expect(result).toEqual({ id: '0928', name: 'Jack' });
});

it('should return undefined when credentials are invalid', async () => {
  vi.mocked(dbServ).mockImplementation(() => ({
    loginCheck: vi.fn().mockResolvedValue(null),
    getmemberID: vi.fn()
  }));
  const result = await authenticate({email: 'wrong@gmail.com', password: '01010'});
  expect(result).toBeUndefined();
});
