import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { getAllStudents } from '../../services/studentService';
import { getStudentAttendance } from '../../services/reportService';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

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

    useEffect(() => {
        if (formData.studentId) {
            showLoading()
            let attendanceData = {
                student_id: formData.studentId,
                start_date: formData.startDate,
                end_date: formData.endDate,
            }
            fetchStudentAttendances(attendanceData)
        }
    }, [formData])

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
                <Grid2 container spacing={2} marginBottom={2}>
                    <Grid2 xs={12} md={6}>
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