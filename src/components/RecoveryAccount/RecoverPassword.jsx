import * as React from "react";
import "./RecoverPassword.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { UserOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import validator from "validator";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { Input } from "antd";
import Container from "@mui/material/Container";

const theme = createTheme();
const RecoveryAccount = () => {
  const [body, setBody] = useState({ login: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleRecoveryPassword = (e) => {
    if (e.target.name === "login") {
    }
    if (e.target.name === "email") {
    }
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const linkStyles = {
    color: "#006D8E",
    textAlign: "left",
    fontSize: "13px",
    margin: "15px",
    /* Agrega otros estilos según tus necesidades */
  };

  async function enviarCorreo() {
    //campos vacios empty fields
    if (body.login === "" || body.email === "") {
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

    if (!validator.isEmail(body.email)) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        text: "Por favor ingrese un correo válido",
      });
      return;
    }

    setLoading(true);
    if (body.login === "" || body.password === "") console.warn(body);
    axios
      .post("https://valink-pay-api.vercel.app/pwd/reset", {
        login: body.login,
        email: body.email,
      })
      .then((response) => {
        if (response.data.status === "fail") {
          Swal.fire({
            toast: true,
            position: "top-end",
            text: "Usuario y/o email no registrado",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            text: "Correo enviado con éxito",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
          window.location.href = "/complete-recovery-password";
        }
      })
      .catch((error) => {
        console.warn(error);
        setLoading(false);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      {/* {modal && <ModalRecuperarContraseña/>} */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          sm={false}
          md={5}
          sx={{
            backgroundImage:
              "url(http://valinkgroup.com/wp-content/uploads/2022/12/Paso-1-1.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "500px auto",
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
              >
                <Stack spacing={2} className>
                  <Typography
                    fontSize="35px"
                    variant="p"
                    fontWeight="bold"
                    color="#2d3338"
                    textAlign="left"
                    lineHeight="initial"
                  >
                    Reestablece tu contraseña
                  </Typography>

                  <Typography
                    mb={4}
                    fontSize="16px"
                    variant="p"
                    align="center"
                    fontWeight="500"
                    textAlign="left"
                    color="#4f4f4f"
                  >
                    Ingresa tu dirección de correo electrónico y te enviamos un
                    código para reestablecer tu contraseña
                  </Typography>

                  <Stack spacing={2}>
                    <Input
                      className="input-recovery-password"
                      size="large"
                      onChange={handleRecoveryPassword}
                      placeholder="usuario"
                      label="usuario"
                      name="login"
                      prefix={<UserOutlined />}
                    />
                    <Input
                      className="input-recovery-password"
                      size="large"
                      onChange={handleRecoveryPassword}
                      placeholder="email"
                      label="Email"
                      name="email"
                      prefix={<MailOutlined />}
                    />
                    <LoadingButton
                      type="submit"
                      disableElevation
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: "#006D8E",
                      }}
                      onClick={enviarCorreo}
                      className="btn-recovery-password"
                      fullWidth
                      variant="contained"
                      loading={loading}
                      endIcon={<SendIcon />}
                      loadingPosition="end"
                    >
                      Enviar
                    </LoadingButton>
                    <Link
                      style={linkStyles}
                      className="text-lost-password"
                      to="/login"
                      variant="body2"
                    >
                      <KeyboardArrowLeftIcon className="icons-back icons-form" />
                      Atrás para iniciar sesión
                    </Link>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                      sx={{ mt: 4 }}
                      fontSize={13}
                    >
                      ¿Nuevo en nuestra plataforma?
                      <Link
                        style={linkStyles}
                        className="text-lost-password"
                        to="/register-page"
                        variant="body2"
                      >
                        Crear una cuenta
                      </Link>
                    </Typography>
                  </Stack>
                </Stack>
              </Container>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RecoveryAccount;
