import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { it, expect, vi} from 'vitest'
import FriendList from '../../app/potentialFriend/viewComponent/friendList'
import { AppProvider } from '../../app/AppContext'
import * as friendActions from '../../app/potentialFriend/actions'
import type { member } from '../../friend/index'

vi.mock('../../app/potentialFriend/actions', () => ({
  getPotentialFriend: vi.fn(),
}))

// vi.mock('next/headers', () => ({
//   cookies: () => ({
//     get: () => ({ value: 'fake‑session' })
//   })
// }))

it('renders a list of potential friends', async () => {
  const mockfriend: member[] = [
    { id: '1919', name: 'jack'},
    { id: '2010', name: 'molly' },
  ]
  vi.mocked(friendActions.getPotentialFriend).mockResolvedValue(mockfriend)
  render(
    <AppProvider>
      <FriendList />
    </AppProvider>
  )
  await waitFor(() => {
    const items = screen.getAllByLabelText('potentialFriend')
    expect(items).toHaveLength(2)
  })
})
