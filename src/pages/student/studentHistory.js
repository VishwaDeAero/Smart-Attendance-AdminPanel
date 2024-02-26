import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { showAlert, showLoading } from '../../utils/swal'
import DataTable from '../../components/DataTable'

const StudentHistory = () => {

  return (
    <MainLayout>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={8}>
          <Typography variant='h5' component='h1'>Students</Typography>
        </Grid2>
        <Grid2 xs={12} md={4} sx={{
          textAlign: 'end'
        }}>
          <Button component={Link} to="/subjects" variant="contained" endIcon={<ArrowBack />}>
            Back
          </Button>
        </Grid2>
      </Grid2>
      <Divider sx={{ my: 3 }} />
      <Box padding={2}>
        {/* <DataTable
          rows={students}
          columns={columns}
        /> */}
      </Box>
    </MainLayout>
  )
}

export default StudentHistory