import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "./CompletarRegistroComponente.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Formik } from "formik";


//traer ComponenteCard de la carpeta Card


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
            initialValues={{
              sUserId: JSON.parse(localStorage.getItem("id")),
              sTipoPersona: "",
              sCedula: "",
              sRazonSocial: "",
              sSitioWeb: "",
              sTelefonoAsociado: "",
              sCategoriaRubro: "",
              sRubro: "",
              sEstado: "",
              sCiudad: "",
              sMunicipio: "",
              sDireccion: "",
              sActividadEcon: "",
              sNombreReprLegal: "",
              sCedulaReprLegal: "",
              sTelefonoReprLegal: "",
              sEmailReprLegal: "",
              sNombreContacto: "",
              sTelefonoContacto: "",
              sEmailContacto: "",
              sNombrePublico: "",
              sEmailPublico: usuario.sEmail,
              sUrlLogo: "",
              sTipoCuenta: "",
              sBanco: "",
              sCedulaRif: "",
              sNroCuentaBanco: "",
              sConfirmarCuentaBan: "",
              sMedioPago: "",
            }}
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
        </Container>
      </Box>
    </div>
  );
};

export default RealizarTransaccion;
