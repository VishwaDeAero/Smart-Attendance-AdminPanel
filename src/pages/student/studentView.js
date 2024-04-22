import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, Switch, Typography } from '@mui/material'
import { Delete, Visibility } from '@mui/icons-material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { Link } from 'react-router-dom'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { deleteStudent, getAllStudents, updateStudent } from '../../services/studentService'

const StudentView = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        showLoading()
        fetchStudents()
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
            flex: 2,
        },
        {
            field: 'indexNo',
            headerName: 'Index Number',
            flex: 1
        },
        {
            field: 'subjects',
            headerName: 'Enrolled Subjects',
            flex: 2,
            renderCell: (params) => (
                <List disablePadding={true} dense={true}>
                    {(params.value).map((subject) => {
                        return <ListItem disablePadding={true}>
                            <ListItemText>{subject.name}</ListItemText>
                        </ListItem>
                    })}
                </List>
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
            flex: 1,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton component={Link} to={`update/${params.row.id}`} color='warning'>
                        <Visibility />
                    </IconButton>
                    <IconButton color='error' onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteStudent(params.row.id)
                    }}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ]

    const fetchStudents = async () => {
        try {
            const studentsData = await getAllStudents()
            if (studentsData?.data) {
                console.log("Students Data", studentsData)
                setStudents(studentsData.data)
            }
        } catch (error) {
            console.error('Error fetching students:', error)
        }
        closeAlert()
    }

    const handleDeleteStudent = async (id) => {
        showAlert(
            "Are You Sure?",
            "You want to  delete this student!",
            "warning",
            true,
            "Yes",
            async () => {
                showLoading()
                try {
                    const studentsData = await deleteStudent(id)
                    console.log(studentsData)
                    fetchStudents()
                    showAlert("Student Deleted", `student id:${id} deleted successfully.`, "success")
                } catch (error) {
                    console.error('Error student delete:', error)
                    showAlert("Delete Student Failed", error, "error")
                }
            }
        )
    }

    const handleStatusToggle = async (id, status) => {
        try {
            const studentsData = await updateStudent(id, { status: status ? 1 : 0 })
            console.log(studentsData)
            fetchStudents()
        } catch (error) {
            console.error('Error student status change:', error)
            closeAlert()
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Students</Typography>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <DataTable
                    rows={students}
                    columns={columns}
                />
            </Box>
        </MainLayout>
    )
}

export default StudentView