'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersTable } from '@/components/dashboard/campaign/campaign-table';
import type { Customer } from '@/components/dashboard/campaign/campaign-table';
import { CustomersFilters } from '@/components/dashboard/campaign/customers-filters';

// import TextMessage from '@/components/message/TextMessage';

const customers = [
  {
    id: 'USR-004',
    name: 'Penjani Inyene',
    description: 'This is a description of the campaign',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
    updatedAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-005',
    name: 'Penjani Inyene',
    description: 'This is a description of the campaign',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
    updatedAt: dayjs().subtract(2, 'hours').toDate(),
  },
  // Add other customers...
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const router = useRouter();

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  // Dialog state management
  const [openDialog, setOpenDialog] = React.useState(false);
  const [campaignName, setCampaignName] = React.useState('');
  const [campaignDescription, setCampaignDescription] = React.useState('');

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const onEdit = (id: string) => {
    router.push(`/dashboard/campaign/detail/${id}`);
  };

  const handleSave = () => {
    // Handle save logic (e.g., send data to server or update state)
    console.log('Campaign Name:', campaignName);
    console.log('Campaign Description:', campaignDescription);

    // Close the dialog
    handleDialogClose();
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Campaigns</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleDialogOpen}
          >
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      {/* <TextMessage onDelete={} botmessage='' /> */}
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
        onEdit={onEdit}
      />

      {/* Add Campaign Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Campaign</DialogTitle>
        <DialogContent>
          <TextField
            label="Campaign Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
          <TextField
            label="Campaign Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            required
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
