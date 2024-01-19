import { Home } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh" // Optional: Set a height for vertical centering
            sx={{
                background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.2) 30%, rgba(103, 58, 183, 0.2) 90%)',
            }}
        >
            <div
                align= "center"
            >
                <Typography
                    variant='h1'
                    align='center'
                    sx={{
                        fontWeight: 'bold',
                        color: '#673AB7',
                    }}
                >404</Typography>
                <Typography
                    variant='h2'
                    align='center'
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: 2
                    }}
                >Page Not Found</Typography>
                <Button variant="outlined" href="/" color="primary" startIcon={< Home />}>
                    Go to Home Page
                </Button>
            </div>
        </Box>
    )
}

export default PageNotFound