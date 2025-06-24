import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect, afterEach } from 'vitest';
import PostCreate from '../../app/post/View/postCreate';

const inputCreate= vi.fn();

afterEach(() => {
  cleanup(); 
});

it('should call onCreateNew when clicking send button with non-empty content', async () => {
  render(<PostCreate input={inputCreate} />);

  const textField = screen.getByPlaceholderText("What's on your mind?");
  const sendButton = screen.getByLabelText('submitButton');
  
  await userEvent.type(textField, 'Hi david!');
  await userEvent.click(sendButton);
  
  expect(inputCreate).toHaveBeenCalledWith('Hi david!', '');
});

it('should open dialog when clicking image button', async () => {
  render(<PostCreate input={vi.fn()} />);
  const imageButton = screen.getByLabelText('imageButton');
  await userEvent.click(imageButton);
  screen.getByText('Image URL Attachment')
});

it('should close dialog when clicking Cancel button', async () => {
  render(<PostCreate input={vi.fn()} />);
  const imageButton = screen.getByLabelText('imageButton');
  await userEvent.click(imageButton);
  const cancelButton = screen.getByText('Cancel');
  await userEvent.click(cancelButton);
});

it('should set image URL and call input with content and image URL', async () => {
  render(<PostCreate input={inputCreate} />);
  const textField = screen.getByPlaceholderText("What's on your mind?");
  await userEvent.type(textField, 'today is good');
  const imageButton = screen.getByLabelText('imageButton');
  await userEvent.click(imageButton);
  const urlInput = screen.getByLabelText('Image URL');
  await userEvent.type(urlInput, 'https://ucsc.com/image.jpg');
  const addButton = screen.getByText('Add Image');
  await userEvent.click(addButton);
  const sendButton = screen.getByLabelText('submitButton');
  await userEvent.click(sendButton);
  expect(inputCreate).toHaveBeenCalledWith('today is good', 'https://ucsc.com/image.jpg');
});
/* I should also test when there're no content type inside the box, the send button should not be able to trigger */
