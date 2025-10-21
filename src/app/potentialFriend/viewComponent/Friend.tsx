import React from 'react';
import { Box, Typography, Avatar, IconButton} from '@mui/material';
import type { member } from '../../../friend';
import { getallFriend } from '../../potentialFriend/actions';
import PendingIcon from '@mui/icons-material/Pending';
interface MemberItemProps {
  member: member;
  friendUpdate: () => void;
}

export default function FriendItem({ member, friendUpdate }: MemberItemProps) {

  const handleFriend = async () => {
    try {
      await getallFriend();
      friendUpdate();
    } catch (error) {
      console.error('Failed to send friend request', error);
    }
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
      
      {/* <IconButton
        onClick={handleFriend}
        aria-label="allFriends"
      >
        <PendingIcon />
      </IconButton> */}
    </Box>
  );
}

