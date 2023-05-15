import React, { useState, useEffect } from "react";
import "./MenuDashboard.css";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

export const MenuDashboard = () => {
  function Logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  //Datos del usuario
  const [usuario, setUsuario] = useState([]);
  //Llamar info usuario
  useEffect(() => {
    async function fetchData() {
      const id = JSON.parse(localStorage.getItem("id"));
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      setUsuario(response.data);
      console.log(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="menu-dashboard">
        <div className="toolbar-dashboard">
          <Toolbar className="toolbar-dashboard">
            <img
              className="logo-dashboard"
              src="http://valinkgroup.com/wp-content/uploads/2022/05/Original.png"
              width={100}
              justifyContent="center"
              alt="Logo-1"
              border="0"
            ></img>
          </Toolbar>
        </div>
        <div className="options-menu-dashboard">
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard  bloequear-menu"
              component={Link}
              to="/dashboard-users"
              disabled={usuario.iProfileId === 0}
            >
              <ListItemIcon className="icon-list-dashboard">
                <DashboardIcon />
              </ListItemIcon>
              <Divider />
              Dashboard
            </ListItemButton>
          </List>
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/completar-registro"
              disabled={usuario.iProfileId === 1}
            >
              <ListItemIcon className="icon-list-dashboard">
                <AppRegistrationIcon />
              </ListItemIcon>
              Completar Registro
            </ListItemButton>
          </List>
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/consultar-transacciones"
              disabled={usuario.iProfileId === 0}
            >
              <ListItemIcon className="icon-list-dashboard">
                <BarChartIcon />
              </ListItemIcon>
              Consultar Transacciones
            </ListItemButton>
          </List>
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/realizar-transaccion"
              disabled={usuario.iProfileId === 0}
            >
              <ListItemIcon className="icon-list-dashboard">
                <CreditCardIcon />
              </ListItemIcon>
              Realizar Transaccion
            </ListItemButton>
          </List>
          <List className="list-menu-dashboard">
            <ListItemButton
              className="text-list-dashboard"
              component={Link}
              to="/credenciales"
              disabled={usuario.iProfileId === 0}
            >
              <ListItemIcon className="icon-list-dashboard">
                <SettingsIcon />
              </ListItemIcon>
              Credenciales
            </ListItemButton>
          </List>
        </div>
        <div className="list-icons-dashboard logout-button">
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
