import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, IconButton, Switch, Typography } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
import DataTable from '../../components/DataTable'
import { Link } from 'react-router-dom'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { getAllUsers, updateUser } from '../../services/userService'

const UserView = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 3,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 2
        },
        {
            field: 'email',
            headerName: 'E-mail',
            flex: 2
        },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => (
                <Switch
                    checked={params.row.status === 1}
                    onChange={(e) => handleStatusToggle(params.row.id, e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            ),
        },
        {
            field: 'updatedAt',
            headerName: 'Last Modified',
            flex: 2
        },
        {
            field: 'actions',
            headerName: 'Action',
            headerAlign: 'center',
            description: 'This column has actions and is not sortable.',
            flex: 1,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton component={Link} to={`update/${params.row.id}`} color='warning'>
                        <Edit />
                    </IconButton>
                    <IconButton color='error' onClick={(e) => {
                        e.stopPropagation()
                        showAlert("Are You Sure?", "You want to  delete this user!", "warning", true, "Yes", () => { console.log("Deleting user id:" + params.row.id) })
                    }}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ]

    const fetchUsers = async () => {
        try {
            const usersData = await getAllUsers()
            console.log(usersData)
            setUsers(usersData.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const handleStatusToggle = async (id, status) => {
        try {
            const usersData = await updateUser(id, { status: status ? 1 : 0 })
            console.log(usersData)
            fetchUsers()
        } catch (error) {
            console.error('Error user status change:', error)
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Users</Typography>
                </Grid2>
                <Grid2 xs={12} md={4} sx={{
                    textAlign: 'end'
                }}>
                    <Button component={Link} to="/users/create" variant="contained" endIcon={<Add />}>
                        New User
                    </Button>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <DataTable
                    rows={users}
                    columns={columns}
                />
            </Box>
        </MainLayout>
    )
}

export default UserView