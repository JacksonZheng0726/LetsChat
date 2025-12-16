// import React from 'react';
'use client';
import { Box, Typography } from '@mui/material';

export default function PostHeader() {
  return (
    <Box
      sx={{ 
        width: '100%',
        backgroundColor: 'blue',
        color: 'white',
      }}
      aria-label="postHeader"
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          padding: '12px 16px',
        }}
      >
        <Typography variant="h6">Posts</Typography>
      </Box>
    </Box>
  );
}

