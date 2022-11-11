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


export const MenuDashboard = () => {

function logout(){

  localStorage.clear();
  window.location.href = "/";
}


  return (
    <div>


<div>
      
      <Toolbar/>

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
          <Button
            size="small"
            endIcon={<LogoutIcon />}
            variant="outlined"
            onclick={logout}
              >
            Cerrar Sesion
          </Button>
      </List>
    </div>


    </div>
  )
}
