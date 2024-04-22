import * as React from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { loginUser } from '../services/authService'
import { closeAlert, showAlert, showLoading } from '../utils/swal'
import { useNavigate } from 'react-router-dom'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Smart Attendance
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const defaultTheme = createTheme()

export default function SignIn() {
    const signIn = useSignIn()
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        showLoading()
        const data = new FormData(event.currentTarget)
        const login_info = {
            username: data.get('username'),
            password: data.get('password'),
        }
        await loginUser(login_info).then((res) => {
            if (res.status === "OK") {
                if (signIn({
                    auth: {
                        token: res.token,
                        type: 'Bearer',
                    },
                    userState: res.user
                })) {
                    navigate('/') // redirect to home route
                    closeAlert()
                } else {
                    //Throw error
                }
            }
            else{
                showAlert("Something Went Wrong", res, 'error')
            }
        }).catch((error) => showAlert("Something Went Wrong", error, 'error'))
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth={false}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.2) 30%, rgba(103, 58, 183, 0.2) 90%)',
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        width: '500px',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        padding: 5,
                        borderRadius: '15px',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src="/assets/logos/header-logo.svg" // replace with the actual path to your logo image
                        alt="Logo"
                        style={{ width: '10rem', height: 'auto', marginBottom: 8 }} // adjust the size as needed
                    />
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5" color="primary" style={{ fontWeight: 'bold' }}>
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Copyright />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}