'use client';

import React from 'react';
import PostItem from './singlePost';
import { Box, Typography } from '@mui/material';
import { Post } from '@/post';

interface PostsListProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
  if (posts.length === 0) {
    return (
      <Typography sx={{p: 2}}>
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