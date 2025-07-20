'use client';

import React, { useState, useEffect } from 'react';
import Navigation from './View/NavigationView';
import CreatePostInput from './View/postCreate';
import PostsList from './View/listPost';
import PostHeader from './View/header';
import { createPost, getPost } from '../../app/post/actions';
import { Box, Typography } from '@mui/material';
import { Post } from '@/post';

export default function PostsView() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPost(1);
        console.log('Fetched posts:', result);
        setPosts(result || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts');
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const handleCreate = async (content: string, image: string) => {
    try {
      await createPost({ content, image });
      const updatedPosts = await getPost(1);
      setPosts(updatedPosts);
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    }
  };

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        backgroundColor: 'white',
        minHeight: '100vh',
      }}////
    >
      <PostHeader />
      <PostsList posts={posts} />
      <CreatePostInput input={handleCreate} />
      <Navigation />
    </Box>
  );
}
