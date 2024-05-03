import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { getAllSubjects } from '../services/subjectService'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getAllLecturers } from '../services/userService';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const LectureForm = ({ initialValues, onSubmit }) => {
    const Joi = require('joi');
    const auth = useAuthHeader()
    const [errors, setErrors] = useState({})
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

        // Check if the error exists for the field being changed
        if (errors[name]) {
            // Remove the error for the field being changed
            setErrors((prevErrors) => {
                const { [name]: _, ...rest } = prevErrors; // Omit the error for the field being changed
                return rest; // Return the remaining errors
            });
        }
    }

    const validateForm = (formData) => {
        const schema = Joi.object({
            id: Joi.number().allow(null),
            subjectId: Joi.number().required(),
            lecturerId: Joi.number().required(),
            duration: Joi.number().required(),
            location: Joi.string().required(),
            scheduledAt: Joi.date().required(),
        });
        const { error } = schema.validate(formData, { abortEarly: false });
        const errorsList = {};

        if (error) {
            error.details.forEach((err) => {
                errorsList[err.context.key] = err.message;
            });
        }

        // Set the errors state
        setErrors(errorsList);

        // Return true if there are no errors, otherwise return false
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        // Validate Fields
        if (validateForm(formData)) {
            // Call the onSubmit function with the form data
            formData.id ? onSubmit(formData.id, formData, auth) : onSubmit(formData, auth)
            // Clear the formData state
            setFormData({
                subjectId: '',
                lecturerId: '',
                duration: '',
                location: '',
                scheduledAt: moment(),
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid2 sm={12} md={8} container spacing={2}>
                <Grid2 xs={12} md={8}>
                    <FormControl fullWidth>
                        <DateTimePicker
                            id="scheduledAt"
                            name="scheduledAt"
                            label="Date & Time"
                            value={moment(formData.scheduledAt)}
                            error={!!errors.scheduledAt}
                            helperText={errors.scheduledAt}
                            disablePast={true} // Disable past datetimes
                            ampm={false}
                            onChange={(event) => { setFormData({ ...formData, "scheduledAt": event }) }}
                            fullWidth
                            required
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={4}>
                    <FormControl fullWidth>
                        <TextField
                            id="duration"
                            name="duration"
                            label="Duration"
                            value={formData.duration}
                            onChange={handleChange}
                            variant="outlined"
                            error={!!errors.duration}
                            helperText={errors.duration}
                            type="number"
                            inputProps={{ step: 0.5, min: 0, max: 9.9 }}
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
                            error={!!errors.subjectId}
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
                        {errors.roleId && <FormHelperText>{errors.subjectId}</FormHelperText>}
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
                            error={!!errors.lecturerId}
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
                        {errors.roleId && <FormHelperText>{errors.lecturerId}</FormHelperText>}
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
                            error={!!errors.location}
                            helperText={errors.location}
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