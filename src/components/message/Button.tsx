import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr';

interface ButtonComponentProps {
  label: string;
  setButtonName: (name: string) => void;
  onDelete: () => void;
  buttonAction: string;
  setButtonAction: (action: string) => void;
  url: string;
  setUrl: (url: string) => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  setButtonName,
  onDelete,
  buttonAction,
  setButtonAction,
  url,
  setUrl,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography variant="h6">Button</Typography>
        <IconButton
          onClick={onDelete}
          sx={{
            color: 'red',
            display: 'flex',
            alignSelf: 'flex-end',
          }}
        >
          <TrashIcon />
        </IconButton>
      </Box>

      <Box sx={{ marginTop: 2, width: '100%' }}>
        <TextField
          label="Button Name"
          value={label}
          onChange={(e) => setButtonName(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Button Action</InputLabel>
          <Select value={buttonAction} onChange={(e) => setButtonAction(e.target.value)} label="Button Action">
            <MenuItem value="openLink">Open Link</MenuItem>
            <MenuItem value="submitForm">Submit Form</MenuItem>
            {/* Add more button actions as needed */}
          </Select>
        </FormControl>

        {/* Conditionally render URL text box based on selected action */}
        {(buttonAction === 'openLink' || buttonAction === 'submitForm') && (
          <TextField
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            placeholder="Enter URL"
          />
        )}
      </Box>
    </>
  );
};

export default ButtonComponent;
