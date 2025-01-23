import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';

interface LayoutProps {
  children: React.ReactNode;
}
export const metadata = { title: `Campaign | Dashboard | ${config.site.name}` } satisfies Metadata;
export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <>
      <Box width={'100%'} height={'100%'}>
        {children}
      </Box>
    </>
  );
}
