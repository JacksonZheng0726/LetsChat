// src/app/login/View.test.tsx
import React from 'react';
import {it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginView from '../../app/login/View';
import LoginPage from '../../app/login/page';
import * as nav from 'next/navigation';


vi.mock('../../app/login/actions', () => ({
  login: vi.fn(() => Promise.resolve({name:'jack'}))
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}));

const routePush = vi.fn();
const returnValue = vi.fn();

/* reference: https://github.com/vercel/next.js/discussions/48937 */
beforeEach(() => {
  vi.mocked(nav.useRouter).mockReturnValue({
    push: routePush,
    prefetch: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn()
  });
  /* reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty */
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      setItem: returnValue,
    },
  });
});

afterEach(() => {
  cleanup();
});

it('Login page render works', () => {
  render(<LoginView />);
  expect(screen.getByText('CSE187 Assignment 3')).toBeDefined();
});

it('input email and passwod for valid login', async () => {
  render(<LoginView />);
  const emailInput = screen.getByPlaceholderText('Email Address');
  const passwordInput = screen.getByPlaceholderText('Password');
  await userEvent.type(emailInput, 'jack@gmail.com');
  await userEvent.type(passwordInput, '2ifjw93784983');
  await userEvent.click(screen.getByText('Sign in'));
  await waitFor(() => {
    expect(returnValue).toHaveBeenCalledWith('name','jack');
  });
});

it('loginView component run inside the loginPage', () => {
  render(<LoginPage />);
  expect(screen.getByText('CSE187 Assignment 3')).toBeDefined();
});
