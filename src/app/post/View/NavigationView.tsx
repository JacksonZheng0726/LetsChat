// src/app/post/View/NavigationView.jsx
'use client';
// import React from 'react';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutButton from './LogoutButton';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const homeClick = () => {
    router.push('/');
  };
  const friendRequestClick = () => {
    router.push('/potentialFriend');
  };
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex', 
          justifyContent: 'space-between',
          padding: 2,
          borderTop: '1px solid #eee',
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <IconButton
          aria-label="homeButton"
          onClick={homeClick}>
          <HomeIcon />
        </IconButton>
        <IconButton
          aria-label="requestButton"
          onClick={friendRequestClick}>
          <PersonIcon />
        </IconButton>
        <LogoutButton />
      </Box>
    </Box>
  );
}