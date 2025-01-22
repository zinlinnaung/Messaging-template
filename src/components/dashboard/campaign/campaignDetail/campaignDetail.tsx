import * as React from 'react';
import { Typography } from '@mui/material';

interface CampaignDetailsTabProps {
  tab: 'overview' | 'settings' | 'statistics' | 'messages';
}

export function CampaignDetailsTab({ tab }: CampaignDetailsTabProps) {
  switch (tab) {
    case 'overview':
      return <Typography>Overview Content Here</Typography>;
    case 'settings':
      return <Typography>Settings Content Here</Typography>;
    case 'statistics':
      return <Typography>Statistics Content Here</Typography>;
    case 'messages':
      return <Typography>Messages Content Here</Typography>;
    default:
      return <Typography>Default Tab Content</Typography>;
  }
}
