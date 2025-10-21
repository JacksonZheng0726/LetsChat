import React, { useEffect, useState } from 'react';
import FriendItem from './Friend';
import { Box, CircularProgress, Typography } from '@mui/material';
import { member } from '@/friend';
import { getallFriend } from '../actions';
// import { Refresh } from '@mui/icons-material';

export default function FriendsList() {
  const [Friends, setFriends] = useState<member[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [refresh, setRefresh] = useState(0)

  const loadFriends = async () => {
    try {
      const result = await getallFriend();
      setFriends(result || []);
    } catch (err) {
      setError('Failed to load all the friends');
      console.error(err);
    }
  };
  useEffect(() => {
    loadFriends();
    const handleRefresh = () => {
      loadFriends();
    };
    window.addEventListener('refreshFriendsList', handleRefresh);

    return () => {
      window.removeEventListener('refreshFriendsList', handleRefresh);
    };
  }, []);

  // const refreshTrigger = () => {
  //   setRefresh(prev => prev + 1)
  // }

  // useEffect(() => {
  //   loadFriends();
  // }, [refresh]);

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  if (Friends === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (Friends.length === 0) {
    return (
      <Typography sx={{ p: 2 }}>
        No friends !
      </Typography>
    );
  }
  
  return (
    <Box sx={{ 
      paddingBottom: '112px',
      marginTop: 0
    }}>
      <Typography variant="h6"> Friends</Typography>
      {Friends.map((friend) => (
        < FriendItem key={friend.id} member={friend} />
      ))}
    </Box>
  );
}