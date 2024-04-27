import { AccountCircle, Analytics, BarChart, ChevronLeft, ChevronRight, HowToReg, Logout, People, Public, QueryStats, School, ShowChart } from '@mui/icons-material'
import { Divider, Drawer, IconButton, List, ListItem, Typography, styled, useTheme } from '@mui/material'
import React from 'react'
import AppLogo from './AppLogo'
import ListItemRender from './ListItemRender'

const SideDrawer = ({ drawerWidth, open, handleDrawerClose }) => {

  const theme = useTheme()

  // Styles for the side drawer header component.
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  }))

  // Side Drawer Content
  const mainItems = [
    { text: 'Dashboard', route: '/', icon: <Analytics /> },
    { text: 'Students', route: '/students', icon: <People /> },
    { text: 'Attendance', route: '/attendance', icon: <HowToReg /> },
    { text: 'Lectures', route: '/lectures', icon: <School /> },
    { text: 'Subjects', route: '/subjects', icon: <Public /> },
    { text: 'Users', route: '/users', icon: <AccountCircle /> },
  ]

  const reportItems = [
    { text: 'Lectures', route: '/reports/lecture', icon: <QueryStats /> },
    { text: 'Subjects', route: '/reports/subject', icon: <ShowChart /> },
    { text: 'Students', route: '/reports/student', icon: <BarChart /> },
  ]

  const userItems = [
    { text: 'Logout', icon: <Logout /> },
  ]

  return (
    <Drawer
      sx={{
        width: { drawerWidth },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: `${drawerWidth}px`,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <AppLogo />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <ListItemRender items={mainItems} />
      <Divider />
      <ListItem>
        <Typography variant='h6'>Reports</Typography>
      </ListItem>
      <ListItemRender items={reportItems} />
      <Divider />
      <ListItemRender items={userItems} />
    </Drawer>
  )
}

export default SideDrawer