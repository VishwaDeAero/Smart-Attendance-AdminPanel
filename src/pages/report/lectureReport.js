import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import moment from 'moment';
import DataTable from '../../components/DataTable'
import { showAlert, showLoading, closeAlert } from '../../utils/swal'
import { getLectureAttendance } from '../../services/reportService';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Search } from '@mui/icons-material';
import { getAllSubjects } from '../../services/subjectService';
import { getLecturesBySubject } from '../../services/lectureService';

const LectureReportView = () => {
    const auth = useAuthHeader()
    const [attendances, setAttendances] = useState([])
    const [subjects, setSubjects] = useState([])
    const [lectures, setLectures] = useState([])
    const [formData, setFormData] = useState({
        subjectId: null,
        lectureId: null,
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

    useEffect(() => {
        // Fetch lectures from API
        if (formData.subjectId) {
            getLecturesBySubject(formData.subjectId)
                .then(lectures => {
                    console.log(lectures)
                    setLectures(lectures.data);
                })
                .catch(error => {
                    console.error('Error fetching lectures:', error);
                })
        }

    }, [formData.subjectId])

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
            field: 'attendedAt',
            headerName: 'Attended At',
            flex: 2,
            renderCell: (params) => (
                <>{(params.row.attendedAt) ? moment(params.row.attendedAt).format('YYYY/MM/DD HH:mm') : <Typography color='red'>Absent</Typography>}</>
            ),
        },
    ]

    const fetchLectureAttendances = async (attendanceData) => {
        try {
            const attendancesData = await getLectureAttendance(attendanceData, auth)
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
                    <Typography variant='h5' component='h1'>Lecture Attendance</Typography>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <Grid2 container spacing={2} marginBottom={1}>
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
                            <InputLabel id="lectureLabel">Lecture</InputLabel>
                            <Select
                                labelId="lectureLabel"
                                id="lectureId"
                                name="lectureId"
                                value={formData.lectureId}
                                label="Lecture"
                                onChange={handleChange}
                            >
                                <MenuItem key={0} value={0} disabled={true}>
                                    Select Lecture
                                </MenuItem>
                                {lectures.map(lecture => (
                                    <MenuItem key={lecture.id} value={lecture.id}>
                                        {moment(lecture.scheduledAt).format('YY/MM/DD HH:mm')} - {lecture.location}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 xs={12} md={4} sx={{
                        textAlign: 'start'
                    }}>
                        <Button variant="contained" endIcon={<Search />} onClick={
                            (e) => {
                                e.stopPropagation()
                                if (formData.lectureId) {
                                    showLoading()
                                    fetchLectureAttendances(formData)
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

export default LectureReportView