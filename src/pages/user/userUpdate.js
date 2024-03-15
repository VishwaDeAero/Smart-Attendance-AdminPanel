import { ArrowBack } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import UserForm from '../../components/UserForm'
import { getUser, updateUser } from '../../services/userService'
import { closeAlert, showAlert, showLoading } from '../../utils/swal'

const UserUpdate = () => {

    const { id } = useParams();
    const [user, setUser] = useState([])

    useEffect(() => {
        fetchUser(id)
    }, [])

    const fetchUser = async (id) => {
        try {
            const userData = await getUser(id)
            setUser(userData.data)
        } catch (error) {
            console.error(`Error fetching user ${id}:`, error)
        }
    }

    const handleUserUpdate = async (id, data, auth) => {
        showLoading()
        try {
            const userData = await updateUser(id, data, auth)
            console.log(userData)
            fetchUser(id)
            showAlert("Update Successful",`User id:${id} updated successfully.`, "success")
        } catch (error) {
            console.error(`Error user id ${id} update:`, error)
            showAlert("Update Failed",error, "error")
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Update User</Typography>
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
                <UserForm initialValues={user} onSubmit={handleUserUpdate}/>
            </Box>
        </MainLayout>
    )
}

export default UserUpdate