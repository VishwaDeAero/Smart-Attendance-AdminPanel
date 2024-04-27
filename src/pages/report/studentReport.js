import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { getAllStudents } from '../../services/studentService';
import { getStudentAttendance } from '../../services/reportService';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { DatePicker } from '@mui/x-date-pickers';
import { Search } from '@mui/icons-material';

const StudentReportView = () => {
    const auth = useAuthHeader()
    const [attendances, setAttendances] = useState([])
    const [students, setStudents] = useState([])
    const [formData, setFormData] = useState({
        studentId: null,
        startDate: null,
        endDate: null
    })

    useEffect(() => {
        // Fetch students from API
        getAllStudents()
            .then(students => {
                console.log(students)
                setStudents(students.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            })

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
                <>{params.row.subject?.name}</>
            ),
        },
        {
            field: 'lecture',
            headerName: 'Lecture Data & Time',
            flex: 2,
            renderCell: (params) => (
                <>{moment(params.row.scheduledAt).format('YYYY/MM/DD HH:mm')}</>
            ),
        },
        {
            field: 'attendedAt',
            headerName: 'Attended At',
            flex: 2,
            renderCell: (params) => (
                <>{(params.row.attendedAt) ? moment(params.row.attendedAt).format('YYYY/MM/DD HH:mm') : <Typography color='red'>Absent</Typography>}</>
            ),
        },
    ]

    const fetchStudentAttendances = async (attendanceData) => {
        try {
            const attendancesData = await getStudentAttendance(attendanceData, auth)
            if (attendancesData?.data) {
                setAttendances(attendancesData.data)
            }
        } catch (error) {
            console.error('Error fetching attendances:', error)
        }
        closeAlert()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
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
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="studentLabel">Student Name</InputLabel>
                            <Select
                                labelId="studentLabel"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                label="Student Name"
                                onChange={handleChange}
                            >
                                <MenuItem key={0} value={0} disabled={true}>
                                    Select Student
                                </MenuItem>
                                {students.map(student => (
                                    <MenuItem key={student.id} value={student.id}>
                                        {student.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 xs={12} md={4}>
                        <FormControl fullWidth>
                            <DatePicker
                                id="startDate"
                                name="startDate"
                                label="Start Date"
                                value={moment(formData.startDate)}
                                onChange={(event) => { setFormData({ ...formData, startDate: event }) }}
                                fullWidth
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 xs={12} md={4}>
                        <FormControl fullWidth>
                            <DatePicker
                                id="endDate"
                                name="endDate"
                                label="End Date"
                                value={moment(formData.endDate)}
                                onChange={(event) => { setFormData({ ...formData, endDate: event }) }}
                                fullWidth
                            />
                        </FormControl>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} marginBottom={1}>
                    <Grid2 xs={12} sx={{
                        textAlign: 'end'
                    }}>
                        <Button variant="contained" endIcon={<Search />} onClick={
                            (e) => {
                                e.stopPropagation()
                                if (formData.studentId) {
                                    showLoading()
                                    let attendanceData = {
                                        student_id: formData.studentId,
                                        start_date: formData.startDate,
                                        end_date: formData.endDate,
                                    }
                                    fetchStudentAttendances(attendanceData)
                                }
                            }
                        }>
                            Search
                        </Button>
                    </Grid2>
                </Grid2>
                <DataTable
                    rows={attendances}
                    columns={columns}
                />
            </Box>
        </MainLayout>
    )
}

export default StudentReportView