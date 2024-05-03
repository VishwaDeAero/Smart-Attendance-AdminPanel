import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { getAllAttendances, addAttendance } from '../../services/attendanceService'
import AttendanceForm from '../../components/AttendanceForm'

const AttendanceView = () => {
    const [attendances, setAttendances] = useState([])
    const [openAttendanceModal, setOpenAttendanceModal] = useState(false);

    const handleOpenAttendanceModal = () => {
        setOpenAttendanceModal(true);
    };

    const handleCloseAttendanceModal = () => {
        setOpenAttendanceModal(false);
    };

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
            field: 'student',
            headerName: 'Student',
            flex: 2,
            renderCell: (params) => (
                <>{params.value?.name}</>
            ),
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

    const handleAttendanceMark = async (data) => {
        handleCloseAttendanceModal()
        showLoading()
        try {
            const attendanceData = await addAttendance(data)
            if(attendanceData.status == 'OK'){
                showAlert("New Attendance Marked", `Attendance marked successfully.`, "success")
                fetchAttendances()
            }else{
                showAlert("Mark Attendance Failed", attendanceData.details, "error")
            }
        } catch (error) {
            console.error(`Error attendance mark:`, error)
            showAlert("Mark Attendance Failed", error, "error")
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Attendances</Typography>
                </Grid2>
                <Grid2 xs={12} md={4} sx={{
                    textAlign: 'end'
                }}>
                    <Button variant="contained" endIcon={<Add />} onClick={
                        (e) => {
                            e.stopPropagation()
                            handleOpenAttendanceModal()
                        }
                    }>
                        Mark Attendance
                    </Button>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <DataTable
                    rows={attendances}
                    columns={columns}
                />
            </Box>
            <AttendanceForm open={openAttendanceModal} onClose={handleCloseAttendanceModal} onSubmit={handleAttendanceMark} />
        </MainLayout>
    )
}

export default AttendanceView