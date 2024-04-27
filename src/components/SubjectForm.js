import { Button, FormControl, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const SubjectForm = ({ initialValues, onSubmit }) => {
    const Joi = require('joi');
    const auth = useAuthHeader()
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        code: '',
        description: '',
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
            name: Joi.string().required(),
            code: Joi.string().required(),
            description: Joi.string().required(),
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
        if (validateForm(formData)) {
            // Call the onSubmit function with the form data
            formData.id ? onSubmit(formData.id, formData) : onSubmit(formData, auth)
            // Clear the formData state
            setFormData({
                id: null,
                name: '',
                code: '',
                description: '',
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid2 sm={12} md={6} container spacing={2}>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="code"
                            name="code"
                            label="Subject Code"
                            value={formData.code}
                            onChange={handleChange}
                            variant="outlined"
                            error={!!errors.code}
                            helperText={errors.code}
                            required
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            value={formData.description}
                            onChange={handleChange}
                            variant="outlined"
                            multiline={true}
                            minRows={2}
                            error={!!errors.description}
                            helperText={errors.description}
                            required
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

export default SubjectForm