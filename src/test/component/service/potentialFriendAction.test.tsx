import { vi, it, expect, beforeEach} from 'vitest';

const mockQuery = vi.fn();
vi.mock('../../../db', () => ({
  pool: {
    query: (text: string, values: []) => mockQuery(text, values)
  }
}));

const cookieGet = vi.fn();
const mockDecrypt = vi.fn<(token: string) => Promise<string>>();

vi.mock('next/headers', () => ({
  cookies: () => ({
    get: cookieGet,
  })
}));

vi.mock('../../../auth/jwtAuth', () => ({
  decrypt: (...args: [string]) => mockDecrypt(...args)
}));

import { getPotentialFriend, sendRequest} from '../../../app/potentialFriend/actions';

beforeEach(() => {
  vi.clearAllMocks();

  cookieGet.mockReturnValue({ value: '09090909' });
  mockDecrypt.mockResolvedValue('12334456');

  mockQuery
    .mockResolvedValue({ 
      rows: [{ 
        id: '2020',
        data: { 
          deleted: 'false',
          requestStatus: 'accept'
        } 
      }] 
    })
    .mockResolvedValueOnce({
      rows: [
        { data: 
          { deleted: 'false',
            requestStatus: 'accept'

        } }
      ]
    })
});

it('get potential friend with the session cookie assigned', async () => {
  await getPotentialFriend();
  expect(cookieGet).toHaveBeenCalledWith('session');
});

it('sendRequest with the session cookie assigned', async () => {
  await sendRequest('2020');
  expect(cookieGet).toHaveBeenCalledWith('session');
});

it('session cookie missed and authentication error throw for potential friend', async () => {
  cookieGet.mockReturnValue(undefined);
  await expect(getPotentialFriend())
    .rejects.toThrow('Authentication invalid');
});

it('session cookie missed and authentication error throw for sendrequest', async () => {
  cookieGet.mockReturnValue(undefined);
  await expect(sendRequest('2020'))
    .rejects.toThrow('Authentication invalid');
});
