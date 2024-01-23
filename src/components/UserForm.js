import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'

const UserForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        role: '',
        password: '',
        confirm_password: '',
    })

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

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
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid2 sm={12} md={6} container spacing={2}>
                <Grid2 xs={12}>
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
                            id="username"
                            name="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="email"
                            name="email"
                            label="E-mail Address"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="role-label">User Role</InputLabel>
                        <Select
                            id="role"
                            name="role"
                            label="User Role"
                            labelId="role-label"
                            value={formData.role}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="moderator">Moderator</MenuItem>
                            <MenuItem value="lecturer">Lecturer</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 xs={12}>
                    <Divider sx={{ my: 1 }} />
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            required
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="confirm_password"
                            name="confirm_password"
                            label="Re-Enter Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.confirm_password}
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            required
                        />
                    </FormControl>
                </Grid2>
                <Grid2 sm={12} md='auto'>
                    <Button type="submit" variant="contained" color="primary" sx={{ width: {sm:'100%', md:'auto'}}}>
                        Submit
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    )
}

export default UserForm