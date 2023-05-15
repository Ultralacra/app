import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./CompletarRegistroComponente.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import { Input, Space, Button } from "antd";
import { Formik } from "formik";
import Stack from "@mui/material/Stack";
import { CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { AlertCompleteForm } from "../usercompletecomponentes/AlertCompleteForm";

const RealizarTransaccion = () => {
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

  const handleCopyClick = () => {
    navigator.clipboard.writeText(cuenta[0].sIdComercio);
  };

  const handleCopyClick2 = () => {
    navigator.clipboard.writeText(cuenta[0].sApiKey);
  };

  //llamar info de la cuenta
  const [cuenta, setCuenta] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const id = JSON.parse(localStorage.getItem("id"));
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/clientes/consultarregistro?${id}`,
        {
          params: {
            sUserId: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      setCuenta(response.data);
    }
    fetchData();
  }, []);

  //guardar codigo de comercio en una variable

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
    <>
      <Container>
        {cuenta.map((cuenta) => (
          <div>
            <Box
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Typography
                variant="h4"
                textAlign="left"
                color="#262626"
                fontWeight="bold"
                fontFamily=""
                fontSize="20px"
                mb={2}
              >
                Credenciales
              </Typography>
              <Formik
                initialValues={{}}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <AlertCompleteForm />
                    <div className="espaciador-amarillo-largo"></div>
                  </form>
                )}
              </Formik>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={6} md={8}>
                    <Stack spacing={2}>
                      <Item
                        elevation={4}
                        //deshabilitar la caja si el perfil es 0
                      >
                        <Alert
                          severity="info"
                          sx={{ mb: 2, textAlign: "left" }}
                        >
                          El Codigo de comercio corresponde al identificador
                          único de seguridad para ser usado en la integración de
                          tu comercio con valinkPay.
                        </Alert>
                        <Input.Group compact>
                          <Input
                            value={cuenta.sIdComercio}
                            fullWidth
                            disabled
                            style={{
                              width: "80%",
                              marginBottom: "10px",
                            }}

                            //value en la posicion 0 del array cuenta
                          />
                          <Tooltip title="Copiar">
                            <Button
                              icon={<CopyOutlined />}
                              onClick={handleCopyClick}
                              defaultValue
                            />
                          </Tooltip>
                        </Input.Group>
                        <Alert
                          severity="info"
                          sx={{ mb: 2, textAlign: "left" }}
                        >
                          El Secret Key corresponde a una clave de seguridad
                          para asegurar que la información que se está
                          trasmitiendo viene de una fuente confiable.
                        </Alert>
                        <Input.Group compact>
                          <Input
                            disabled
                            value={cuenta.sSecretApi}
                            fullWidth
                            style={{
                              width: "80%",
                              marginBottom: "10px",
                            }}
                          />
                          <Tooltip title="Copiar">
                            <Button
                              icon={<CopyOutlined />}
                              onClick={handleCopyClick2}
                            />
                          </Tooltip>
                        </Input.Group>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={{ xs: 1, sm: 1, md: 1 }}
                        >
                          <Item elevation={0}></Item>
                          <Item elevation={0}></Item>
                          <Item elevation={0}></Item>
                        </Stack>
                      </Item>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Item elevation={4}>
                      <Alert severity="info" sx={{ mb: 2, textAlign: "left" }}>
                        Para solicitar sus credenciales de producción, por favor
                        pongase en contacto con el equipo de soporte de
                        ValinkPay.
                      </Alert>
                    </Item>
                  </Grid>
                </Grid>
                <br></br>
              </Box>
            </Box>
          </div>
        ))}
      </Container>
    </>
  );
};

export default RealizarTransaccion;
