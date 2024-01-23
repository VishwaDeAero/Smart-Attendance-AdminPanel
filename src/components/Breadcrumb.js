import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Container, Link } from '@mui/material'

const Breadcrumb = () => {

    const location = useLocation()

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <Container disableGutters={true} sx={{
            paddingBottom: '15px',
        }}>
            <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link underline='hover' color="primary" href="/">
                    Home
                </Link>
                {location.pathname.split('/').filter(Boolean).map((segment, index, array) => {
                    const url = `/${array.join('/')}`
                    return <Link
                        underline='hover'
                        key={url}
                        color="inherit"
                        href={url}
                    >
                        {capitalizeFirstLetter(segment)}
                    </Link>
                })}
            </Breadcrumbs>
        </Container>
    )
}

export default Breadcrumb