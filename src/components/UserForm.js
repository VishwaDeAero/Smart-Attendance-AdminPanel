import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import { getAllRoles } from '../services/rolesService'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const UserForm = ({ initialValues, onSubmit }) => {
    const auth = useAuthHeader()
    const [roles, setRoles] = useState([])
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        username: '',
        email: '',
        roleId: '',
        password: null,
        confirm_password: null,
    })

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    useEffect(() => {
        // Set initial values when provided through props
        if (initialValues) {
            console.log(initialValues)
            setFormData(initialValues)
        }
    }, [initialValues])

    useEffect(() => {
        // Fetch roles from API
        getAllRoles()
            .then(roles => {
                setRoles(roles.data);
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Call the onSubmit function with the form data
        formData.id ? onSubmit(formData.id, formData, auth) : onSubmit(formData, auth)
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
                <Grid2 xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-label">User Role</InputLabel>
                        <Select
                            id="roleId"
                            name="roleId"
                            label="User Role"
                            labelId="role-label"
                            value={formData.roleId}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        >
                            <MenuItem key={0} value={0} disabled={true}>
                                Select Role
                            </MenuItem>
                            {roles.map(role => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                {initialValues == null && (
                    <>
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
                                    // value={formData.password}
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
                                    // value={formData.confirm_password}
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
                    </>
                )}
                <Grid2 sm={12} md={12}>
                    <Button type="submit" variant="contained" color="primary" sx={{ width: { sm: '100%', md: 'auto' } }}>
                        Submit
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    )
}

export default UserForm