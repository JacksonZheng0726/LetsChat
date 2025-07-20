import React from 'react';
import { useState } from 'react';
import { Box, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';

interface InputCreate {
  input: (content: string, image: string) => void;
}

export default function PostCreate({input}: InputCreate) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [dialog, setDialog] = useState(false);

  const imageClick = () => {
    setDialog(true);
  };
  const dialogCloseClick = () => {
    setDialog(false);
  };
  const imageSet = () => {
    setDialog(false);
  };
  const handlePost = () => {
    if (content !== '') {
      input(content, image);
      setContent('');
      setImage('');
    }
  };
  /* reference: https://mui.com/material-ui/react-text-field/ */
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderTop: '1px solid #eee',
          position: 'fixed',
          bottom: 65,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <TextField
            aria-label='postInput'
            placeholder="What's on your mind?"
            variant="outlined"
            fullWidth
            size="small"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ 
              mr: 1,
              '& .MuiOutlinedInput-root': { 
                borderRadius: 3,
                backgroundColor: '#f0f2f5'
              }
            }}
          />
          
          <IconButton
            aria-label='imageButton'
            onClick={imageClick}
            size="small"
          >
            <ImageIcon color={image ? "primary" : "inherit"} />
          </IconButton>
          
          <IconButton 
            aria-label="emoButton"
            size="small"
          >
            <EmojiEmotionsIcon fontSize="small" />
          </IconButton>
          
          <IconButton
            size="small"
            onClick={handlePost}
            aria-label='submitButton'
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={dialog} onClose={dialogCloseClick}>
        <DialogTitle>Image URL Attachment</DialogTitle>
        <DialogContent>
          <TextField
            label="Image URL"
            type="url"
            variant="outlined"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogCloseClick}>Cancel</Button>
          <Button onClick={imageSet}>Add Image</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}