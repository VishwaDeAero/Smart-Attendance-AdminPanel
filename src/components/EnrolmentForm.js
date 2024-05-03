import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import { getAllSubjects } from '../services/subjectService'

const EnrolmentForm = ({ open, onClose, onSubmit, studentId, enrolledIds }) => {
    const [subjects, setSubjects] = useState([])
    const [formData, setFormData] = useState({
        studentId: studentId,
        subjectId: '',
    })

    useEffect(() => {
        setFormData({
            ...formData,
            studentId: studentId
        })
    }, [studentId])

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

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Call the onSubmit function with the form data
        formData.id ? onSubmit(formData.id, formData) : onSubmit(formData)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle align='center' >Enroll Subjects</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid2 sm={12} md={12} container spacing={2} mt={2}>
                        <Grid2 xs={12} md={12}>
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
                                        <MenuItem key={subject.id} value={subject.id} disabled={enrolledIds.includes(subject.id)}>
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 sm={12} md='auto'>
                            <Button fullWidth type="submit" variant="contained" color="primary" sx={{ width: { sm: '100%', md: 'auto' } }}>
                                Submit
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EnrolmentForm