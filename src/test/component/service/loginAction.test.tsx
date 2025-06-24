import { vi, it, expect, beforeEach } from 'vitest';
import { login, logout } from '../../../app/login/actions';
import { authenticate } from '../../../auth/service';

const mockSet = vi.fn();
const mockDelete = vi.fn();

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: mockSet,
    delete: mockDelete
  })
}));

vi.mock('../../../auth/service', () => ({
  authenticate: vi.fn()
}));

vi.mock('../../../auth/jwtAuth', () => ({
  encrypt: vi.fn().mockResolvedValue('encrypted-session-token')
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(authenticate).mockReset();
});

it('should set cookie and return user name on successful authentication', async () => {
  vi.mocked(authenticate).mockResolvedValue({ id: '010101', name: 'Jack' });
  const credentials = { email: 'jack@gmail.com', password: '010101' };
  const result = await login(credentials);
  expect(result).toEqual({ name: 'Jack' });
});

it('should return undefined when authentication fails', async () => {
  vi.mocked(authenticate).mockResolvedValue(undefined);
  const credentials = { email: 'invalid@gmail.com', password: 'invalidCode' };
  const result = await login(credentials);
  expect(authenticate).toHaveBeenCalledWith(credentials);
  expect(mockSet).not.toHaveBeenCalled();
  expect(result).toBeUndefined();
});


it('should delete the session cookie when logging out', async () => {
  await logout();
  expect(mockDelete).toHaveBeenCalledWith('session');
});
    