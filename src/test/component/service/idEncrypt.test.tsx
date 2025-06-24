import { vi, it, expect, beforeEach } from 'vitest';

/*https://vitest.dev/api/mock.html */
vi.mock('jose', () => {
  return {
    SignJWT: vi.fn().mockImplementation(() => ({
      setProtectedHeader: vi.fn().mockReturnThis(),
      setIssuedAt: vi.fn().mockReturnThis(),
      setExpirationTime: vi.fn().mockReturnThis(),
      sign: vi.fn().mockResolvedValue('mocked-jwt-token')
    })),
    jwtVerify: vi.fn().mockImplementation((token, key) => {
      if (key.length === 3) {
        if (token === 'authToken') {
          return Promise.resolve({
            payload: { id: '2004' },
            protectHeader: { alg: 'HS256' }
          });
        }
        return Promise.reject(new Error('Invalid token'));
      } 
      else if (key.length === 4) {
        if (token === 'midtToken') {
          return Promise.resolve({
            payload: { id: '2005' },
            protectHeader: { alg: 'HS256' }
          });
        }
        return Promise.reject(new Error('Invalid token'));
      }
    })
  };
});

import { SignJWT} from 'jose';
import { idConvert, jwtConvert } from '../../../friend/idEncrypt';


TextEncoder = class encoderMock {
  encode(input: string): Uint8Array {
    if (input === 'secretMIDT') {
      return new Uint8Array([10,20,30,60]);
    }
    return new Uint8Array([20,60,10]);
  }
} as typeof TextEncoder

beforeEach(() => {
  vi.clearAllMocks();
  process.env.MASTER_SECRET = 'secret';
});


it('should convert member ID to JWT token', async () => {
  const token = await new idConvert().idTojwt('2004');
  expect(SignJWT).toHaveBeenCalledWith({id: '2004'});
  expect(token).toBe('mocked-jwt-token');
});


it('valid authorization jwt test', async () => {
  const memberId = await new jwtConvert().jwtToid('authToken');
  expect(memberId).toBe('2004');
});

it('midt conversion test', async () => {
  const memberId = await new jwtConvert().jwtToid('midtToken');
  expect(memberId).toBe('2005');
});

it('if both of the key not match, then throw errors', async () => {
  await expect(new jwtConvert().jwtToid('invalid-token'))
    .rejects.toThrow('unknown ID token');
});


it('if the secret is missing the error should throw', async () => {
  delete process.env.MASTER_SECRET
  await expect(new jwtConvert().jwtToid('7677867867'))
    .rejects.toThrow('secret has error');
});