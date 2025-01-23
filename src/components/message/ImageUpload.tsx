import React from 'react';
import { Close } from '@mui/icons-material'; // Material UI Close icon
import { Box, IconButton, Typography } from '@mui/material';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr';

interface ImageUploadProps {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: string | null;
  onDelete: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleImageChange, selectedImage, onDelete }) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h6">Image</Typography>

        {/* Delete Button */}
        <IconButton
          onClick={onDelete}
          sx={{
            color: 'red',
            display: 'flex',
            alignSelf: 'flex-end',
            '&:hover': {
              // You can add hover effects here if needed
            },
          }}
        >
          <TrashIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '40%',
          minHeight: 150, // Fixed height for image box
          border: '2px dashed #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          backgroundColor: selectedImage ? 'transparent' : '#f4f4f4',
          marginBottom: 2,
        }}
      >
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
          }}
          // ref={fileInputRef}
          onChange={handleImageChange}
        />
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              color: '#fff',
              fontSize: '18px',
              textAlign: 'center',
              fontWeight: 'bold',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)',
            }}
          >
            Click OR Drag to upload Image
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ImageUpload;
