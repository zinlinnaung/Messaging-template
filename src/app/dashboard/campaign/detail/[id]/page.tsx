// 'use client'; at the top for client-side behavior
'use client';

import * as React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import { CampaignDetailsTab } from '@/components/dashboard/campaign/campaignDetail/campaignDetail';

export default function CampaignDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = useParams().id;
  const tab = searchParams.get('tab');

  // Default tab is 'overview' if not provided in URL
  const currentTab = tab || 'overview';

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    // Update the URL when the tab changes
    router.push(`${campaignId}?tab=${newTab}`);
  };

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Campaign Name- 12 12 Promotion
      </Typography>
      <Tabs value={currentTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab value="overview" label="Messenger" />
        <Tab value="settings" label="Telegram" />
        <Tab value="statistics" label="Viber" />
        <Tab value="messages" label="Messages" />
      </Tabs>

      {/* Render different content based on the current tab */}
      <Box sx={{ mt: 3 }}>
        {currentTab === 'overview' && <CampaignDetailsTab tab="overview" />}
        {currentTab === 'settings' && <CampaignDetailsTab tab="settings" />}
        {currentTab === 'statistics' && <CampaignDetailsTab tab="statistics" />}
        {currentTab === 'messages' && <CampaignDetailsTab tab="messages" />}
      </Box>
    </Box>
  );
}
