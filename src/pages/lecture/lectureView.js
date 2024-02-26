import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, IconButton, Switch, Typography } from '@mui/material'
import { Add, Delete, Edit, QrCode, QrCode2, Visibility } from '@mui/icons-material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { Link } from 'react-router-dom'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { deleteLecture, getAllLectures, updateLecture } from '../../services/lectureService'

const LectureView = () => {

    const [lectures, setLectures] = useState([])

    useEffect(() => {
        showLoading()
        fetchLectures()
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
            field: 'subject',
            headerName: 'Subject',
            flex: 2,
        },
        {
            field: 'location',
            headerName: 'Location',
            flex: 2
        },
        {
            field: 'lecturer',
            headerName: 'Lecturer',
            flex: 2
        },
        {
            field: 'duration',
            headerName: 'Duration',
            flex: 1
        },
        {
            field: 'scheduledAt',
            headerName: 'Date Time',
            flex: 2,
            renderCell: (params) => (
                <>{moment(params.value).format('YYYY/MM/DD HH:mm')}</>
            ),
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
                    onChange={(e) => {
                        showLoading()
                        handleStatusToggle(params.row.id, e.target.checked)
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            ),
        },
        {
            field: 'updatedAt',
            headerName: 'Last Modified',
            flex: 2,
            renderCell: (params) => (
                <>{moment(params.value).format('YYYY/MM/DD HH:mm')}</>
            ),
        },
        {
            field: 'actions',
            headerName: 'Action',
            headerAlign: 'center',
            description: 'This column has actions and is not sortable.',
            flex: 2,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton color='primary'>
                        <QrCode2 />
                    </IconButton>
                    <IconButton component={Link} to={`update/${params.row.id}`} color='warning'>
                        <Edit />
                    </IconButton>
                    <IconButton color='error' onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteLecture(params.row.id)
                    }}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ]

    const fetchLectures = async () => {
        try {
            const lecturesData = await getAllLectures()
            if (lecturesData?.data) {
                setLectures(lecturesData.data)
            }
        } catch (error) {
            console.error('Error fetching lectures:', error)
        }
        closeAlert()
    }

    const handleDeleteLecture = async (id) => {
        showAlert(
            "Are You Sure?",
            "You want to  delete this lecture!",
            "warning",
            true,
            "Yes",
            async () => {
                showLoading()
                try {
                    const lecturesData = await deleteLecture(id)
                    console.log(lecturesData)
                    fetchLectures()
                    showAlert("Lecture Deleted", `lecture id:${id} deleted successfully.`, "success")
                } catch (error) {
                    console.error('Error lecture delete:', error)
                    showAlert("Delete Lecture Failed", error, "error")
                }
            }
        )
    }

    const handleStatusToggle = async (id, status) => {
        try {
            const lecturesData = await updateLecture(id, { status: status ? 1 : 0 })
            console.log(lecturesData)
            fetchLectures()
        } catch (error) {
            showAlert("Update Lecture Status Failed", "Woah! Something Wrong Happened", "error")
            console.error('Error lecture status change:', error)
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Lectures</Typography>
                </Grid2>
                <Grid2 xs={12} md={4} sx={{
                    textAlign: 'end'
                }}>
                    <Button component={Link} to="/lectures/create" variant="contained" endIcon={<Add />}>
                        New Lecture
                    </Button>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <DataTable
                    rows={lectures}
                    columns={columns}
                />
            </Box>
        </MainLayout>
    )
}

export default LectureView