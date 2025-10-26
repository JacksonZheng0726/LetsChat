'use client';

import React from 'react';
import Navigation from './viewComponent/NavigationView';
// import CreatePostInput from './View/postCreate';
import PotentialFriendList from './viewComponent/PotentialfriendList';
import FriendHeader from './viewComponent/header';
// import { createPost } from '../../app/post/actions';
import {Box} from '@mui/material';
import PendingFriendList from './viewComponent/pendingfriendList';
import FriendLists from './viewComponent/friendList';



export default function MemberView() {
  // const {inputPost} = usePostContext();

  // // const handleCreate = async (content: string, image: string) => {
  // //   await createPost({ content, image });
  // //   inputPost();
  // // };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        backgroundColor: 'white',
        minHeight: '100vh',
      }}
    >
      <FriendHeader />
      <PotentialFriendList />
      <PendingFriendList />
      <FriendLists />
      <Navigation />
    </Box>
  );
}