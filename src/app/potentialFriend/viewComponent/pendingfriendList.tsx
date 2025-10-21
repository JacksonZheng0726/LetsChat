import React, { useEffect, useState } from 'react';
import PendingFriendItem from './pendingFriend';
import { Box, CircularProgress, Typography } from '@mui/material';
import { member } from '@/friend';
import { getPendingFriend } from '../actions';

export default function PendingFriendsList() {
  const [pendingFriends, setPendingFriends] = useState<member[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPendingFriends = async () => {
    try {
      const result = await getPendingFriend();
      setPendingFriends(result || []);
    } catch (err) {
      setError('Failed to load potential friends');
      console.error(err);
    }
  };

  useEffect(() => {
    loadPendingFriends();
  }, []);

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  if (pendingFriends === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (pendingFriends.length === 0) {
    return (
      <Typography sx={{ p: 2 }}>
        No pending friends !
      </Typography>
    );
  }
  
  return (
    <Box sx={{ 
      paddingBottom: '112px',
      marginTop: 0
    }}>
      <Typography variant="h6">pending Friends</Typography>
      {pendingFriends.map((friend) => (
        < PendingFriendItem key={friend.id} member={friend} friendUpdate={loadPendingFriends} />
      ))}
    </Box>
  );
}