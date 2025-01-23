'use client';

import React, { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import axios from 'axios';
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

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignDescription, setCampaignDescription] = React.useState('');
  const [campaigns, setCampaigns] = useState([]); // Store campaigns dynamically
  const [campaign, setCampaign] = useState({
    id: null,
    name: '',
    description: '',
  });
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_VITE_SERVICE_BASE_URL + '/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };
  const paginatedCustomers = applyPagination(campaigns, page, rowsPerPage);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const onEdit = (id: string) => {
    router.push(`/dashboard/campaign/detail/${id}?tab=messenger`);
  };

  const handleSave = () => {
    // Handle save logic (e.g., send data to server or update state)
    console.log('Campaign Name:', campaignName);
    console.log('Campaign Description:', campaignDescription);

    // Close the dialog
    handleDialogClose();
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCampaign((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveCampaign = async () => {
    try {
      const newCampaign = {
        name: campaign.name,
        description: campaign.description,
      };

      await axios.post(process.env.NEXT_PUBLIC_VITE_SERVICE_BASE_URL + '/campaigns/create', newCampaign);
      fetchCampaigns();
      setCampaign({ id: null, name: '', description: '' });
      handleDialogClose();
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };
  const handleDeleteCampaign = async (id: any) => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_VITE_SERVICE_BASE_URL + `/campaigns/${id}`);
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
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
        count={campaigns.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
        onEdit={onEdit}
        onDelete={handleDeleteCampaign}
      />

      {/* Add Campaign Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Campaign</DialogTitle>
        <DialogContent>
          <TextField
            label="Campaign Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={campaign.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Campaign Description"
            name="description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={campaign.description}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSaveCampaign} variant="contained" color="primary">
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
