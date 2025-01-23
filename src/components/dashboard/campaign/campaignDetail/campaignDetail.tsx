import * as React from 'react';
import { Typography } from '@mui/material';

import CampaignDetailComponent from './CampaignDetailComponent';

interface CampaignDetailsTabProps {
  tab: 'messenger' | 'telegram' | 'viber' | 'messages';
}

export function CampaignDetailsTab({ tab }: CampaignDetailsTabProps) {
  switch (tab) {
    case 'messenger':
      return <CampaignDetailComponent name={'facebook'} />;
    case 'telegram':
      return <CampaignDetailComponent name={'telegram'} />;
    case 'viber':
      return <CampaignDetailComponent name={'viber'} />;
    case 'messages':
      return <Typography>Messages Content Here</Typography>;
    default:
      return <Typography>Default Tab Content</Typography>;
  }
}
