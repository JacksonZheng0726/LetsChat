import React from 'react';
import PostItem from './singlePost';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppContext } from '../../AppContext';

export default function PostsList() {
  const {posts} = useAppContext();
  if (posts === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (posts.length === 0) {
    return (
      <Typography sx={{ p: 2 }}>
        No posts yet!
      </Typography>
    );
  }
  return (
    <Box sx={{ 
      paddingBottom: '112px',
      marginTop: 0
    }}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Box>
  );
}