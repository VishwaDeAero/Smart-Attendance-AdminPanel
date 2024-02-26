import { AccountCircle, Analytics, ChevronLeft, ChevronRight, Logout, People, Public, School } from '@mui/icons-material'
import { Divider, Drawer, IconButton, styled, useTheme } from '@mui/material'
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
    { text: 'Users', route: '/users', icon: <AccountCircle /> },
    { text: 'Lectures', route: '/lectures', icon: <School /> },
    { text: 'Subjects', route: '/subjects', icon: <Public /> },
  ]

  const userItemms = [
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
      <ListItemRender items={userItemms} />
    </Drawer>
  )
}

export default SideDrawer