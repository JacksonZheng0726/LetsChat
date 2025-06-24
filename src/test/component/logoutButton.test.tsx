import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect} from 'vitest';
import LogoutButton from '../../app/post/View/LogoutButton';


const routePush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: routePush,
  }),
}));

vi.mock('../../app/login/actions');

it('logout button trigger when click it and back to the login page', async () => {
  render(<LogoutButton />);
  const logoutButton = screen.getByLabelText('logoutButton');
  await userEvent.click(logoutButton);
  expect(routePush).toHaveBeenCalledWith('/login');
});