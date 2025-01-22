// import React from 'react';
// import { Close } from '@mui/icons-material';
// import { Box, IconButton, TextareaAutosize, Typography } from '@mui/material';

// interface TextMessageProps {
//   setBotMessage: (message: string) => void;
//   botmessage: string;
//   onDelete: () => void;
// }

// const TextMessage: React.FC<TextMessageProps> = ({ setBotMessage, botmessage, onDelete }) => {
//   return (
//     <>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           width: '100%',
//           mb: 2, // Margin bottom for spacing between elements
//         }}
//       >
//         <Typography variant="h6" color="text.primary">
//           Text
//         </Typography>

//         {/* Delete Button */}
//         <IconButton
//           onClick={onDelete}
//           sx={{
//             color: 'error.main', // Use theme error color for delete button
//             '&:hover': {
//               backgroundColor: 'rgba(255, 0, 0, 0.1)', // Slight red hover effect
//             },
//           }}
//         >
//           <Close />
//         </IconButton>
//       </Box>

//       <TextareaAutosize
//         minRows={5}
//         maxRows={10}
//         placeholder="Enter your text"
//         value={botmessage}
//         onChange={(e) => setBotMessage(e.target.value)}
//         style={{
//           width: '100%',
//           padding: 8,
//           border: `1px solid ${(theme: { palette: { neutral: any[]; }; }) => theme.palette.neutral[300]}`, // Use neutral color from the theme
//           borderRadius: (theme: { shape: { borderRadius: any; }; }) => theme.shape.borderRadius, // Use the theme border radius
//           fontSize: (theme) => theme.typography.body1.fontSize, // Use the body1 font size from the theme
//           height: 100,
//           minHeight: 100,
//           maxHeight: 100, // Fixed height for the text box
//           resize: 'none', // Disable resizing of the text box
//           marginBottom: 20,
//           backgroundColor: (theme) => theme.palette.background.level1, // Use the background color from the theme
//         }}
//       />
//     </>
//   );
// };

// export default TextMessage;
