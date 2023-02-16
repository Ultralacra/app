import React from "react";
import "./MenuDashboard.css";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import "./MenuDashboard.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from '@mui/icons-material/Login';

export const MenuDashboard = () => {
  function Logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div>
      <div className="menu-dashboard"
        
      >
        <div
          className="toolbar-dashboard"
        >
        <Toolbar
          sx={{
            backgroundImage: "url(http://valinkgroup.com/wp-content/uploads/2023/02/Valinkgroup.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
        />
        </div>
        <div
        className="options-menu-dashboard"
          >
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/dashboard-users"
            >
              <ListItemIcon className="icon-list-dashboard">
                <DashboardIcon
                  sx={{
                    fontSize: "25",
                  }}
                />
              </ListItemIcon>
              <Divider
                sx={{
                  height: "2px",
                  backgroundColor: "#fff",
                  color: "#fff",
                }}

              />
              Dashboard
            </ListItemButton>
          </List>
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/completar-registro"
            >
              <ListItemIcon className="icon-list-dashboard">
                <AppRegistrationIcon
                  sx={{
                    fontSize: "25",
                  }}
                />
              </ListItemIcon>
              Completar Registro
            </ListItemButton>
          </List>
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/consultar-transacciones"
            >
              <ListItemIcon className="icon-list-dashboard">
                <BarChartIcon
                  sx={{
                    fontSize: "25",
                  }}
                />
              </ListItemIcon>
              Consultar Transacciones
            </ListItemButton>
          </List>
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/realizar-transaccion"
            >
              <ListItemIcon className="icon-list-dashboard">
                <CreditCardIcon
                  sx={{
                    fontSize: "25",
                  }}
                />
              </ListItemIcon>
              Realizar Transaccion
            </ListItemButton>
          </List>
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/integraciones"
            >
              <ListItemIcon className="icon-list-dashboard">
                <SettingsIcon
                  sx={{
                    fontSize: "25",
                  }}
                />
              </ListItemIcon>
              Integraciones
            </ListItemButton>
            <div
            className="divider-list-dashboard"
            ></div>
          </List>
          </div>
          <Divider
          sx={{
            border: "1px solid #fff",
          }}

          >

          </Divider>
          <div
          className="list-icons-dashboard logout-button"
          >
             <Divider
          sx={{
            border: "1px solid #fff",
          }}

          >

          </Divider>
            <List>
                <LoadingButton
                  endIcon={<LogoutIcon />}
                  sx
                  onClick={Logout}
                  variant="contained"
                  color="error"  
                >
                    Cerrar Sesion

                </LoadingButton>
            </List>

          </div>
        </div>
    </div>
  );
};
