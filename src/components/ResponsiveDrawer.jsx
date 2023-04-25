import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { colorsProject } from '../css/colorsProject';
import { KeyboardArrowDown, KeyboardArrowRight, ExpandLess, StarBorder } from '@mui/icons-material';
import { Avatar, Collapse, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar >
                <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
                    Nombre Usuario
                </Typography>
            </Toolbar>
            <Divider sx={{ background: 'white' }} />
            <List>
                {/* <ListItemButton onClick={handleClick} sx={{
                    '&:hover': {
                        backgroundColor: colorsProject['naranja-uniserse'],
                        borderRadius: '5px'
                    },
                }}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                </ListItemButton> */}
                {/* <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{
                            pl: 4,
                            '&:hover': {
                                backgroundColor: colorsProject['naranja-uniserse'],
                                borderRadius: '5px'
                            },
                        }} >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse> */}
                {[
                    {
                        path: '/Home',
                        name: 'Home',
                        subMenus: [],
                    },
                    {
                        path: '/Productos',
                        name: 'Productos',
                        subMenus: []
                    },
                    {
                        path: '/Planes',
                        name: 'Planes',
                        subMenus: []
                    },
                    {
                        path: '',
                        name: 'Gestión de Permisos',
                        subMenus: [
                            {
                                path: '/Roles',
                                name: 'Gestión de Roles'
                            },
                            {
                                path: '/Usuarios',
                                name: 'Gestión de Usuarios'
                            }
                        ]
                    }
                ].map((menu, index) => (
                    menu.subMenus.length === 0 ?
                        <Link to={menu.path} style={{ textDecoration: 'none', color: 'white' }} key={index}>
                            <ListItem disablePadding onClick={handleDrawerToggle}>
                                <ListItemButton sx={{
                                    '&:hover': {
                                        backgroundColor: colorsProject['naranja-uniserse'],
                                        borderRadius: '5px'
                                    },
                                }}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.name} />
                                </ListItemButton>
                            </ListItem>
                        </Link> :
                        <div key={index}>
                            <ListItem disablePadding key={index}>
                                <ListItemButton sx={{
                                    '&:hover': {
                                        backgroundColor: colorsProject['naranja-uniserse'],
                                        borderRadius: '5px'
                                    }
                                }}
                                    onClick={handleClick}
                                >
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.name} />
                                    {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                                </ListItemButton>
                            </ListItem>
                            {menu.subMenus.map((subMenu, key) => (
                                <Collapse in={open} timeout="auto" unmountOnExit key={key} >
                                    <Link to={subMenu.path} style={{ textDecoration: 'none', color: 'white' }}>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{
                                                pl: 4,
                                                '&:hover': {
                                                    backgroundColor: colorsProject['naranja-uniserse'],
                                                    borderRadius: '5px'
                                                },
                                            }}
                                            onClick={handleDrawerToggle} >
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText primary={subMenu.name} />
                                            </ListItemButton>
                                        </List>
                                    </Link>
                                </Collapse>
                            ))}

                        </div>
                ))}
            </List>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    boxShadow: 'none',
                    backgroundColor: 'white'

                }}

            >
                <Toolbar>
                    <IconButton
                        color='primary'
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" color={'black'} >
                        Foto Usuario
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
                <Divider sx={{ background: 'white' }} />

            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    PaperProps={{
                        sx: {
                            backgroundColor: colorsProject['azul- uniserse'],
                            color: "white",
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    PaperProps={{
                        sx: {
                            backgroundColor: colorsProject['azul- uniserse'],
                            color: "white",
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;