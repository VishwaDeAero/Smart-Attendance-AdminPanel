import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Button, Card, CardContent, FormControl, Typography } from '@mui/material'
import LineChart from '../../components/charts/LineChart'
import PieChart from '../../components/charts/PieChart'
import BarChart from '../../components/charts/BarChart'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { closeAlert, showLoading } from '../../utils/swal'
import { Search } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { getDailyStats } from '../../services/analyticsService'

const DashboardView = () => {
    const auth = useAuthHeader()
    const [dailyStats, setDailyStats] = useState({
        attendanceMarked: 0,
        attendanceAbsent: 0,
        attendancePercentage: 0,
        lecturesHeld: 0,
        lecturesUpcoming: 0,
        totalLectures: 0,
        dataSet: null,
    })
    const [attendances, setAttendances] = useState([])
    const [formData, setFormData] = useState({
        startDate: null,
        endDate: null,
    }) // State to hold fetched data
    const lectureAttendance = {
        labels: ['ITE3332', 'ITE2432', 'ITE4333', 'ITE3322'],
        datasetLabels: ['Present', 'Absent', 'Late'], // Labels for each dataset
        datasets: [
            [20, 18, 22, 0], // Attendance data
            [3, 1, 4, 0],     // Absent data
            [0, 1, 2, 0],  // Late data
            // Add more datasets as needed
        ],
    }

    const totalAttendance = {
        label: 'Test',
        datasetLabels: ['Present', 'Absent', 'Late'], // Labels for each dataset
        datasets: [
            [60, 8, 3],  // Late data
            // Add more datasets as needed
        ],
    }

    const chartData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasetLabels: ['Attendance', 'Absent', 'Late'], // Labels for each dataset
        datasets: [
            [30, 40, 50, 45, 55], // Attendance data
            [5, 10, 8, 12, 6],     // Absent data
            [10, 15, 20, 18, 25],  // Late data
            // Add more datasets as needed
        ],
    };

    useEffect(() => {
        showLoading()
        fetchFilteredAttendances()
    }, [formData])

    useEffect(() => {
        showLoading()
        fetchDailyStats();
    }, [])

    const fetchDailyStats = async () => {
        try {
            const dailyStatsResult = await getDailyStats( {}, auth)
            if (dailyStatsResult?.data) {
                let attendedStudents = dailyStatsResult.data.dailyAttendance
                let allStudents = dailyStatsResult.data.enrolledStudents
                let absentStudents = allStudents.length - attendedStudents.length;
                let lecturesHeld = dailyStatsResult.data.heldLectures;
                let allLectures = dailyStatsResult.data.allLectures;
                let upcomingLectures = allLectures.length - lecturesHeld.length;
                setDailyStats({
                    attendanceMarked: attendedStudents.length,
                    attendanceAbsent: absentStudents,
                    attendancePercentage: (attendedStudents.length/allStudents.length)*100,
                    lecturesHeld: lecturesHeld.length,
                    lecturesUpcoming: upcomingLectures,
                    totalLectures: allLectures.length,
                    dataSet: dailyStatsResult.data,
                })
            }
        } catch (error) {
            console.error('Error fetching daily stats:', error)
        }
        closeAlert()
    }

    const fetchFilteredAttendances = async () => {
        // try {
        //     const attendancesData = await getStudentAttendance(attendanceData, auth)
        //     if (attendancesData?.data) {
        //         setAttendances(attendancesData.data)
        //     }
        // } catch (error) {
        //     console.error('Error fetching attendances:', error)
        // }
        closeAlert()
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12}>
                    <Typography fontWeight='bold' variant='h6'>Daily Performance</Typography>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>{dailyStats.attendanceMarked}</Typography>
                            <Typography fontWeight='bold' variant='h8'>Attendance<br />Marked</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>{dailyStats.attendanceAbsent}</Typography>
                            <Typography fontWeight='bold' variant='h8'>Attendance<br />Absent</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>{dailyStats.attendancePercentage}%</Typography>
                            <Typography fontWeight='bold' variant='h8'>Attendance<br />Percentage</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>{dailyStats.lecturesHeld}</Typography>
                            <Typography fontWeight='bold' variant='h8'>Lectures<br />Held</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>{dailyStats.lecturesUpcoming}</Typography>
                            <Typography fontWeight='bold' variant='h8'>Lectures<br />Upcoming</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>{dailyStats.totalLectures}</Typography>
                            <Typography fontWeight='bold' variant='h8'>Total<br />Lectures</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

            <Grid2 container marginTop={4} spacing={2}>
                <Grid2 xs={12}>
                    <Typography fontWeight='bold' variant='h6'>Attendance Performance</Typography>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={3}>
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
                <Grid2 xs={12} md={3}>
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
                <Grid2 xs={12} md={4} sx={{
                    textAlign: 'start',
                    alignSelf: 'center'
                }}>
                    <Button variant="contained" endIcon={<Search />} onClick={
                        (e) => {
                            e.stopPropagation()
                            showLoading()
                            fetchFilteredAttendances()
                        }
                    }>
                        Search
                    </Button>
                </Grid2>
            </Grid2>
            <Grid2 marginTop={2}  xs={12}>
                <Card>
                    <CardContent>
                        <Grid2 container marginTop={4} spacing={2}>
                            <Grid2 xs={12} md={8}>
                                <LineChart id='lectureAttendance' chartData={lectureAttendance} />
                            </Grid2>
                            <Grid2 xs={12} md={4}>
                                <PieChart id='totalAttendance' chartData={totalAttendance} />
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 container marginTop={2} spacing={2}>
                <Grid2 xs={12}>
                    <Card>
                        <CardContent>
                            <Typography fontWeight='bold' variant='h6'>Lecture Attendance</Typography>
                            <Grid2 container marginTop={4} spacing={2}>
                                <Grid2 xs={12}>
                                    <BarChart chartData={chartData} />
                                </Grid2>
                            </Grid2>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

        </MainLayout>
    )
}

export default DashboardView