import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import SubjectForm from '../../components/SubjectForm'
import { createSubject } from '../../services/subjectService'
import { showAlert, showLoading } from '../../utils/swal'

const SubjectCreate = () => {

  const handleSubjectCreate = async (data, auth) => {
    showLoading()
    try {
        const subjectData = await createSubject(data, auth)
        console.log(subjectData)
        showAlert("New Subject Created",`New subject created successfully.`, "success")
    } catch (error) {
        console.error(`Error subject create:`, error)
        showAlert("Create Subject Failed",error, "error")
    }
}

  return (
    <MainLayout>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={8}>
          <Typography variant='h5' component='h1'>Add New Subject</Typography>
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
        <SubjectForm onSubmit={handleSubjectCreate} />
      </Box>
    </MainLayout>
  )
}

export default SubjectCreate