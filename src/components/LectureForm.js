import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const LectureForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: null,
        subjectId: '',
        lecturer: '',
        duration: '',
        location: '',
        scheduledAt: '',
    })

    useEffect(() => {
        // Set initial values when provided through props
        if (initialValues) {
            setFormData(initialValues)
        }
    }, [initialValues])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Call the onSubmit function with the form data
        formData.id ? onSubmit(formData.id, formData) : onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid2 sm={12} md={8} container spacing={2}>
                <Grid2 item xs={12} md={4}>
                    <FormControl fullWidth>
                        <TextField
                            id="date"
                            name="date"
                            label="Date"
                            type="date"
                            value={moment(formData.scheduledAt).format('YYYY-MM-DD')}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                        />
                    </FormControl>
                </Grid2>
                <Grid2 item xs={12} md={4}>
                    <FormControl fullWidth>
                        <TextField
                            id="time"
                            name="time"
                            label="Time"
                            type="time"
                            value={moment(formData.scheduledAt).format('HH:mm')}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                        />
                    </FormControl>
                </Grid2>
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
                            id="subject"
                            value={formData.subjectId}
                            label="Subject"
                            onChange={handleChange}
                        >
                            <MenuItem value="1">AI</MenuItem>
                            <MenuItem value="2">DSA</MenuItem>
                            <MenuItem value="3">Project Management</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="lecturer"
                            name="lecturer"
                            label="Lecturer"
                            value={formData.lecturer}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
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