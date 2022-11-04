import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./TabsHome.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Para mi negocio" {...a11yProps(0)} />
          <Tab label="Para mis clientes" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ul className="tabs-info"  >
          <li> <CheckCircleOutlineIcon className="icono-check-1" />
            Mayor seguridad: ValinkPay cuenta con autenticación bancaria para
            tarjetas de emisores habilitados, que otorga alta seguridad a las
            transacciones.
          </li>
          <li> <CheckCircleOutlineIcon className="icono-check-1" />
            Pago garantizado de transacciones autenticadas: el abono se
            realizará en 24 horas hábiles para ventas con débito/prepago y 48
            horas hábiles para ventas con crédito.
          </li>
          <li> <CheckCircleOutlineIcon className="icono-check-1" />
            Acceso a más clientes: permite vender a clientes nacionales y
            extranjeros.
          </li>
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ul className="tabs-info" >
          <li> <CheckCircleOutlineIcon className="icono-check-1" />
            Contarán con nuevas facilidades de pago (no efectivo y
            transferencias): ahora podrán pagarte con tarjetas de débito,
            crédito y tarjetas prepago.
          </li>
          <li> <CheckCircleOutlineIcon className="icono-check-1" />
            Transacciones seguras: sus transacciones cumplirán con los más altos
            estándares de seguridad de ValinkPay y la industria mediante la
            autenticación bancaria para tarjetas de emisores habilitados.
          </li>
          <li> <CheckCircleOutlineIcon className="icono-check-1" />
            Comodidad y disponibilidad: podrán comprar las 24 horas del día,
            todo el año, desde cualquier dispositivo conectado a Internet.
          </li>
        </ul>
      </TabPanel>
    </Box>
  );
}
