import React from 'react';
import { Close } from '@mui/icons-material';
import { Box, IconButton, TextareaAutosize, Typography } from '@mui/material';
import { Pencil as EditIcon, Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr';

interface TextMessageProps {
  setBotMessage: (message: string) => void;
  botmessage: string;
  onDelete: () => void;
}

const TextMessage: React.FC<TextMessageProps> = ({ setBotMessage, botmessage, onDelete }) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h6">Text</Typography>

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

      <TextareaAutosize
        minRows={5}
        maxRows={10}
        placeholder="Enter your text"
        value={botmessage}
        onChange={(e) => setBotMessage(e.target.value)}
        style={{
          width: '100%',
          padding: 8,
          border: '1px solid #ccc',
          borderRadius: 4,
          fontSize: 14,
          height: 100,
          minHeight: 100,
          maxHeight: 100, // Fixed height for the text box
          resize: 'none', // Disable resizing of the text box
          marginBottom: 20,
        }}
      />
    </>
  );
};

export default TextMessage;
