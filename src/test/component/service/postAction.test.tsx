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

import { createPost, getPost } from '../../../app/post/actions';

beforeEach(() => {
  vi.clearAllMocks();

  cookieGet.mockReturnValue({ value: '09090909' });
  mockDecrypt.mockResolvedValue('12334456');

  mockQuery
    .mockResolvedValue({ rows: [{ name: 'molly' }] })
    .mockResolvedValue({
      rows: [{
        id: '19283',
        content: 'hello doggie',
        posted: new Date(),
        image: null
      }]
    });
});

it('postCreate with the session cookie assigned', async () => {
  await createPost({ content: 'hello david', image: '' });
  expect(cookieGet).toHaveBeenCalledWith('session');
});


it('getPost with the session cookie assigned', async () => {
  await getPost(1);
  expect(cookieGet).toHaveBeenCalledWith('session');
});

it('session cookie missed and authentication error throw', async () => {
  cookieGet.mockReturnValue(undefined);
  await expect(createPost({ content: 'Hi, jack', image: '' }))
    .rejects.toThrow('Authentication invalid');
});

const mockRedirect = vi.fn().mockImplementation(() => {
  throw new Error('redirect to login');
});

vi.mock('next/navigation', () => ({
  redirect: (path: string) => mockRedirect(path)
}));

it('should redirect to login when session cookie is missing', async () => {
  cookieGet.mockReturnValue(undefined);
  try {
    await getPost(1);
  } catch {
    expect(mockRedirect).toHaveBeenCalledWith('/login');
  }
});
  