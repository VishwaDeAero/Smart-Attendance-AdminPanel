import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ListItemRender = ({ items }) => {

    const location = useLocation()

    return (
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
}

export default ListItemRender