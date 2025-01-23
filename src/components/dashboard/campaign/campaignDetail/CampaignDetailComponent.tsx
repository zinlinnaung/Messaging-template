import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SmartButtonOutlinedIcon from '@mui/icons-material/SmartButtonOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { DeviceFrameset } from 'react-device-frameset';

import ChatBubble from '@/components/chat/ChatBubble';
import AnimatedNumber from '@/components/message/AnimatedNumber';
import ButtonComponent from '@/components/message/Button';
import ImageUpload from '@/components/message/ImageUpload';
import TextMessage from '@/components/message/TextMessage';

interface CampaignData {
  name: string;
  CampainDetail: Record<string, string>;
}

interface Component {
  type: 'text' | 'image' | 'button';
  content?: string;
  label?: string;
  action?: string;
  url?: string;
}

interface CampaignDetailComponentProps {
  name: string;
}

const CampaignDetailComponent: React.FC<CampaignDetailComponentProps> = ({ name }) => {
  const id = useParams().id;
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Unified state for all components
  const [components, setComponents] = useState<Component[]>([]);
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);

  // Fetch existing campaign details
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_VITE_SERVICE_BASE_URL + `/campaigns/${id}`);
        setCampaignData(response.data);
        setComponents(JSON.parse(response.data.CampainDetail[name]));
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      }
    };
    fetchCampaignDetails();
  }, [id, name]);

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [components]);

  // Add a new text component
  const handleAddText = () => {
    setComponents((prev) => [
      ...prev,
      { type: 'text', content: '' }, // Default content can be empty
    ]);
  };

  // Add a new image component
  const handleAddImage = () => {
    setComponents((prev) => [
      ...prev,
      { type: 'image', content: '' }, // Default content can be empty
    ]);
  };

  // Add a new button component
  const handleAddButton = () => {
    setComponents((prev) => [
      ...prev,
      { type: 'button', label: '', action: '', url: '' }, // Default properties
    ]);
  };

  // Update a text component
  const updateText = (index: number, newContent: string) => {
    setComponents((prev) =>
      prev.map((component, i) => (i === index ? { ...component, content: newContent } : component))
    );
  };

  // Update an image component
  const updateImage = (index: number, newContent: string) => {
    setComponents((prev) =>
      prev.map((component, i) => (i === index ? { ...component, content: newContent } : component))
    );
  };

  // Update a button component
  const updateButton = (index: number, newLabel: string, newAction: string, newUrl: string) => {
    setComponents((prev) =>
      prev.map((component, i) =>
        i === index ? { ...component, label: newLabel, action: newAction, url: newUrl } : component
      )
    );
  };

  // Delete a component
  const deleteComponent = (index: number) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (name === 'telegram') {
      await axios.post(process.env.NEXT_PUBLIC_VITE_SERVICE_BASE_URL + `/queue/send`, components);
    } else {
      alert(`Message sent to ${name}`);
    }

    console.log('Message sent:', components);
  };
  // Publish components to the server
  const handlePublish = async () => {
    if (!campaignData) {
      console.error('Campaign data is not loaded.');
      return;
    }

    try {
      const updatedData = {
        [name]: JSON.stringify(components), // Update the `facebook` field with components
      };
      console.log('Campaign data updated successfully:', updatedData);

      await axios.patch(process.env.NEXT_PUBLIC_VITE_SERVICE_BASE_URL + `/campaigns/${id}/details`, updatedData);

      console.log('Campaign data updated successfully:', updatedData);
    } catch (error) {
      const updatedData = {
        ...campaignData,
        [name]: JSON.stringify(components), // Update the `facebook` field with components
      };
      console.log('Campaign data updated successfully:', updatedData);
      console.error('Error updating campaign data:', error);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            size="small"
            // color="success"
            sx={{ mt: 2 }}
            onClick={handleSend}
          >
            <SendRoundedIcon /> Sent Now
          </Button>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Card
            sx={{
              mb: 2,
              padding: 0,
              width: '100%',
              minHeight: 50,
              maxHeight: 90,
            }}
          >
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Campaign Name
              </Typography>
              <Typography variant="h5" textAlign="center" color={'secondary'}>
                {`${campaignData?.name}`}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              mb: 2,
              padding: 0,
              width: '100%',
              minHeight: 50,
              maxHeight: 90,
            }}
          >
            <CardContent>
              <Typography variant="h6" textAlign="center">
                User Count
              </Typography>
              <AnimatedNumber targetNumber={1000} />
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
            minHeight: '50vh',
            maxHeight: '50vh',
            overflowY: 'auto',

            '&::-webkit-scrollbar': {
              width: '6px', // Set the width of the scrollbar
              height: '8px', // Set the height of the scrollbar (for horizontal scroll)
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#007bff', // Change the thumb color (the draggable part)
              borderRadius: '4px', // Rounded corners
              border: '2px solid #fff', // Optional: add a border around the thumb
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1', // Set the track color (the background of the scrollbar)
              borderRadius: '4px', // Rounded corners for the track
            },
            '&::-webkit-scrollbar-corner': {
              backgroundColor: '#f1f1f1', // If there's a scrollbar in both directions, the corner is customizable
            },
          }}
        >
          {/* Render components */}
          {components.map((component, index) => {
            if (component.type === 'text') {
              return (
                <TextMessage
                  key={`text-${index}`}
                  botmessage={component.content || ''}
                  setBotMessage={(newContent: string) => updateText(index, newContent)}
                  onDelete={() => deleteComponent(index)}
                />
              );
            }
            if (component.type === 'image') {
              return (
                <ImageUpload
                  key={`image-${index}`}
                  selectedImage={component.content || ''}
                  handleImageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      updateImage(index, URL.createObjectURL(file));
                    }
                  }}
                  onDelete={() => deleteComponent(index)}
                />
              );
            }
            if (component.type === 'button') {
              return (
                <ButtonComponent
                  key={`button-${index}`}
                  label={component.label || ''}
                  buttonAction={component.action || ''}
                  url={component.url || ''}
                  setUrl={(newUrl: string) =>
                    updateButton(index, component.label || '', component.action || '', newUrl)
                  }
                  setButtonName={(newLabel: string) =>
                    updateButton(index, newLabel, component.action || '', component.url || '')
                  }
                  setButtonAction={(newAction: string) =>
                    updateButton(index, component.label || '', newAction, component.url || '')
                  }
                  onDelete={() => deleteComponent(index)}
                />
              );
            }
            return null;
          })}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddText}>
            <TextFieldsOutlinedIcon /> Add Text
          </Button>

          {name !== 'sms' && (
            <>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddImage}>
                <ImageOutlinedIcon /> Add Image
              </Button>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddButton}>
                <SmartButtonOutlinedIcon /> Add Button
              </Button>
            </>
          )}

          <Button
            variant="contained"
            // color="success"
            sx={{ mt: 2 }}
            onClick={handlePublish}
          >
            <SaveOutlinedIcon /> Save
          </Button>
        </Box>
      </Box>

      {/* <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
        <DeviceFrameset device="Galaxy Note 8" color="gold" width={500}>
          <Box
            mt={2}
            sx={{
              height: '55vh',
              margin: 2,
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: 2,
              '&::-webkit-scrollbar': {
                width: '1px', // Set the width of the scrollbar
                height: '8px', // Set the height of the scrollbar (for horizontal scroll)
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#007bff', // Change the thumb color (the draggable part)
                borderRadius: '4px', // Rounded corners
                border: '2px solid #fff', // Optional: add a border around the thumb
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1', // Set the track color (the background of the scrollbar)
                borderRadius: '4px', // Rounded corners for the track
              },
              '&::-webkit-scrollbar-corner': {
                backgroundColor: '#f1f1f1', // If there's a scrollbar in both directions, the corner is customizable
              },
            }}
          >
            <Stack spacing={2} p={2}>
              {components.map((component, index) => (
                <ChatBubble
                  key={index}
                  message={component.type === 'button' ? component.label || '' : component.content || ''}
                  type={component.type}
                  action={component.type === 'button' ? component.action : undefined}
                  url={component.type === 'button' && component.url ? component.url : undefined}
                  isUser={false}
                />
              ))}
              <div ref={chatEndRef} />
            </Stack>
          </Box>
        </DeviceFrameset>
      </Container> */}
    </Box>
  );
};

export default CampaignDetailComponent;
