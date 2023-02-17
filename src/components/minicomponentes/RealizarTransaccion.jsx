import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "./CompletarRegistroComponente.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Formik } from "formik";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

//traer ComponenteCard de la carpeta Card

const RealizarTransaccion = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

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
    }
    fetchData();
  }, []);

  //Config del tema
  const drawerWidth = 240;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container>
          <Formik
            initialValues={{}}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Typography
                  variant="h4"
                  textAlign="left"
                  color="#262626"
                  fontWeight="bold"
                  fontFamily=""
                  mb={2}
                >
                  RELIZAR TRANSACCIONES DE PRUEBAS
                </Typography>
                <div className="espaciador-amarillo-largo"></div>
                <br></br>
              </form>
            )}
          </Formik>

          <Grid
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            spacing={0.5}
            rowSpacing={1}
          >
            <Grid item xs={6}>
              <Item>
                <Stack
                  padding={4}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  container
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Item sx={{ mt: (mb) => !mb && 2 }} elevation={0}>
                    <Typography
                      mb={2}
                      variant="h6"
                      textAlign="left"
                      color="#262626"
                      fontWeight="bold"
                    
                    >Estas pagando en:</Typography>

                    <img
                      src="https://i.pinimg.com/originals/c2/9a/1b/c29a1b05fb0c81b84ce3342b509289dc.jpg"
                      alt="logo"
                      width="150"
                      height=""
                    />
                  </Item>
                  <Item sx={{ mt: (mb) => !mb && 2 }} elevation={0}>
                    <Typography
                      variant="h6"
                      textAlign="left"
                      color="#262626"
                      fontWeight="bold"
                    >
                      Monto a pagar:
                    </Typography>
                    <Typography
                      variant="h6"
                      textAlign="roght"
                      color="#262626"
                      fontWeight="bold"
                    >
                      5.250 VES
                    </Typography>
                  </Item>
                  
                </Stack>
               
                <Typography
                  variant="h6"
                  textAlign="left"
                  color="#262626"
                  fontWeight="bold"
                >
                  Método de pago
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Tarjeta de débito" {...a11yProps(0)} />
                    <Tab label="Tarjeta de credito" {...a11yProps(1)} />
                    <Tab label="Pago móvil" {...a11yProps(2)} />
                  </Tabs>
                </Box>
              
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <TabPanel value={value} index={0}>
                  Tarjeta de débito
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>3</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>4</Item>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default RealizarTransaccion;
