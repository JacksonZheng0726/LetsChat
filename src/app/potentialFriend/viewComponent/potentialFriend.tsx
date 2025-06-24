import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import type { member } from '../../../friend';
import { sendRequest } from '../../potentialFriend/actions';
import { useAppContext } from '../../AppContext';

interface MemberItemProps {
  member: member;
}

export default function PotentialFriendItem({ member }: MemberItemProps) {
  const { potentialFriendLoad} = useAppContext();

  const handleAddFriend = async () => {
    await sendRequest(member.id);
    potentialFriendLoad();
  };

  return (
    <Box
      aria-label='potentialFriend'
      sx={{
        display: 'flex',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ mr: 3, backgroundColor: 'grey' }}/>
        <Typography variant="subtitle1">{member.name}</Typography>
      </Box>
      
      <IconButton
        onClick={handleAddFriend}
        aria-label="SendRequest"
      >
        <PersonAddIcon />
      </IconButton>
    </Box>
  );
}