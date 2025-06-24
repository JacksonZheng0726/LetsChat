import { it, expect, vi, beforeEach } from 'vitest';
vi.mock('next/server', () => {
  return {
    NextResponse: {
      next: vi.fn().mockReturnValue('nextRes'),
      redirect: vi.fn().mockReturnValue('redirectRes')
    }
  };
});

vi.mock('jose', () => {
  return {
    jwtVerify: vi.fn().mockResolvedValue({
      payload: { user: 'jack' },
      protectedHeader: { alg: 'HS256' }
    })
  };
});

import { NextRequest} from 'next/server';
import middleware from '../../../middleware';


beforeEach(() => {
  vi.clearAllMocks();
  TextEncoder = class {
    encode() {
      return new Uint8Array();
    }
  } as typeof TextEncoder;
  
  /* reference: https://www.geeksforgeeks.org/node-url-tostring-method/ */
  URL = function(url:string) {
    return {
      pathname: url,
      toString: function() {
        return '/login';
      }
    };
  } as unknown as typeof URL;
});

/* https://www.omarileon.me/blog/as-unknown-as-typescript */
it('without authentication to access the public route', async () => {
  const req = {
    nextUrl: {pathname: '/login'},
    cookies: { get: vi.fn().mockReturnValue(undefined)},
  } as unknown as NextRequest;
  const result = await middleware(req);
  expect(result).toBe("nextRes");
});

it('with the valid token to access the protected route', async () => {
  const req = {
    nextUrl: {pathname: '/'},
    cookies: { get: vi.fn().mockReturnValue({value:'1029383'})},
  } as unknown as NextRequest;
  const result = await middleware(req);
  expect(result).toBe('nextRes');
});

it('should redirect to login when no session cookie is present', async () => {
  const req = {
    nextUrl: {pathname: '/', origin: '/login'},
    cookies: { get: vi.fn().mockReturnValue(undefined)},
  } as unknown as NextRequest;
  const result = await middleware(req);
  expect(result).toBe("redirectRes");
});