import React from 'react';
import PotentialFriendItem from './potentialFriend';
import { Box, CircularProgress } from '@mui/material';
import { useAppContext } from '../../AppContext';

export default function PotentialFriendsList() {
  const { potentialFriend } = useAppContext();
  
  if (potentialFriend === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // if (potentialFriend.length === 0) {
  //   return (
  //     <Typography sx={{ p: 2 }}>
  //       No potential friends !
  //     </Typography>
  //   );
  // }
  
  return (
    <Box sx={{ 
      paddingBottom: '112px',
      marginTop: 0
    }}>
      {potentialFriend.map((member) => (
        <PotentialFriendItem key={member.id} member={member} />
      ))}
    </Box>
  );
}