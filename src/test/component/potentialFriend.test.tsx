import React from 'react';
import { render, screen, waitFor, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, beforeEach, afterEach} from 'vitest';
vi.mock('../../app/potentialFriend/actions', () => ({
  getPotentialFriend: vi.fn(),
  sendRequest: vi.fn()
}));
import PfriendView from '../../app/potentialFriend/View';
import { AppProvider } from '../../app/AppContext';
import * as PfriendActions from '../../app/potentialFriend/actions';
import type { member } from '../../friend/index'

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

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

it('nothing appear when potnential friends not exist', async () => {
  vi.mocked(PfriendActions.getPotentialFriend).mockResolvedValue([]);
  render(
    <AppProvider>
      <PfriendView />
    </AppProvider>
  );
  // await waitFor(() => {
  //   expect(screen.getByText('No posts yet!')).toBeDefined();
  // });
});

it('list of potential friends display when available', async () => {
  const mockfriend: member[] = [
    { id: '1919', name: 'jack'},
    { id: '2010', name: 'molly' },
  ]
  
  vi.mocked(PfriendActions.getPotentialFriend).mockResolvedValue(mockfriend);
  
  render(
    <AppProvider>
      <PfriendView />
    </AppProvider>
  );
  await waitFor(() => {
    expect(screen.getAllByLabelText('potentialFriend')).toHaveLength(2);
  });
});

it('click send request to member', async () => {
  const friends: member[] = [{ id: '1919', name: 'jack' }]
  vi.mocked(PfriendActions.getPotentialFriend).mockResolvedValue(friends)

  render(
    <AppProvider>
      <PfriendView />
    </AppProvider>
  )
  const send = await screen.findByLabelText('SendRequest')
  await userEvent.click(send)
  expect(PfriendActions.sendRequest).toHaveBeenCalledWith('1919')
})




