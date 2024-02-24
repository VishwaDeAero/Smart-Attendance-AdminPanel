import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import UserForm from '../../components/UserForm'
import { createUser } from '../../services/userService'
import { showAlert, showLoading } from '../../utils/swal'

const UserCreate = () => {

  const handleUserCreate = async (data) => {
    showLoading()
    try {
        const userData = await createUser(data)
        console.log(userData)
        showAlert("New User Created",`New user created successfully.`, "success")
    } catch (error) {
        console.error(`Error user create:`, error)
        showAlert("Create User Failed",error, "error")
    }
}

  return (
    <MainLayout>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={8}>
          <Typography variant='h5' component='h1'>Add New User</Typography>
        </Grid2>
        <Grid2 xs={12} md={4} sx={{
          textAlign: 'end'
        }}>
          <Button component={Link} to="/users" variant="contained" endIcon={<ArrowBack />}>
            Back
          </Button>
        </Grid2>
      </Grid2>
      <Divider sx={{ my: 3 }} />
      <Box padding={2}>
        <UserForm onSubmit={handleUserCreate} />
      </Box>
    </MainLayout>
  )
}

export default UserCreate