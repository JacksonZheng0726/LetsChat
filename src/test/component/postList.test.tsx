import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { it, expect, vi} from 'vitest'
import PostsList from '../../app/post/View/listPost'
// import { AppProvider } from '../../app/AppContext'
import * as postActions from '../../app/post/actions'
import type { Post } from '../../post'
// import { mock } from 'node:test'

vi.mock('../../app/post/actions', () => ({
  getPost: vi.fn(),
}))

it('renders a list of posts from context', async () => {
  const mockPosts: Post[] = [
    { id: '1919', content: 'I love cse114a', member: 'jack',  posted: new Date() },
    { id: '2010', content: 'I love cse187', image:'https://ucsc.com/image.jpg', member: 'david', posted: new Date() },
    { id: '2019', content: 'I love cse130', member: 'barbie', posted: new Date() },
  ]
  vi.mocked(postActions.getPost).mockResolvedValue(mockPosts)
  render(
      <PostsList posts={mockPosts} />
  )
  await waitFor(() => {
    const items = screen.getAllByLabelText('singlePost')
    expect(items).toHaveLength(3)
  })
})
