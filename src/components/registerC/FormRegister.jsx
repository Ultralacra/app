import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import axios from "axios";

const theme = createTheme();

function Registro() {
  const [sRUT, setsRUT] = useState("");
  const [sFirstName, setsFirstname] = useState("");
  const [sEmail, setsEmail] = useState("");
  const [sLastName, setsLastname] = useState("");
  const [sPhone, setsPhone] = useState("");
  const [sLogin, setsLogin] = useState("");
  const [sPassword, setsPassword] = useState("");
  const [sComments, setsComments] = useState("");
  const [iProfileID] = useState("0");
  const [modal, setModal] = useState(false);

  async function registrar() {
    let items = {
      sFirstName,
      sEmail,
      sLastName,
      sPhone,
      sLogin,
      sPassword,

    };
    console.warn(items);
    axios
      .post("https://valink-pay-api.vercel.app/users", {

    sFirstName: sFirstName,
    sEmail : sEmail,
    sLastName: sLastName,
    sPhone: sPhone,
    sLogin: sLogin,
    sPassword:sPassword

      })
      .then((result) => {
        console.warn(result);
        if (result.data === "success") {
  
         alert ("Usuario Registrado Correctamente");
  
        } else {
          alert("Error al registrar usuario");
        }
      });

  }

  return (
    <ThemeProvider theme={theme}>
      {/* {modal && <ModalRegistroExitoso/>} */}
      <Box sx={{ display: "flex" }}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url()",
              backgroundRepeat: "no-repeat",
              backgroundSize: "75%",
            }}
          />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                class="logo-login"
                src="http://valinkgroup.com/wp-content/uploads/2022/05/Negro.png"
                width={200}
                alt="logo"
              ></img>

              <Typography component="h1" variant="h5" sx={{ mt: 4 }}>
                Completa los datos solicitados
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <Stack direction="row" spacing={2}>
                  <Item>
                    <TextField
                      onChange={(e) => setsFirstname(e.target.value)}
                      required
                      size="small"
                      fullWidth
                      className="input-izquierdo inputs-form-register "
                      name="sFirstName"
                      label="Nombre"
                      type="text"
                      margin="normal"
                      placeholder="Nombre"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            className="iconos-labels"
                            position="start"
                          >
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Item>
                  <Item>
                    <TextField
                      onChange={(e) => setsLastname(e.target.value)}
                      required
                      size="small"
                      fullWidth
                      className="inputs-form-register"
                      name="sLastName"
                      label="Apellido"
                      type="text"
                      margin="normal"
                      placeholder="Apellido"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            className="iconos-labels"
                            position="start"
                          >
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Item>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Item>
                    <TextField
                      onChange={(e) => setsPhone(e.target.value)}
                      required
                      size="small"
                      fullWidth
                      className="input-izquierdo  inputs-form-register"
                      name="sPhone"
                      label="Teléfono"
                      type="tel"
                      margin="normal"
                      placeholder="Teléfono"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            className="iconos-labels"
                            position="start"
                          >
                            <LocalPhoneOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Item>
                  <Item>
                  <TextField
                  onChange={(e) => setsEmail(e.target.value)}
                  required
                  size="small"
                  fullWidth
                  className="inputs-form-register"
                  type="email"
                  label="Correo electrónico"
                  name="sEmail"
                  margin="normal"
                  placeholder="Correo electrónico"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className="iconos-labels"
                        position="start"
                      >
                        <MarkEmailReadOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                  </Item>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Item>
                    <TextField
                  onChange={(e) => setsPassword(e.target.value)}
                  required
                  fullWidth
                  size="small"
                  className="input-izquierdo inputs-form-register"
                  name="sPassword"
                  label="Contraseña"
                  type="password"
                  margin="normal"
                  placeholder="Contraseña"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className="iconos-labels"
                        position="start"
                      >
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                    </Item>
                    <Item>
                    <TextField
                  onChange={(e) => setsRUT(e.target.value)}
                  required 
                  size="small"
                  fullWidth
                  className="inputs-form-register"
                  name="sLogin"
                  label="Usuario"
                  type="text"
                  margin="normal"
                  placeholder="Nombre de usuario"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className="iconos-labels"
                        position="start"
                      >
                        <CreditScoreOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                    </Item>
                </Stack>
                
                <Button
                  onClick={registrar}
                  className=""
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Crear cuenta
                </Button>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ mt: 4 }}
                >
                  Al hacer click en Crear cuenta, declaras haber leído y <br />{" "}
                  muestras tu conformidad con nuestros{" "}
                  <Link className="texto-1" href="#" variant="body2">
                    Término de Servicio
                  </Link>
                </Typography>
                <br />{" "}
                <KeyboardArrowLeftIcon className="icons-back icons-form" />
                <Link className="back-session" to="/" variant="body2">
                  Atrás para iniciar sesión
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Registro;
