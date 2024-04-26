import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { getAllAttendances, } from '../../services/attendanceService'

const StudentReportView = () => {
    const [attendances, setAttendances] = useState([])

    useEffect(() => {
        showLoading()
        fetchAttendances()
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
            renderCell: (params) => (
                <>{params.row.lecture?.subject?.name}</>
            ),
        },
        {
            field: 'lecture',
            headerName: 'Lecture Data & Time',
            flex: 2,
            renderCell: (params) => (
                <>{moment(params.row.lecture.scheduledAt).format('YYYY/MM/DD HH:mm')}</>
            ),
        },
        {
            field: 'attendedAt',
            headerName: 'Attended At',
            flex: 2,
            renderCell: (params) => (
                <>{moment(params.value).format('YYYY/MM/DD HH:mm')}</>
            ),
        },
    ]

    const fetchAttendances = async () => {
        try {
            const attendancesData = await getAllAttendances()
            if (attendancesData?.data) {
                setAttendances(attendancesData.data)
            }
        } catch (error) {
            console.error('Error fetching attendances:', error)
        }
        closeAlert()
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Student Attendance</Typography>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <DataTable
                    rows={attendances}
                    columns={columns}
                />
            </Box>
        </MainLayout>
    )
}

export default StudentReportView