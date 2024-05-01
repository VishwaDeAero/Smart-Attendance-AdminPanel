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
import { getAttendanceStats, getDailyStats } from '../../services/analyticsService'

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
    const [formData, setFormData] = useState({
        startDate: null,
        endDate: null,
    })
    const [chartData, setChartData] = useState({
        lectureAttendanceData: null,
        subjectAttendance: null,
        totalAttendance: null,
    })
    const [analyticsData, setAnalyticsData] = useState(null)

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
        labels: ['Present', 'Absent'],
        datasetLabels: ['Attendance'], // Labels for each dataset
        datasets: [
            [30, 40], // Attendance data
            // Add more datasets as needed
        ],
    }

    const chartData1 = {
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
        fetchDailyStats();
        fetchAttendanceData();
    }, [])

    useEffect(() => {
        if (analyticsData) {
            showLoading()
            let lectureChartData = getLectureChartData();
            let subjectChartData = getSubjectChartData();
            let totalChartData = getTotalChartData();
            setChartData({
                lectureAttendanceData: lectureChartData,
                subjectAttendance: subjectChartData,
                totalAttendance: totalChartData
            })
            console.log("Chart Data:", chartData)
        }
    }, [analyticsData])

    const fetchDailyStats = async () => {
        try {
            const dailyStatsResult = await getDailyStats({}, auth)
            if (dailyStatsResult?.data) {
                let attendedStudents = dailyStatsResult.data.dailyAttendance
                let allStudents = dailyStatsResult.data.enrolledStudents
                let absentStudents = allStudents.length - attendedStudents.length;
                let lecturesHeld = dailyStatsResult.data.heldLectures;
                let allLectures = dailyStatsResult.data.allLectures;
                let upcomingLectures = allLectures.length - lecturesHeld.length;
                setDailyStats({
                    attendanceMarked: attendedStudents.length,
                    attendanceAbsent: (absentStudents > 0) ? absentStudents : 0,
                    attendancePercentage: (allStudents.length == 0) ? (attendedStudents.length / allStudents.length) * 100 : 0,
                    lecturesHeld: lecturesHeld.length,
                    lecturesUpcoming: (upcomingLectures > 0) ? upcomingLectures : 0,
                    totalLectures: allLectures.length,
                    dataSet: dailyStatsResult.data,
                })
            }
        } catch (error) {
            console.error('Error fetching daily stats:', error)
        }
        closeAlert()
    }

    const fetchAttendanceData = async () => {
        try {
            const attendanceStats = await getAttendanceStats(formData, auth)
            console.log(attendanceStats)
            if (attendanceStats?.data) {
                let data = attendanceStats.data
                setAnalyticsData(data)
            }
        } catch (error) {
            console.error('Error fetching attendances:', error)
        }
        closeAlert()
    }

    const getTotalChartData = () => {

        const { enrolledLectureData, attendanceData } = analyticsData

        let totalAttendanceData = {
            labels: ['Present', 'Absent'],
            datasetLabels: ['Attendance'], // Labels for each dataset
            datasets: [
                [], // 'Present', 'Absent'
                // Add more datasets as needed
            ],
        }

        let allAttendance = attendanceData.length;
        let enrolledStudents = 0;

        // Iterate over the enrolledLectureData to calculate total enrolled students
        enrolledLectureData.forEach((lecture) => {
            enrolledStudents += lecture.enrolledStudents.length
        });

        totalAttendanceData.datasets[0][0] = allAttendance;
        totalAttendanceData.datasets[0][1] = (enrolledStudents - allAttendance);

        closeAlert()
        return totalAttendanceData;
    }

    const getLectureChartData = () => {

        const { enrolledLectureData, attendanceData } = analyticsData

        let lectureAttendance = {
            labels: [],
            datasetLabels: ['Present', 'Absent'],
            datasets: [[], []],
        };

        // Create a map to store attendance data for each lecture
        const lectureAttendanceMap = new Map();

        // Iterate over the enrolledLectureData to populate labels and initialize attendance map
        enrolledLectureData.forEach((lecture) => {
            const label = `${lecture.subject.code} - ${moment(lecture.scheduledAt).format('YYYY/MM/DD')}`;
            lectureAttendance.labels.push(label);
            lectureAttendanceMap.set(lecture.id, { attended: 0, total: lecture.enrolledStudents.length });
        });

        // Iterate over attendance data to calculate attendance and absent counts for each lecture
        attendanceData.forEach((attendance) => {
            const lectureId = attendance.lectureId;
            if (lectureAttendanceMap.has(lectureId)) {
                const attendanceInfo = lectureAttendanceMap.get(lectureId);
                attendanceInfo.attended++;
            }
        });

        // Generate data points for each dataset
        lectureAttendanceMap.forEach((attendanceInfo) => {
            lectureAttendance.datasets[0].push(attendanceInfo.attended);
            lectureAttendance.datasets[1].push(attendanceInfo.total - attendanceInfo.attended);
        });

        closeAlert()
        return lectureAttendance;
    };

    const getSubjectChartData = () => {

        const { enrolledLectureData, attendanceData } = analyticsData

        // Initialize an empty object to store attendance and absent data for each subject
        const attendanceMap = {};
        const absentMap = {};

        // Iterate over each lecture in the enrolled lecture data
        enrolledLectureData.forEach(lecture => {
            const subjectCode = lecture.subject.code;

            // Initialize arrays for attendance and absent data if not already created
            if (!attendanceMap[subjectCode]) {
                attendanceMap[subjectCode] = [];
                absentMap[subjectCode] = [];
            }

            // Find attendance data for the current lecture
            const lectureAttendance = attendanceData.filter(attendance => attendance.lectureId === lecture.id);

            // Calculate attendance and absent data for the current lecture
            const totalEnrolledStudents = lecture.enrolledStudents.length;
            const attendedStudents = lectureAttendance.length;
            const absentStudents = totalEnrolledStudents - attendedStudents;

            // Push the attendance and absent data to the corresponding arrays
            attendanceMap[subjectCode].push(attendedStudents);
            absentMap[subjectCode].push(absentStudents);
        });

        // Extract subject codes and datasets from the attendance and absent maps
        const labels = Object.keys(attendanceMap);
        const attendanceDatasets = Object.values(attendanceMap).flat();
        const absentDatasets = Object.values(absentMap).flat();

        // Construct the chart data object
        const chartData = {
            labels: labels,
            datasetLabels: ['Attendance', 'Absent'],
            datasets: [attendanceDatasets, absentDatasets],
        };

        closeAlert()
        return chartData;
    };


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
                            fetchAttendanceData()
                        }
                    }>
                        Search
                    </Button>
                </Grid2>
            </Grid2>
            <Grid2 marginTop={2} xs={12}>
                <Card>
                    <CardContent>
                        <Grid2 container marginTop={4} spacing={2}>
                            <Grid2 xs={12} md={8}>
                                <Typography fontWeight='bold' variant='h6'>Lecture Attendance</Typography>
                                {chartData.lectureAttendanceData && <LineChart id='lectureAttendance' chartData={chartData.lectureAttendanceData} />}
                            </Grid2>
                            <Grid2 xs={12} md={4}>
                                <Typography fontWeight='bold' variant='h6' align='center'>Total Attendance</Typography>
                                {chartData.totalAttendance && <PieChart id='totalAttendance' chartData={chartData.totalAttendance} />}
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 container marginTop={2} spacing={2}>
                <Grid2 xs={12}>
                    <Card>
                        <CardContent>
                            <Typography fontWeight='bold' variant='h6'>Subject Attendance</Typography>
                            <Grid2 container marginTop={4} spacing={2}>
                                <Grid2 xs={12}>
                                    {chartData.subjectAttendance && <BarChart chartData={chartData.subjectAttendance} />}
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