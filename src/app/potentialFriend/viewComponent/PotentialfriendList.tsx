import React, { useEffect, useState } from 'react';
import PotentialFriendItem from './potentialFriend';
import { Box, CircularProgress, Typography } from '@mui/material';
import { member } from '@/friend';
import { getPotentialFriend } from '../actions';

export default function PotentialFriendsList() {
  const [potentialFriends, setPotentialFriends] = useState<member[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPotentialFriends = async () => {
    try {
      const result = await getPotentialFriend();
      setPotentialFriends(result || []);
    } catch (err) {
      setError('Failed to load potential friends');
      console.error(err);
    }
  };

  useEffect(() => {
    loadPotentialFriends();
  }, []);

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  if (potentialFriends === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (potentialFriends.length === 0) {
    return (
      <Typography sx={{ p: 2 }}>
        No potential friends !
      </Typography>
    );
  }
  
  return (
    <Box sx={{ 
      paddingBottom: '112px',
      marginTop: 0
    }}>
      {potentialFriends.map((friend) => (
        <PotentialFriendItem key={friend.id} member={friend} friendUpdate={loadPotentialFriends} />
      ))}
    </Box>
  );
}