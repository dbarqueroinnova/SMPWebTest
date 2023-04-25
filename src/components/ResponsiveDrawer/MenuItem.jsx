import { Collapse, Divider, List, ListItemIcon, ListItemText } from "@mui/material"
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import MenuItemComponent from "./MenuItemComponent";
import React from "react";
import { selectIcon } from "../../util/iconRoutes";

function MenuItem(props) {
    const { name, subMenus, path = [], IconMenu } = props

    const isExpandable = subMenus && subMenus.length > 0
    const [open, setOpen] = React.useState(false)

    function handleClick() {
        setOpen(!open)
    }

    const MenuItemRoot = (
        <MenuItemComponent link={path} onClick={handleClick} handleDrawerToggle={props.handleDrawerToggle} >
            <ListItemIcon >
                <IconMenu sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={name} />
            {/* Display the expand menu if the item has children */}
            {isExpandable && !open && <KeyboardArrowRight />}
            {isExpandable && open && <KeyboardArrowDown />}
        </MenuItemComponent>
    )

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding sx={{ pl: 1 }}  >
                {subMenus.map((item, index) => (
                    <MenuItem {...item} key={index} handleDrawerToggle={props.handleDrawerToggle} IconMenu={selectIcon(item.icon)} />
                ))}
            </List>
        </Collapse>
    ) : null

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    )
}

export default MenuItem