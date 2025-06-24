'use client';

import React from 'react';
import Navigation from './View/NavigationView';
import CreatePostInput from './View/postCreate';
import PostsList from './View/listPost';
import PostHeader from './View/header';
import { useAppContext } from '../AppContext';
import { createPost } from '../../app/post/actions';
import { Box} from '@mui/material';


export default function PostsView() {
  const {inputPost} = useAppContext();

  const handleCreate = async (content: string, image: string) => {
    await createPost({ content, image });
    inputPost();
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        backgroundColor: 'white',
        minHeight: '100vh',
      }}
    >
      
      <PostHeader />
      <PostsList />
      <CreatePostInput input={handleCreate} />
      <Navigation />
    </Box>
  );
}
