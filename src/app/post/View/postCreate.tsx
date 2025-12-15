import React from 'react';
import { useState } from 'react';
import { Box, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setDialog(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage('');
  };

  const handlePost = () => {
    if (content !== '') {
      input(content, image);
      setContent('');
      setImage('');
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 16px',
          borderTop: '1px solid #eee',
          position: 'fixed',
          bottom: 65,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >{/* Image previous */}
        {image && (
          <Box
            sx={{
              position: 'relative',
              mb: 1,
              maxWidth: 600,
              mx: 'auto',
              width: '100%',
            }}
          >
            <img
              src={image}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
            <IconButton
              size="small"
              onClick={removeImage}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

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
            disabled={!content}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={dialog} onClose={dialogCloseClick} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="raised-button-file">
              {/* Because the button normally not allow to render inside the label */}
              <Button variant="contained" component="span" startIcon={<ImageIcon />}>
                Choose Image from Device
              </Button>
            </label>
            <Box sx={{ mt: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
              Supports: JPG, PNG, GIF
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogCloseClick}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}