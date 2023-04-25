import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { colorsProject } from "../../css/colorsProject";
import { Logout } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import Menu from "./Menu";
import Logo from '../../assets/img/Logo.png'
import Image from "next/image";
import { InitalBox } from "./InitialBox";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { user } = useUser();
  const router = useRouter()

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "white",
          }}
        >
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Image src={Logo} alt="Logo Uniserse" width={155} onClick={() => router.push('/')} style={{cursor: 'pointer'}} />

            <Box sx={{ flexGrow: 1 }} />
            <Tooltip
              title={
                <details>
                  <summary>Detalles del usuario</summary>
                  <br></br>
                  <p>
                    {user.name}
                    <br></br>
                    {user.email}
                  </p>
                </details>
              }
              placement="left"
            >
              <IconButton sx={{ p: 0, mr: 2 }}>
                <Avatar alt={user.name} src={user.picture} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cerrar sesión">
              <IconButton
                onClick={() => { sessionStorage.clear(); router.push('/api/auth/logout') }}
                sx={{ color: colorsProject["azul- uniserse"] }}
              >
                <Logout />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Divider sx={{ background: "white" }} />
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
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            PaperProps={{
              sx: {
                backgroundColor: colorsProject["azul- uniserse"],
                color: "white",
              },
            }}
          >
            <Menu handleDrawerToggle={handleDrawerToggle} routes={props.routes} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            PaperProps={{
              sx: {
                backgroundColor: colorsProject["azul- uniserse"],
                color: "white",
              },
            }}
            open
          >
            <Menu routes={props.routes} />
          </Drawer>
        </Box>
      </Box>
      <InitalBox>
        {props.children}
      </InitalBox>
    </>
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
