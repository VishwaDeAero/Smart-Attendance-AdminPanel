import { Analytics, ChevronLeft, ChevronRight, Inbox, Logout, Mail, People, Public, School } from '@mui/icons-material';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material'
import React, { useState } from 'react'
import AppLogo from './AppLogo';

const SideDrawer = ({ drawerWidth, open, handleDrawerClose }) => {

  const theme = useTheme();
  const [selectedPage, setSelectedPage] = useState('Inbox');

  // Styles for the side drawer header component.
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  }));

  // Side Drawer Content
  const mainItems = [
    { text: 'Dashboard', icon: <Analytics/> },
    { text: 'Students', icon: <People/> },
    { text: 'Lectures', icon: <School/> },
    { text: 'Subjects', icon: <Public/> },
  ];

  const userItemms = [
    { text: 'Logout', icon: <Logout/> },
  ];


  // Handle Side Bar Item Click
  const handleListItemClick = (text) => {
    setSelectedPage(text);
    // You can add any additional logic here when a page is selected
  };

  // Side Bar Components Generator
  const renderListItems = (items) => (
    <List>
      {items.map(({ text, icon }, index) => (
        <ListItem
          key={text}
          disablePadding
          onClick={() => handleListItemClick(text)}
        >
          <ListItemButton
            selected={selectedPage === text}
          >
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

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