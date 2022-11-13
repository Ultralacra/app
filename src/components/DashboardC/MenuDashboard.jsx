import React from 'react'
import "./MenuDashboard.css";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import LoandingButton from '@mui/lab/LoadingButton';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import  Button from '@mui/material/Button';
import "./MenuDashboard.css";
import { clear } from '@testing-library/user-event/dist/clear';
import { Typography } from '@mui/material';


export const MenuDashboard = () => {

function Logout(){
 localStorage.clear();
  window.location.href = "/login";

}


  return (
    <div>


<div>

      <Toolbar
      sx={{
        backgroundImage: "url(http://valinkgroup.com/wp-content/uploads/2022/11/Negro.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "70%",

      }}

/>
      <List className='list-menu-dashboard'>
        <ListItemButton className="text-list-dashboard" disabled component={Link} to="/dashboard-users">
          <ListItemIcon className='icon-list-dashboard' >
            <AppRegistrationIcon />
          </ListItemIcon>
          Dashboard
        </ListItemButton>
      </List>
      <List className='list-menu-dashboard'>
        <ListItemButton className="text-list-dashboard" component={Link} to="/completar-registro">
          <ListItemIcon className='icon-list-dashboard' >
            <AppRegistrationIcon />
          </ListItemIcon>
          Completar Registro
        </ListItemButton>
      </List>
      <div className="espaciador-azul-dashboard"></div>
      <List className='list-menu-dashboard' >
        <ListItemButton className="text-list-dashboard" disabled component={Link} to="/transaccion-test">
          <ListItemIcon className='icon-list-dashboard' >
            <CreditCardIcon />
          </ListItemIcon>
          transaccion con tarjeta de credito
        </ListItemButton>
      </List>
      <div className="espaciador-azul-dashboard"></div>
      <List>
          <LoandingButton
            size="small"
            endIcon={<LogoutIcon />}
            variant="outlined"
            onClick={Logout}
            
              >
            Cerrar Sesion
          </LoandingButton>
      </List>
    </div>


    </div>
  )
}
