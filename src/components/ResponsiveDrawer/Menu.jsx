import { Divider, List, Toolbar, Typography } from "@mui/material"
import MenuItem from "./MenuItem"
import { selectIcon } from "../../util/iconRoutes";
import { useUser } from "@auth0/nextjs-auth0/client";

function ResponsiveMenu({ handleDrawerToggle, routes }) {
    const { user } = useUser();

    return (
        <>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ color: 'white' , fontWeight: 'bold' }}>
                    {user.name}
                </Typography>
            </Toolbar>
            <Divider sx={{ background: 'white' }} />
            <List component="nav" disablePadding>
                {routes.map((item, index) => (
                    <MenuItem {...item} key={index} handleDrawerToggle={handleDrawerToggle} IconMenu={selectIcon(item.icon)} />
                ))}
            </List>
        </>
    )

}

export default ResponsiveMenu