import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, afterEach } from 'vitest';
import Nav from '../../app/post/View/NavigationView';
import FriendNav from '../../app/potentialFriend/viewComponent/NavigationView';

const routePush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: routePush,
  }),
}));

vi.mock('../../app/login/actions', () => ({
  logout: vi.fn(),
}));

afterEach(() => {
  cleanup();
});


it('navigate to home when home button clicked', async () => {
  render(<Nav />);
  const LogoutButton = screen.getByLabelText("logoutButton");
  await userEvent.click(LogoutButton);
  expect(routePush).toHaveBeenCalledWith('/login');
});

it('navigate to home when home button clicked', async () => {
  render(<Nav />);
  const homeBut = screen.getByLabelText('homeButton');
  await userEvent.click(homeBut);
  expect(routePush).toHaveBeenCalledWith('/');
});

it('should navigate to profile page when profile button is clicked', async () => {
  render(<Nav />);
  const friendRequestButton = screen.getByLabelText('requestButton');
  await userEvent.click(friendRequestButton);
  expect(routePush).toHaveBeenCalledWith('/potentialFriend');
});

/* for the potential friend nevigation */

it('navigate to home when home button clicked', async () => {
  render(<FriendNav />);
  const LogoutButton = screen.getByLabelText("logoutButton");
  await userEvent.click(LogoutButton);
  expect(routePush).toHaveBeenCalledWith('/login');
});

it('navigate to home when home button clicked', async () => {
  render(<FriendNav />);
  const homeBut = screen.getByLabelText('homeButton');
  await userEvent.click(homeBut);
  expect(routePush).toHaveBeenCalledWith('/');
});

it('should navigate to profile page when profile button is clicked', async () => {
  render(<FriendNav />);
  const friendRequestButton = screen.getByLabelText('requestButton');
  await userEvent.click(friendRequestButton);
  expect(routePush).toHaveBeenCalledWith('/potentialFriend');
});