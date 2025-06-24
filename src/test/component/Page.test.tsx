import { it, expect, vi} from 'vitest';
import React from 'react'
import { render, screen} from '@testing-library/react'
import Page from '../../app/page';
import PfriendPage from '../../app/potentialFriend/page';
// import PfriendPage from '../../app/potentialFriend/actions';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push:    vi.fn(),
    prefetch: vi.fn(),
    replace:  vi.fn(),
    back:     vi.fn(),
    forward:  vi.fn(),
    refresh:  vi.fn(),
  }),
}));

vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn()
  })
}));

vi.mock('../../app/post/actions', () => ({
  getPost: vi.fn().mockResolvedValue([]),
  createPost: vi.fn()
}));

vi.mock('../../app/potentialFriend/actions', () => ({
  getPotentialFriend: vi.fn().mockResolvedValue([]),
  sendRequest: vi.fn()
}));


it('the postview works inside the provider', async () => {
  render(<Page />)
  expect( screen.getByPlaceholderText("What's on your mind?")).toBeDefined()
})


it('the potential friend page works inside the provider', async () => {
  render(<PfriendPage />)
  expect(screen.getByText('Add Friends')).toBeDefined()
})

