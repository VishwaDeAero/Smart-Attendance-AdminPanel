import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { getAllSubjects } from '../services/subjectService'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getAllLecturers } from '../services/userService';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const LectureForm = ({ initialValues, onSubmit }) => {
    const authUser = useAuthUser()
    const [subjects, setSubjects] = useState([])
    const [lecturers, setLecturers] = useState([])
    const [formData, setFormData] = useState({
        id: null,
        subjectId: '',
        lecturerId: '',
        duration: '',
        location: '',
        scheduledAt: moment(),
    })

    useEffect(() => {
        // Set initial values when provided through props
        if (initialValues) {
            setFormData(initialValues)
        }
    }, [initialValues])

    useEffect(() => {
        // Fetch subjects from your API
        getAllSubjects()
            .then(subjects => {
                setSubjects(subjects.data);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            })
        // Fetch lecturers from your API
        getAllLecturers()
            .then(lecturers => {
                setLecturers(lecturers);
            })
            .catch(error => {
                console.error('Error fetching lecturers:', error);
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
        <form onSubmit={handleSubmit}>
            <Grid2 sm={12} md={8} container spacing={2}>
                <Grid2 item xs={12} md={8}>
                    <FormControl fullWidth>
                        <DateTimePicker
                            id="scheduledAt"
                            name="scheduledAt"
                            label="Date & Time"
                            value={moment(formData.scheduledAt)}
                            onChange={(event) => { setFormData({ ...formData, "scheduledAt": event }) }}
                            fullWidth
                            required
                        />
                    </FormControl>
                </Grid2>
                {/* <Grid2 item xs={12} md={4}>
                    <FormControl fullWidth>
                        <TextField
                            id="date"
                            name="date"
                            label="Date"
                            type="date"
                            value={moment(formData.date).format('YYYY-MM-DD')}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                        />
                    </FormControl>
                </Grid2> */}
                <Grid2 item xs={12} md={4}>
                    <FormControl fullWidth>
                        <TextField
                            id="duration"
                            name="duration"
                            label="Duration"
                            value={formData.duration}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            step="0.5"
                            inputProps={{ min: 0, max: 9.9 }}
                            required
                        />
                    </FormControl>
                </Grid2>
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
                                <MenuItem key={subject.id} value={subject.id}>
                                    {subject.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="lecturerLabel">Lecturer</InputLabel>
                        <Select
                            labelId="lecturerLabel"
                            id="lecturerId"
                            name="lecturerId"
                            value={formData.lecturerId}
                            label="Subject"
                            onChange={handleChange}
                        >
                            <MenuItem key={0} value={0} disabled={true}>
                                Select Lecturer
                            </MenuItem>
                            {lecturers.map(lecturer => (
                                <MenuItem key={lecturer.id} value={lecturer.id}>
                                    {lecturer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="location"
                            name="location"
                            label="Lecture Location"
                            value={formData.location}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid2>
                <Grid2 sm={12} md='auto'>
                    <Button type="submit" variant="contained" color="primary" sx={{ width: { sm: '100%', md: 'auto' } }}>
                        Submit
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    )
}

export default LectureForm