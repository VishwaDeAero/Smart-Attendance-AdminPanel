import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import SideDrawer from './SideDrawer';
import { styled } from '@mui/material';
import HeaderBar from './HeaderBar';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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

export default function MainLayout({children}) {

    const [open, setOpen] = React.useState(true);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HeaderBar drawerWidth={drawerWidth} open={open} setOpen={setOpen}/>
            <SideDrawer drawerWidth={drawerWidth} open={open} handleDrawerClose={handleDrawerClose} />
            <Main open={open}>
                <Toolbar /> {/* Do not delete, this keeps the gap from top */}
                {children}
            </Main>
        </Box>
    );
}
