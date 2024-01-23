import * as React from 'react';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import SideDrawer from './SideDrawer'
import { Container, styled } from '@mui/material'
import HeaderBar from './HeaderBar'
import Breadcrumb from './Breadcrumb';
import { common, grey } from '@mui/material/colors';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        backgroundColor: grey[50],
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: `${drawerWidth}px`,
        }),
    }),
);

export default function MainLayout({ children }) {

    const [open, setOpen] = React.useState(true);

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{
            display: 'flex',
            height: '100vh'
        }}>
            <CssBaseline />
            <HeaderBar drawerWidth={drawerWidth} open={open} setOpen={setOpen} />
            <SideDrawer drawerWidth={drawerWidth} open={open} handleDrawerClose={handleDrawerClose} />
            <Main
                open={open}
            >
                <Toolbar /> {/* Do not delete, this keeps the gap from top */}
                <Breadcrumb />
                <Container
                    disableGutters={true}
                    sx={{
                        padding: "1rem",
                        borderRadius: '0.6rem',
                        backgroundColor: common.white,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                    }}
                >
                    {children}
                </Container>
            </Main>
        </Box>
    );
}
