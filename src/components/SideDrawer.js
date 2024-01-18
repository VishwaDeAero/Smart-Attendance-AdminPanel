import { Analytics, ChevronLeft, ChevronRight, Logout, People, Public, School } from '@mui/icons-material'
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material'
import React from 'react'
import AppLogo from './AppLogo'
import { Link, useLocation } from 'react-router-dom'

const SideDrawer = ({ drawerWidth, open, handleDrawerClose }) => {

  const theme = useTheme()
  const location = useLocation()

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
    { text: 'Dashboard', route:'/', icon: <Analytics/> },
    { text: 'Students', route:'/test', icon: <People/> },
    { text: 'Lectures', route:'/lectures', icon: <School/> },
    { text: 'Subjects', route:'/subjects', icon: <Public/> },
  ]

  const userItemms = [
    { text: 'Logout', icon: <Logout/> },
  ]

  // Side Bar Components Generator
  const renderListItems = (items) => (
    <List>
      {items.map(({ text, route, icon }, index) => (
        <ListItem
          key={text}
          disablePadding
        >
          <ListItemButton
            selected={location.pathname === route}
            component={Link}
            to={route}
          >
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )

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
      {renderListItems(mainItems)}
      <Divider />
      {renderListItems(userItemms)}
    </Drawer>
  )
}

export default SideDrawer