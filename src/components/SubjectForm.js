import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'

const SubjectForm = ({ initialValues, onSubmit }) => {
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
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Call the onSubmit function with the form data
        formData.id ? onSubmit(formData.id, formData) : onSubmit(formData)
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