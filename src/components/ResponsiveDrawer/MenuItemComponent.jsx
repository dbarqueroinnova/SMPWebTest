import { ListItem } from '@mui/material'
import React, { forwardRef } from 'react'
import { colorsProject } from '../../css/colorsProject'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MenuItemComponent = props => {
    const { onClick, link, children, handleDrawerToggle } = props

    // If link is not set return the orinary ListItem
    if (!link || typeof link !== 'string') {
        return (
            <ListItem
                // children={children}
                onClick={onClick}
                sx={{
                    '&:hover': {
                        backgroundColor: colorsProject['naranja-uniserse'],
                        borderRadius: '5px'
                    },
                    cursor: 'pointer'
                }}
            >
                {children}
            </ListItem>
        )
    }

    // Return a LitItem with a link component
    return (
        <ListItem
            // children={children}
            component={forwardRef((props, ref) => <NavLink exact {...props} href={link} />)}
            sx={{
                '&:hover': {
                    backgroundColor: colorsProject['naranja-uniserse'],
                    borderRadius: '5px'
                },
                '&.active': {
                    background: colorsProject['gris-azulado'],
                },

            }}
            style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
            onClick={handleDrawerToggle}

        >
            {children}
        </ListItem>
    )
}

export default MenuItemComponent


function NavLink({ href, exact, children, ...props }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return (
        <Link href={href} legacyBehavior>
            <a {...props}>
                {children}
            </a>
        </Link>
    );
}
