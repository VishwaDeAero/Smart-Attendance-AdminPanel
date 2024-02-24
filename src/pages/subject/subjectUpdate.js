import { ArrowBack } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import SubjectForm from '../../components/SubjectForm'
import { getSubject, updateSubject } from '../../services/subjectService'
import { closeAlert, showAlert, showLoading } from '../../utils/swal'

const SubjectUpdate = () => {

    const { id } = useParams();
    const [subject, setSubject] = useState([])

    useEffect(() => {
        fetchSubject(id)
    }, [])

    const fetchSubject = async (id) => {
        try {
            const subjectData = await getSubject(id)
            setSubject(subjectData.data)
        } catch (error) {
            console.error(`Error fetching subject ${id}:`, error)
        }
    }

    const handleSubjectUpdate = async (id, data) => {
        showLoading()
        try {
            const subjectData = await updateSubject(id, data)
            console.log(subjectData)
            fetchSubject(id)
            showAlert("Update Successful",`Subject id:${id} updated successfully.`, "success")
        } catch (error) {
            console.error(`Error subject id ${id} update:`, error)
            showAlert("Update Failed",error, "error")
        }
    }

    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <Typography variant='h5' component='h1'>Update Subject</Typography>
                </Grid2>
                <Grid2 xs={12} md={4} sx={{
                    textAlign: 'end'
                }}>
                    <Button component={Link} to="/subjects" variant="contained" endIcon={<ArrowBack />}>
                        Back
                    </Button>
                </Grid2>
            </Grid2>
            <Divider sx={{ my: 3 }} />
            <Box padding={2}>
                <SubjectForm initialValues={subject} onSubmit={handleSubjectUpdate}/>
            </Box>
        </MainLayout>
    )
}

export default SubjectUpdate