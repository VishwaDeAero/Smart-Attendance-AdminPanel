import React from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, IconButton, Switch, Typography } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
import DataTable from '../../components/DataTable'
import { Link } from 'react-router-dom'

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
                //   onChange={() => handleStatusToggle(params.row.id)}
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
                <IconButton color='error'>
                    <Delete />
                </IconButton>
            </div>
        ),
    },
];

const rows = [
    { id: 1, name: 'Jon Snow', username: 'JonSnow22', email: 'JonSnow22@gmail.com', status: 1, updatedAt: '12:00:00 12/12/2023', actions: 'edit delete buttons', },
    { id: 2, name: 'Jon Snow', username: 'JonSnow22', email: 'JonSnow22@gmail.com', status: 0, updatedAt: '12:00:00 12/12/2023', actions: 'edit delete buttons', },
];

const UserView = () => {
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
                    rows={rows}
                    columns={columns}
                />
            </Box>
        </MainLayout>
    )
}

export default UserView