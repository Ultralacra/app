import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Axios from "axios";
import LoginIcon from "@mui/icons-material/Login";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
import { Input, Button } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

export default function SignInSide() {
  const theme = createTheme();
  const [username, setUsername] = useState(""); //para asignar el valor al estado y poder acceder
  const [password, setPassword] = useState(""); //para asignar el valor al estado y poder acceder
  const [open, setOpen] = React.useState(false);

  const linkStyles = {
    color: "#006D8E",
    textAlign: "left",
    fontSize: "13px",
    margin: "15px",
    /* Agrega otros estilos según tus necesidades */
  };

  const registerButtonStyles = {
    border: "1px solid #ffb200  ",
    color: "white",
    marginTop: "10px",
    padding: "5px",
    borderRadius: "8px",
    backgroundColor: "#ffb200",
    fontSize: "16px",
    fontWeight: "bold",
  };

  //Bloquear el boton de login si los campos estan vacios
  const isFormComplete = () => username.length > 0 && password.length > 0;

  const handleSubmit = (event) => {
    setOpen(true);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Axios.post("https://valink-pay-api.vercel.app/login", {
      login: data.get("username"),
      password: data.get("password"),
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    })
      .then(function (response) {
        if (response.data.status === "fail")
          Swal.fire({
            toast: true,
            position: "top-end",
            showCloseButton: true,
            icon: "error",
            text: "Usuario o contraseña incorrectos",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });

        if (response.data.status === "success") {
          setOpen(true);
          localStorage.setItem("auth", JSON.stringify("yes"));
          localStorage.setItem(
            "id",
            JSON.stringify(response.data.message.userId)
          );
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.message.Authorization)
          );
          localStorage.setItem(
            "nombre",
            JSON.stringify(response.data.message.first_name)
          );
          localStorage.setItem(
            "apellido",
            JSON.stringify(response.data.message.last_name)
          );
          localStorage.setItem(
            "profile",
            JSON.stringify(response.data.message.data.profile)
          );
          window.location.href = "/dashboard-users";
        }
        setOpen(false);
      })
      .catch(function (error) {});
  };
  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{
          color: "#DFFEFF",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        Verificando datos por favor espere...
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          sm={false}
          md={5}
          sx={{
            backgroundImage:
              "url(http://valinkgroup.com/wp-content/uploads/2022/12/6134225.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          md={7}
          elevation={6}
          square
          bgcolor="#EBEBEB"
          display="flex"
          alignItems="center"
        >
          <Container maxWidth="xs">
            <Box sx={{ justifyContent: "center" }}>
              <Container
                display="flex"
                alignItems="center"
                component="form"
                noValidate
                onSubmit={handleSubmit}
              >
                <Stack spacing={2} className>
                  <Item>
                    <Typography
                      fontSize="48px"
                      variant="p"
                      fontWeight="bold"
                      color="#2d3338"
                      textAlign="left"
                    >
                      HOLA👋
                    </Typography>
                    <Typography
                      mb={4}
                      fontSize="16px"
                      variant="p"
                      align="center"
                      fontWeight="500"
                      textAlign="left"
                    >
                      Bienvenido al Portal de Clientes de{" "}
                      <span style={{ color: "#006D8E" }}>ValinkPay</span>.
                      Inicia sesión en tu cuenta.
                    </Typography>
                    <Input
                      placeholder="nombre de usuario"
                      onChange={(event) => setUsername(event.target.value)}
                      required
                      id="username"
                      label="Usuario"
                      name="username"
                      size="large"
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="contraseña"
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      size="large"
                    />
                  </Item>
                  <Item>
                    <LoadingButton
                      disableElevation
                      sx={{
                        backgroundColor: "#006D8E",
                        borderRadius: "8px",
                      }}
                      endIcon={<LoginIcon />}
                      disabled={!isFormComplete()}
                      className={isFormComplete() ? "enabled" : "disabled"}
                      type="submit"
                      variant="contained"
                    >
                      Iniciar Sesión
                    </LoadingButton>
                    <Stack>
                      <Item>
                        <Link
                          style={linkStyles}
                          to="/recovery-account"
                          className="text-lost-password"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                        <Link
                          style={registerButtonStyles}
                          className="btn-register"
                          to="/register-page"
                        >
                          Registrarme
                        </Link>
                      </Item>
                    </Stack>
                  </Item>
                </Stack>
              </Container>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
