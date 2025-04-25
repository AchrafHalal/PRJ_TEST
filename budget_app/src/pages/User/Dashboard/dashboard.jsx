import React from 'react';
import { DownloadOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import FirstSection from './firstSection';
import SecondSection from './secondSection';
import ThirdSection from './thirdSection';

export default function Dashboard() {
  return (
    <div>
      <Box sx={{ textAlign: 'right',flexGrow: 1, px: 3, mt:'15px' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadOutlined />}
          onClick={() => alert('Download Report')}
          sx={{ padding: '6px 16px' }}
        >
          Download Report
        </Button>
      </Box>

      <FirstSection />
      <SecondSection />
      <ThirdSection />

    </div>




  );
}
