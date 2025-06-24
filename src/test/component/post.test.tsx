import React from 'react';
import { render, screen, waitFor, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, beforeEach, afterEach} from 'vitest';
import PostsView from '../../app/post/View';
import { AppProvider } from '../../app/AppContext';
import * as postActions from '../../app/post/actions';

vi.mock('../../app/post/actions', () => ({
  getPost: vi.fn(),
  createPost: vi.fn()
}));

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

it('empty array shown when no posts', async () => {
  vi.mocked(postActions.getPost).mockResolvedValue([]);
  render(
    <AppProvider>
      <PostsView />
    </AppProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('No posts yet!')).toBeDefined();
  });
});

it('posts display when available', async () => {
  const mockPosts = [
    { id: '010101', content: 'today is a good day', member: 'molly', posted: new Date()},
    { id: '202002', content: 'I love cse187', member: 'barbie', posted: new Date() }
  ];
  
  vi.mocked(postActions.getPost).mockResolvedValue(mockPosts);
  
  render(
    <AppProvider>
      <PostsView />
    </AppProvider>
  );
  await waitFor(() => {
    expect(screen.getAllByLabelText('singlePost')).toHaveLength(2);
  });
});

it('postCreation and the getPost will trigger', async () => {
  render(
    <AppProvider>
      <PostsView />
    </AppProvider>
  );
  const input = screen.getByPlaceholderText("What's on your mind?");
  await userEvent.type(input, 'I love today');
  await userEvent.click(screen.getByLabelText('submitButton'));
  expect(postActions.createPost).toHaveBeenCalledWith({
    content: 'I love today',
    image: ''
  });
});

it('postCreation and the getPost will trigger with the image', async () => {
  render(
    <AppProvider>
      <PostsView />
    </AppProvider>
  );
  const input = screen.getByPlaceholderText("What's on your mind?");
  await userEvent.type(input, 'I love today');
  const imageButton = screen.getByLabelText('imageButton');
  await userEvent.click(imageButton);
  const urlInput = screen.getByLabelText('Image URL');
  await userEvent.type(urlInput, 'https://example.com/image.jpg');
  await userEvent.click(screen.getByLabelText('submitButton'));
  expect(postActions.createPost).toHaveBeenCalledWith({
    content: 'I love today',
    image: 'https://example.com/image.jpg'
  });
});

