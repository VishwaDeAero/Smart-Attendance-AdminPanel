import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { getAllSubjects } from '../../services/subjectService';
import { DatePicker } from '@mui/x-date-pickers';
import { Search } from '@mui/icons-material';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { getSubjectAttendance } from '../../services/reportService';

const SubjectReportView = () => {
    const auth = useAuthHeader()
    const [attendances, setAttendances] = useState([])
    const [subjects, setSubjects] = useState([])
    const [formData, setFormData] = useState({
        subjectId: null,
        startDate: null,
        endDate: null,
    })

    useEffect(() => {
        // Fetch subjects from API
        getAllSubjects()
            .then(subjects => {
                console.log(subjects)
                setSubjects(subjects.data);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
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
            field: 'indexNo',
            headerName: 'Index Number',
            headerAlign: 'center',
            align: 'center',
            flex: 2,
        },
        {
            field: 'name',
            headerName: 'Student',
            headerAlign: 'center',
            flex: 3,
        },
        {
            field: 'lectureInfo',
            headerName: 'Lecture Date & Time',
            flex: 2,
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

    const fetchSubjectAttendances = async (attendanceData) => {
        try {
            const attendancesData = await getSubjectAttendance(attendanceData, auth)
            if (attendancesData?.data) {
                let structuredAttendanceData = (attendancesData.data).map((attendance) => {
                    return {
                        ...attendance,
                        lectureInfo: `${attendance.lecture.location} - ${moment(attendance.lecture.scheduledAt).format('YYYY/MM/DD HH:mm')}`
                    }
                })
                setAttendances(structuredAttendanceData)
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
                    <Typography variant='h5' component='h1'>Subject Attendance</Typography>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="subjectLabel">Subject</InputLabel>
                            <Select
                                labelId="subjectLabel"
                                id="subjectId"
                                name="subjectId"
                                value={formData.subjectId}
                                label="Subject"
                                onChange={handleChange}
                            >
                                <MenuItem key={0} value={0} disabled={true}>
                                    Select Subject
                                </MenuItem>
                                {subjects.map(subject => (
                                    <MenuItem key={subject.id} value={subject.id}>
                                        {subject.name}
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
                                maxDate={moment(formData.endDate)}
                                disableFuture={true}
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
                                minDate={moment(formData.startDate)}
                                disableFuture={true}
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
                                if (formData.subjectId) {
                                    showLoading()
                                    fetchSubjectAttendances(formData)
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

export default SubjectReportView