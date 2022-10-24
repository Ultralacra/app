import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import InputAdornment from "@mui/material/InputAdornment";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Grid";
import axios from "axios";
import ModalRecoveryPassword from "../modals/ModalRecoveryPassword";

const theme = createTheme();
const RecoveryAccount = () => {
  const [body, setBody] = useState({
    login: "",
    email: "",
    code: "",
    new_password: "",
  });
  /* const [loading, setLoading] = useState(false); */
  const [modal, setModal] = useState(false);

  const handleRecoveryPassword = (e) => {
    if (e.target.name === "login") {
    }
    if (e.target.name === "email") {
    }
    if (e.target.name === "code") {
    }
    if (e.target.name === "new_password") {
    }
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  async function enviarCorreo() {




    //campos vacios empty fields

    if (
      body.login === "" ||
      body.email === "" ||
      body.new_password === "" ||
      body.code === "" 
      
    ) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        text: "Todos los campos son obligatorios",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    /* setLoading(true); */

    if (
      body.login === "" ||
      body.email === "" ||
      body.new_password === "" ||
      body.code === ""
    )
      console.warn(body);
    axios
      .get("https://valink-pay-api.vercel.app/pwd/verifyCode", {

        login: body.login,
        email: body.email,
        new_password: body.new_password,
        code: body.code,
      
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            text: "contraseña actualizada exitosamente",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });

        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            text: "Error al actualizar la contraseña",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);

      });
  }


  return (
    <ThemeProvider theme={theme}>
      {modal && <ModalRecoveryPassword />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url()",
            backgroundRepeat: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            className="box-login-form"
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              className="texto-paginas-login"
              component="h1"
              variant="h5"
              sx={{ mt: 4 }}
            >
              Recuperación de datos de acceso
            </Typography>
            <Box component="form" sx={{ mt: 4 }}>
              <Stack direction="row" spacing={2}>
                <Item>
                  <TextField
                    size="small"
                    onChange={handleRecoveryPassword}
                    margin="normal"
                    placeholder="Usuario"
                    fullWidth
                    label="Usuario"
                    name="login"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          className="iconos-labels"
                          position="start"
                        >
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Item>

                <Item>
                  <TextField
                    size="small"
                    onChange={handleRecoveryPassword}
                    margin="normal"
                    placeholder="Email"
                    fullWidth
                    label="Email"
                    name="email"
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
                    size="small"
                    onChange={handleRecoveryPassword}
                    margin="normal"
                    placeholder="Codigo de seguridad"
                    fullWidth
                    label="Codigo de seguridad"
                    name="code"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          className="iconos-labels"
                          position="start"
                        >
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Item>
                <Item>
                  <TextField
                    size="small"
                    type="password"
                    onChange={handleRecoveryPassword}
                    margin="normal"
                    placeholder="Nueva contraseña"
                    fullWidth
                    label="Contraseña"
                    name="new_password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          className="iconos-labels"
                          position="start"
                        >
                          <LockOpenIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Item>
              </Stack>

              <Link className="back-session" to="/" variant="body2">
                <KeyboardArrowLeftIcon className="icons-back icons-form" />{" "}
                Atrás para iniciar sesión
              </Link>
              <LoadingButton
                size="small"
                onClick={enviarCorreo}
                className="boton-enviar"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                /* loading={loading} */
                loadingPosition="end"
              >
                Enviar
              </LoadingButton>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 4 }}
              >
                ¿Nuevo en nuestra plataforma?{" "}
                <Link className="texto-1" to="/register-page" variant="body2">
                  Crear una cuenta
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RecoveryAccount;