import * as React from "react";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { colorsProject } from "../../css/colorsProject";
import {
  KeyboardArrowDown,
  KeyboardArrowRight,
  StarBorder,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";
// import { routes } from '../../util/routes';
import { useAuth0 } from "@auth0/auth0-react";

function LinkDrawer({ handleDrawerToggle, routes }) {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth0();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: "white" }}>
          {user.name}
        </Typography>
      </Toolbar>
      <Divider sx={{ background: "white" }} />
      <List>
        {routes.map((menu, index) =>
          menu.subMenus.length === 0 ? (
            <Link
              to={menu.path}
              style={{ textDecoration: "none", color: "white" }}
              key={index}
            >
              <ListItem disablePadding onClick={handleDrawerToggle}>
                <ListItemButton
                  sx={{
                    "&:hover": {
                      backgroundColor: colorsProject["naranja-uniserse"],
                      borderRadius: "5px",
                    },
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : (
            <div key={index}>
              <ListItem disablePadding key={index}>
                <ListItemButton
                  sx={{
                    "&:hover": {
                      backgroundColor: colorsProject["naranja-uniserse"],
                      borderRadius: "5px",
                    },
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
                <Collapse in={open} timeout="auto" unmountOnExit key={key}>
                  <Link
                    to={subMenu.path}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          "&:hover": {
                            backgroundColor: colorsProject["naranja-uniserse"],
                            borderRadius: "5px",
                          },
                        }}
                        onClick={handleDrawerToggle}
                      >
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
          )
        )}
      </List>
    </>
  );
}

export default LinkDrawer;
