import { ArrowBack } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import LectureForm from '../../components/LectureForm'
import { getLecture, updateLecture } from '../../services/lectureService'
import { closeAlert, showAlert, showLoading } from '../../utils/swal'

const LectureUpdate = () => {

    const { id } = useParams();
    const [lecture, setLecture] = useState([])

    useEffect(() => {
        fetchLecture(id)
    }, [])

    const fetchLecture = async (id) => {
        try {
            const lectureData = await getLecture(id)
            setLecture(lectureData.data)
        } catch (error) {
            console.error(`Error fetching lecture ${id}:`, error)
        }
    }

    const handleLectureUpdate = async (id, data) => {
        showLoading()
        try {
            const lectureData = await updateLecture(id, data)
            console.log(lectureData)
            fetchLecture(id)
            showAlert("Update Successful",`Lecture id:${id} updated successfully.`, "success")
        } catch (error) {
            console.error(`Error lecture id ${id} update:`, error)
            showAlert("Update Failed",error, "error")
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Update Lecture</Typography>
                </Grid2>
                <Grid2 xs={12} md={4} sx={{
                    textAlign: 'end'
                }}>
                    <Button component={Link} to="/lectures" variant="contained" endIcon={<ArrowBack />}>
                        Back
                    </Button>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <LectureForm initialValues={lecture} onSubmit={handleLectureUpdate}/>
            </Box>
        </MainLayout>
    )
}

export default LectureUpdate