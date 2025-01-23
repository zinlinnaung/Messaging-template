import React from 'react';
import { Box, Button, TextareaAutosize, Typography } from '@mui/material';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  type: 'text' | 'image' | 'email' | 'button';
  action?: string; // For button action
  url?: string; // For button URL
  subject?: string; // For email subject
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, handleInputChange, type, action, url, subject }) => {
  const renderMessage = () => {
    switch (type) {
      case 'text':
        return (
          <TextareaAutosize
            minRows={1}
            maxRows={100}
            value={message}
            onChange={handleInputChange}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              resize: 'none',
            }}
          />
        );
      case 'image':
        return <img src={message} alt="chatbot" style={{ maxWidth: '100%' }} />;
      case 'email':
        return (
          <Box sx={{ padding: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {subject ? subject : 'This is subject'}
            </Typography>
            <Box
              sx={{
                fontSize: '0.9rem',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                '& p': { marginLeft: 1 },
              }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </Box>
        );
      case 'button':
        return (
          <Button
            variant="contained"
            onClick={() => {
              if (url) {
                window.location.href = url;
              } else if (action) {
                alert(`Button Action: ${action}`);
              }
            }}
          >
            {message}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        padding: 1,
        margin: '5px 0',
      }}
    >
      {!isUser && type !== 'email' && (
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: '#bbb',
            marginRight: 1,
            display: 'flex',
            alignSelf: 'flex-end',
          }}
        />
      )}
      <Box
        sx={{
          background: isUser ? '#cce7ff' : '#e3f2fd',
          borderRadius: 2,
          padding: 1,
          maxWidth: '80%',
          wordWrap: 'break-word',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderMessage()}
      </Box>
      {isUser && (
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: '#000000',
            marginLeft: 1,
            display: 'flex',
            alignSelf: 'flex-end',
          }}
        />
      )}
    </Box>
  );
};

export default ChatBubble;
