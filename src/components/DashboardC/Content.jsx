import React, { useState, useEffect } from "react";
import "./Content.css";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { MenuDashboard } from "./MenuDashboard";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutIcon from '@mui/icons-material/ExitToApp';

import { LoadingButton } from "@mui/lab";
const drawerWidth = 240;
function Content(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [usuario, setUsuario] = useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const drawer = (
    <div>
      <MenuDashboard />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{}}>
      <CssBaseline />

      <AppBar
        className="appbar"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            className="menu-icon-button"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="nombre-usuario-appbar"
            variant="h6"
            variantMapping={{ h6: "h1" }}
            sx={{ ml: 2, display: { 
              xs: "none",
              sm: "block", 
              md: "block",  
              lg: "block",
              xl: "block",
              
              color : "black"
             } }}
          >
            Bienvenido:{}
            {(
              JSON.parse(localStorage.getItem("nombre")) +
              " " +
              JSON.parse(localStorage.getItem("apellido"))
            ).toUpperCase()}
           <Tooltip title="Cerrar Sesión">
                <LoadingButton
                  endIcon={<LogoutIcon />}
                  sx
                  onClick={""}
                  variant="contained"
                  color="error"

                  
                >
                    Cerrar Sesion

                </LoadingButton>


          </Tooltip>

          </Typography>
          <Tooltip title="Cerrar Sesión">
            <ExitToAppIcon

              className="menu-icon-button"

              onClick={handleDrawerToggle}

              sx={{ ml: 1, display: { sm: "none" } }}
            >
            </ExitToAppIcon>
          </Tooltip>
              
              
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
        >
          {drawer}
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
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      ></Box>
    </Box>
  );
}

Content.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Content;
