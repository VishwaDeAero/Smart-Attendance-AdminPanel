import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Card, CardContent, Typography } from '@mui/material'
import { Chart } from 'chart.js/auto'
import LineChart from '../../components/charts/LineChart'
import PieChart from '../../components/charts/PieChart'
import BarChart from '../../components/charts/BarChart'

const DashboardView = () => {  // State to hold fetched data
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

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>22</Typography>
                            <Typography fontWeight='bold' variant='h8'>Attendance<br />Marked</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>10</Typography>
                            <Typography fontWeight='bold' variant='h8'>Attendance<br />Absent</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>60%</Typography>
                            <Typography fontWeight='bold' variant='h8'>Attendance<br />Percentage</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>4</Typography>
                            <Typography fontWeight='bold' variant='h8'>Lectures<br />Held</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>6</Typography>
                            <Typography fontWeight='bold' variant='h8'>Lectures<br />Upcoming</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs={12} md={2}>
                    <Card sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }}>
                        <CardContent align='center'>
                            <Typography fontWeight='bold' color='purple' variant='h3'>10</Typography>
                            <Typography fontWeight='bold' variant='h8'>Total<br />Lectures</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

            <Grid2 container marginTop={4} spacing={2}>
                <Grid2 xs={12}>
                    <Card>
                        <CardContent>
                            <Typography fontWeight='bold' variant='h6'>Today Students' Performance</Typography>
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
            </Grid2>

            <Grid2 container marginTop={4} spacing={2}>
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