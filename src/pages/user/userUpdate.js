import { ArrowBack } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import UserForm from '../../components/UserForm'
import { getUser, updateUser } from '../../services/userService'

const defaultValues = {
    name: 'Test',
    username: 'test',
    email: 'test@test.test',
    role: 'admin',
};

const UserUpdate = () => {

    const { id } = useParams();
    const [user, setUser] = useState([])

    useEffect(() => {
        fetchUser(id)
    }, [])

    const fetchUser = async (id) => {
        try {
            const userData = await getUser(id)
            console.log(userData)
            setUser(userData.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const handleUserUpdate = async (id, data) => {
        try {
            const userData = await updateUser(id, data)
            console.log(userData)
            fetchUser(id)
        } catch (error) {
            console.error('Error user status change:', error)
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Update User {id}</Typography>
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
                <UserForm initialValues={user} />
            </Box>
        </MainLayout>
    )
}

export default UserUpdate