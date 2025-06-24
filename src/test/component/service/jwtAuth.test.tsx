import { vi, it, expect, beforeEach} from 'vitest';

vi.mock('jose', () => ({
  SignJWT: vi.fn(() => ({
    setProtectedHeader: vi.fn().mockReturnThis(),
    setIssuedAt: vi.fn().mockReturnThis(),
    setExpirationTime: vi.fn().mockReturnThis(),
    sign: vi.fn().mockResolvedValue('smart')
  })),
  
  jwtVerify: vi.fn((token) => 
    token === 'invalid-token'
      ? Promise.reject(new Error('Invalid token'))
      : Promise.resolve({ payload: { id: '0101' } })
  )
}));

import { encrypt, decrypt } from '../../../auth/jwtAuth';


beforeEach(() => {
  vi.clearAllMocks();
  process.env.MASTER_SECRET = 'todayismybirthday';
  TextEncoder = class encoderMock {
    encode() { 
      return new Uint8Array(); 
    }
  } as typeof TextEncoder;
});


it('midt jwt token created with the memberID', async () => {
  const token = await encrypt('0101');
  expect(token).toBe('smart');
});

it('jwt decode', async () => {
  const userId = await decrypt('today');
  expect(userId).toBe('0101');
});

it('undefined token test', async () => {
  const userId = await decrypt(undefined);
  expect(userId).toBe('0101');
});

it('Invalid token will trigger an error', async () => {
  await expect(decrypt('invalid-token')).rejects.toThrow('Invalid token');
});
