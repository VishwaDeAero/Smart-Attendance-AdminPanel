import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import { getAllRoles } from '../services/rolesService'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const UserForm = ({ initialValues, onSubmit }) => {
    const Joi = require('joi');
    const auth = useAuthHeader()
    const [roles, setRoles] = useState([])
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        username: '',
        email: '',
        roleId: '',
        password: null,
        confirmPassword: null,
    })

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
            username: Joi.string().required(),
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            roleId: Joi.number().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
                'any.only': 'Passwords do not match', // Custom error message for password mismatch
            }),
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
                name: '',
                username: '',
                email: '',
                roleId: '',
                password: null,
                confirmPassword: null,
            });
        }
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
                            error={!!errors.name}
                            helperText={errors.name}
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
                            error={!!errors.username}
                            helperText={errors.username}
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
                            error={!!errors.email}
                            helperText={errors.email}
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
                            error={!!errors.roleId}
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
                        {errors.roleId && <FormHelperText>{errors.roleId}</FormHelperText>}
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
                                    error={!!errors.password}
                                    helperText={errors.password}
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
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Re-Enter Password"
                                    type={showPassword ? 'text' : 'password'}
                                    // value={formData.confirm_password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
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