import React from 'react';
import {render, screen} from '@testing-library/react';
import {expect, it} from 'vitest';
import PostHeader from '../../app/post/View/header';
import PfriendHeader from '../../app/potentialFriend/viewComponent/header';

it('post header test', () => {
  render(<PostHeader />);
  const headerText = screen.getByText('Posts');
  expect(headerText).toBeDefined();
});


it('potential friend header test', () => {
  render(<PfriendHeader />);
  const headerText = screen.getByText('Friends');
  expect(headerText).toBeDefined();
});
