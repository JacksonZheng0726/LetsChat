// src/app/post/components/PostItem.tsx
'use client';

// import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import type { Post } from '../../../post';
// import { useState } from 'react';
import { useRef, useTransition } from 'react';
import { changeAvatar} from '../actions';


interface postType {
  post: Post;
  onAvatarChange?: () => void; 
}
/* reference: https://mui.com/system/spacing/ */
export default function PostItem({ post, onAvatarChange }: postType) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;

        startTransition(async () => {
          await changeAvatar(base64);
          onAvatarChange?.(); 
        });
        };
        reader.readAsDataURL(file);
  };
  return (
    <Box
      aria-label = 'singlePost'
      sx={{ 
        display: 'flex', 
        padding: 2,
      }}
    >
    <Avatar
      src={post.avatarUrl || ''}
      alt={post.member}
      sx={{ mr: 3, width: 40, height: 40, cursor: 'pointer', opacity: isPending ? 0.5 : 1, }}
      onClick={() => fileInputRef.current?.click()}
    />

    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      hidden
      onChange={(e) => {handleFileUpload(e)}}
      disabled={isPending}
    />
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