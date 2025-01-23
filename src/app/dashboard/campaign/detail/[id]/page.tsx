// 'use client'; at the top for client-side behavior
'use client';

import * as React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';

import { CampaignDetailsTab } from '@/components/dashboard/campaign/campaignDetail/campaignDetail';

export default function CampaignDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = useParams().id;
  const tab = searchParams.get('tab');

  // Default tab is 'overview' if not provided in URL
  const currentTab = tab || 'messenger';

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    // Update the URL when the tab changes
    router.push(`${campaignId}?tab=${newTab}`);
  };
  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <Box sx={{ padding: 0 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
        sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
      >
        Back
      </Button>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Campaign Detail
      </Typography>
      <Tabs value={currentTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab value="messenger" label="Messenger" />
        <Tab value="telegram" label="Telegram" />
        <Tab value="viber" label="Viber" />
        <Tab value="messages" label="Messages" />
      </Tabs>

      {/* Render different content based on the current tab */}
      <Box sx={{ mt: 3 }}>
        {currentTab === 'messenger' && <CampaignDetailsTab tab="messenger" />}
        {currentTab === 'telegram' && <CampaignDetailsTab tab="telegram" />}
        {currentTab === 'viber' && <CampaignDetailsTab tab="viber" />}
        {currentTab === 'messages' && <CampaignDetailsTab tab="messages" />}
      </Box>
    </Box>
  );
}
