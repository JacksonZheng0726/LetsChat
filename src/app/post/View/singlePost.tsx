// src/app/post/components/PostItem.tsx
'use client';

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import type { Post } from '../../../post';

interface postType {
  post: Post;
}
/* reference: https://mui.com/system/spacing/ */
export default function PostItem({ post }: postType) {
  return (
    <Box
      aria-label = 'singlePost'
      sx={{ 
        display: 'flex', 
        padding: 2,
      }}
    >
      <Avatar sx={{ mr: 3, backgroundColor: 'grey' }}/>
      <Box sx={{ width: '100%' }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mb: 0.5
          }}
        >
          <Typography variant="subtitle1">{post.member}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(post.posted).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {post.content}
        </Typography>
        {post.image && (
          <Box 
            component="img"
            src={post.image}
            alt="Post"
            sx={{ 
              width: '100%',
              borderRadius: 1,
              mb: 1
            }}
          />
        )}
      </Box>
    </Box>
  );
}